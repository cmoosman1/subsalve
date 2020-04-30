import axios from 'axios';
import Accessories from '../components/UIComponents/Card/AccessorieCard';
import Accordian from '../components/UIComponents/General/Accordian';
import DataStore from 'flux/stores/DataStore.js';
import CaseStudyCard from '../components/UIComponents/Card/CaseStudyCard';
import CatalogCTA from '../components/UIComponents/General/CatalogCTA';
import ContactUsCTA from '../components/UIComponents/General/ContactUsCTA';
import MainNav from '../components/UIComponents/Navigation/MainNav';
import ProductHeroCarousel from '../components/UIComponents/Carousel/ProductHeroCarousel';
import Footer from '../components/Footer';
import {Helmet} from 'react-helmet';
import renderHTML from 'react-render-html';
import { HashLink as Link } from 'react-router-hash-link';
import { ENV } from '../Constants';

class TemplateG extends React.Component {
    constructor(){
        super();
    
        this.state = {
            cardData: null,
            currentPageData: null,
            accessoriesDate: null,
            globalProps: null,
            introSectionHeight: 0,
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
            pageFields: {
                pageTitle: '',
                pageContent: '',
                pageDetails: '',
                sliderImages: [],
            },
            accessoriesFields: [],
            currentPageData: {
                acf: {
                    accordion_content_sections: [],
                    intro_header: '',
                    intro_copy: '',
                }
            },
        }
    }

    getContentFromStore(allPagesObj, allAccessoriesObj, globalDataObj, allCardsObj){
        // Add data objects to state 
        let currentPage = allPagesObj.data[0];
        let accessoriesData = allAccessoriesObj;
        let globalData = globalDataObj[0];
        
        this.setState({
            cardData: allCardsObj,
            currentPageData: currentPage,
            accessoriesDate: accessoriesData,
            globalProps: globalData,
        }, () => this.getFields());
  
    }

