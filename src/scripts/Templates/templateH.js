import axios from 'axios';
import DataStore from 'flux/stores/DataStore.js';
import CaseStudyCard from '../components/UIComponents/Card/CaseStudyCard';
import CatalogCTA from '../components/UIComponents/General/CatalogCTA';
import ContactUsCTA from '../components/UIComponents/General/ContactUsCTA';
import ProductCard from '../components/UIComponents/Card/ProductCard'
import MainNav from '../components/UIComponents/Navigation/MainNav';
import ApplicationHero from '../components/UIComponents/Hero/ApplicationHero';
import Footer from '../components/Footer';
import {Helmet} from 'react-helmet';
import renderHTML from 'react-render-html';
import { HashLink as Link } from 'react-router-hash-link';
import { ENV } from '../Constants';
class TemplateH extends React.Component {
    constructor(){
        super();
    
        this.state = {
            cardData: null,
            currentPage: null,
            heroData: null,
            globalProps: null,
            loading: false,
            seoFields: {
                title: '',
                location: '',
                area: '',
                month: '',
                day: '',
                eventStart: '',
                eventEnd: ''
            },
            globalFields: {
                ctaText: '',
                ctaContactUs: '',
                ctaSubmit: '',
                catalogImage: '',
                catalogTitle: '',
                catalogLinkText: '',
                catalogLinkURL: '',
            },
            heroFields: {
                heroTitle: '',
                heroSubTitle: '',
                heroImage: '',
                heroBackgroundColor: '',
                heroPadding: '',
                heroMargins: '',
                heroMinHeight: '',
            }
        }
    }

    getContentFromStore(allPagesObj, allCardsObj, globalDataObj){
        // Add data objects to state 
        let currentPage = allPagesObj.data[0];
        let globalData = globalDataObj[0];
        this.setState({
            cardData: allCardsObj,
            currentPage: currentPage,
            globalProps: globalData,
        }, () => this.getFields());
    }

    getFields() {
        // Set data obj from state to get acf fields
        const heroFieldsData = this.state.currentPage.acf;
        let heroFields = {
            heroTitle: heroFieldsData.hero.title,
            heroSubTitle: heroFieldsData.hero.subtitle,
            heroImage: heroFieldsData.hero.background_image,
            heroBackgroundColor: heroFieldsData.hero.background_color,
            heroPadding: heroFieldsData.hero.padding,
            heroMargins: heroFieldsData.hero.margins,
            heroMinHeight: heroFieldsData.hero.min_height,
        }

        const globalFieldData = this.state.globalProps.acf;
        let globalFields = {
            ctaText: globalFieldData.cta_text,
            ctaContactUs: globalFieldData.cta_contact_us,
            ctaSubmit: globalFieldData.cta_submit,
            catalogImage: globalFieldData.catalog_download_image,
            catalogTitle: globalFieldData.catalog_download_title,
            catalogLinkText: globalFieldData.catalog_link_text,
            catalogLinkURL: globalFieldData.catalog_download_link,
        }
        
        let associatedFilteredCaseStudies = [];
        if(this.state.currentPage.acf.case_study_associations){
            const associatedCaseStudies = this.state.currentPage.acf.case_study_associations;
            let associatedCardData = this.state.cardData.filter(item => item.acf.card_type === 'case study');
            let associatedCaseStudiesValues = associatedCaseStudies.map(item => { return item.post_name; });
            associatedFilteredCaseStudies = associatedCardData.filter(item => associatedCaseStudiesValues.includes(item.slug));
        }

        let associatedFilteredProducts = {};
        if(this.state.currentPage.acf.products_associations){
            const associatedProducts = this.state.currentPage.acf.products_associations;
            let associatedProductCardData = this.state.cardData.filter(item => item.acf.card_type === 'product');
            let associatedProductsValues = associatedProducts.map(item => { return item.post_name; });
            associatedFilteredProducts = associatedProductCardData.filter(item => associatedProductsValues.includes(item.slug));
        }
        // SEO 
        const seoFieldsData = this.state.currentPage;
        let seoFields ={
            pageNofollow: seoFieldsData._aioseop_nofollow ? 'nofollow' : '',
            pageIndex: seoFieldsData._aioseop_noindex ? 'noindex' : '', 
            pageTitle: seoFieldsData._aioseop_title,
            pageDescription: seoFieldsData._aioseop_description,
            pageCannonical: seoFieldsData._aioseop_custom_link,
            pageSlug: seoFieldsData.slug,
        }

        // Add data objects on state so we can pass them on props
        this.setState({
            associatedFilteredCaseStudies: associatedFilteredCaseStudies || false,
            associatedFilteredProducts: associatedFilteredProducts || false,
            globalFields,
            heroFields,
            seoFields,
            loading: false
        });
    }