    getFields() {
        // Set data obj from state to get acf fields
        const pageFieldData = this.state.currentPageData.acf
        let pageFields = {
            pageTitle: this.state.currentPageData.title.rendered,
            pageContent: pageFieldData.product_content,
            pageDetails: pageFieldData.product_details,
            sliderImages: pageFieldData.product_images,
        }
       
        let associatedFilteredCaseStudies = [];
        if(this.state.currentPageData.acf.product_case_studies){
            const associatedCaseStudies = this.state.currentPageData.acf.product_case_studies;
            let associatedCardData = this.state.cardData.filter(item => item.acf.card_type === 'case study');
            let associatedCaseStudiesValues = associatedCaseStudies.map(item => { return item.post_name; });
            associatedFilteredCaseStudies = associatedCardData.filter(item => associatedCaseStudiesValues.includes(item.slug));
        }

        let accessoriesFields = {};
        if(this.state.currentPageData.acf.product_accessories){
            const associatedAccessories = this.state.currentPageData.acf.product_accessories;
            let accessoriesFieldData = this.state.accessoriesDate;
            let associatedValues = associatedAccessories.map(item => { return item.post_name; });
            let associatedFilteredAccessories = accessoriesFieldData.filter(item => associatedValues.includes(item.slug));

            accessoriesFields = {
                accessories: associatedFilteredAccessories
            }
        }
         const globalFieldData = this.state.globalProps.acf;
         let globalFields = {
             ctaText: globalFieldData.cta_text,
             ctaContactUs: globalFieldData.cta_contact_us,
             ctaSubmit: globalFieldData.cta_submit,
             isLoadingPage: this.state.loadingPage,
             catalogImage: globalFieldData.catalog_download_image,
             catalogTitle: globalFieldData.catalog_download_title,
             catalogLinkText: globalFieldData.catalog_link_text,
             catalogLinkURL: globalFieldData.catalog_download_link,
         }

          // SEO 
        const seoFieldsData = this.state.currentPageData;
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
            accessoriesFields: accessoriesFields || false,
            associatedFilteredCaseStudies: associatedFilteredCaseStudies || false,
            globalFields,
            pageFields,
            seoFields,
            loading: false
         });
    }

    // Application instantiation 
    // Get all pages and create slug obj for getting page specific data

    componentDidMount() {
        // const height = this.description.scrollHeight + 10;
        // this.setState({ height });
    }

    componentWillMount(){
        window.scrollTo(0, 0);
        const currentPage = this.props.location.pathname;
        const pageSlug = currentPage.substr(1);
        const url = `${ENV}wp-json/wp/v2/pages?slug=${pageSlug}`;
        axios.get(url).then((data) => {
            let allAccessories = DataStore.getAllAccessories();
            let globalprops = DataStore.getGlobalProps();
            let productPage = data;
            let allCards = DataStore.getAllCards();
            this.getContentFromStore(productPage, allAccessories, globalprops, allCards);
        }); 
    }
   
    render() {
        const {accessoriesFields, associatedFilteredCaseStudies, introSectionHeight, pageFields, seoFields} = this.state;
        if( this.state.loading ) {
            return <div> Loading....</div>
        } else {
            return (
            <div>
                <Helmet>
                    <title>{renderHTML(seoFields && seoFields.pageTitle ? seoFields.pageTitle : '' )}</title>
                    <meta name="description" content={renderHTML(seoFields && seoFields.pageDescription ? seoFields.pageDescription : '')} />
                    <meta name="robots" content={seoFields && seoFields.pageIndex} />
                    <meta name="robots" content={seoFields && seoFields.pageNofollow} />
                    <link rel="canonical" href={seoFields && 'https://subsalve.com/'+seoFields.pageSlug} />
                    <meta property="og:title" content={renderHTML(seoFields && seoFields.pageTitle ? seoFields.pageTitle : '')} />
                    <meta property="og:description" content={renderHTML(seoFields && seoFields.pageDescription ? seoFields.pageDescription : '')} />
                    <meta property="og:image" content={seoFields && 'https://subsalve.com/subsalve-only-badge-rgb@2x.png'} />
                    <meta property="og:url" content={seoFields && 'https://subsalve.com/'+seoFields.pageSlug} />
                    <meta property="og:type" content="website" />   
                </Helmet>
                <MainNav />
                <ProductHeroCarousel pageFields={pageFields}/>
                <section 
                    className="product-description-wrapper"
                    ref={element => this.description = element}
                    style={{minHeight: `${introSectionHeight}`}}
                    >
                    <div className="container" style={{paddingBottom: '2rem'}}>
                        <h4 className="product-description-title pt-5">{this.state.currentPageData.acf.intro_header}</h4>
                        <div className="row">
                            <div className="col-md-12 product-description-content" dangerouslySetInnerHTML={{ __html: this.state.currentPageData.acf.intro_copy}}/>
                        </div>
                    </div>
                </section>
                <section className="product-quality-wrapper">
                    <div className="container">
                        <div className="row text-center">
                            <div className="col mt-3">
                                <img src="https://subsalvedev.wpengine.com/wp-content/uploads/2019/07/combined-shape.png" alt="Logo"/>
                                <span className="product-quality-text pl-3">
                                    Each Subsalve product is 100% tested prior to shipping.
                                </span>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="product-details-wrapper pb-5">
                    <div className="container">
                        <div className="row">
                            <div className="col mt-5">
                                <span className="product-details-title">Product Details</span>
                            </div>
                        </div>
                        <div className="row mb-5">
                            <div className="col mt-5">
                                {this.state.currentPageData && this.state.currentPageData.acf.intro_header &&
                                    <Accordian fields={this.state.currentPageData}/>
                                }
                            </div>
                        </div>
                    </div>
                </section>
                <section className="product-custom-solution">
                    <div className="container">
                        <div className="row">
                        <div className="col-md-12 text-center pt-5">
                            <h4 className="product-title-text mt-4 text-white"
                                style={{fontSize: '36px'}}
                            >
                                Need a custom solution?
                            </h4>
                            <Link to="/contact" className="cta-catalog-button mt-3">CONTACT US</Link>
                        </div>
                        </div>
                    </div>
                </section>
                {accessoriesFields.accessories ? 
                    <section className="accessories-wrapper pb-5" style={{minHeight: '535px'}}>
                        <div className="container">
                            <div className="row">
                                <div className="col mt-5 text-center">
                                    <span className="accessories-title">Accessories</span>
                                    <hr className="products-line mb-3"/>
                                </div>
                            </div>
                            <div className="row justify-content-center mt-5 mobile-accessories-spacer">
                                {accessoriesFields.accessories &&
                                    accessoriesFields.accessories.map((accessories) => {
                                        return(
                                            <div className="col-md-4" key={accessories.id}>
                                                <Accessories fields={accessories} />
                                            </div>
                                        )
                                })}
                            </div>
                        </div>
                    </section>
                : null}
                {associatedFilteredCaseStudies && 
                    associatedFilteredCaseStudies.length > 0 && 
                    associatedFilteredCaseStudies !== undefined ?
                    <section className="case-studies-section-wrapper pb-5" style={{minHeight: '0'}}>
                        <div className="container">
                            <div className="row mb-5">
                                <div className="col mt-5">
                                    <span className="subsalve-case-studies">Subsalve Case Studies</span>
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
                    </section>
                : null}
                <CatalogCTA fields={this.state.globalFields}/>
                <ContactUsCTA fields={this.state.globalFields}/>
                <Footer />
            </div>
        );
    }
}
}

export default TemplateG;