     // Application instantiation 
    // Get all pages and create slug obj for getting page specific data

    componentWillMount(){
        window.scrollTo(0, 0);
        const currentPage = this.props.location.pathname;
        const pageSlug = currentPage.substr(1);
        const url = `${ENV}wp-json/wp/v2/pages?slug=${pageSlug}`;
        axios.get(url).then((data) => {
            let applicationPage = data;
            let allCards = DataStore.getAllCards();
            let globalprops = DataStore.getGlobalProps();
            this.getContentFromStore(applicationPage, allCards, globalprops);
        }); 
    }
   

    render() {
        const {associatedFilteredCaseStudies, associatedFilteredProducts, heroFields, seoFields} = this.state;
        if( this.state.loading ) {
            return <div> Loading....</div>
        } else {
            return (
            <div>
                <Helmet>
                <title>{renderHTML(seoFields.pageTitle ? seoFields.pageTitle : "" )}</title>
                    <meta name="description" content={renderHTML(seoFields.pageDescription ? seoFields.pageDescription : '')} />
                    <meta name="robots" content={seoFields.pageIndex} />
                    <meta name="robots" content={seoFields.pageNofollow} />
                    <link rel="canonical" href={'https://subsalve.com/'+seoFields.pageSlug} />
                    <meta property="og:title" content={renderHTML(seoFields.pageTitle ? seoFields.pageTitle : "")} />
                    <meta property="og:description" content={renderHTML(seoFields.pageDescription ? seoFields.pageDescription : '')} />
                    <meta property="og:image" content={'https://subsalve.com/subsalve-only-badge-rgb@2x.png'} />
                    <meta property="og:url" content={'https://subsalve.com/'+seoFields.pageSlug} />
                    <meta property="og:type" content="website" />   
                </Helmet>
                <MainNav />
                <ApplicationHero fields={heroFields}/>
                <section className="products-section" style={{paddingBottom: '2rem'}}>
                    <div className="container">
                        <div className="row justify-content-center">
                            {associatedFilteredProducts &&
                                associatedFilteredProducts.map((card) => {
                                    if(card.acf.card_type === 'product'){
                                        return(
                                        <div className="col-md-4" key={card.id}>
                                            <ProductCard fields={card}/>
                                        </div>
                                        )
                                    }
                            })}
                        </div>
                    </div>
                </section>
                <section className="need-custom-section">
                    <div className="container">
                        <div className="row">
                            <div className="custom-solution col-lg-12 col-md-12 col-sm-12 text-center">
                                <div className="title">Need a custom solution?</div>
                                <Link to="/contact" className="cta-catalog-button mt-3">CONTACT US</Link>
                            </div>
                        </div>
                    </div>
                </section>
                {associatedFilteredCaseStudies && 
                    associatedFilteredCaseStudies.length > 0 && 
                    associatedFilteredCaseStudies !== undefined ?
                <section className="case-studies-section-wrapper pb-5">
                    <div className="container">
                        <div className="row mb-5">
                            <div className="col mt-5">
                                <span className="subsalve-case-studies">More Case Studies</span>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            {associatedFilteredCaseStudies &&
                                associatedFilteredCaseStudies.slice(0, 3).map((card) => {
                                    if(card.acf.card_type === 'case study'){
                                        return(
                                        <div className="col-md-4 d-flex align-items-stretch" key={card.id}>
                                            <CaseStudyCard fields={card}/>
                                        </div>
                                        )
                                    }
                            })}
                        </div>
                    </div>
                </section> : null}
                <CatalogCTA fields={this.state.globalFields}/>
                <ContactUsCTA fields={this.state.globalFields}/>
                <Footer />
            </div>
        );
    }
}
}

export default TemplateH;