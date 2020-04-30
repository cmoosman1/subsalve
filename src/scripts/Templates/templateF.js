import axios from 'axios';
import DataStore from 'flux/stores/DataStore.js';
import CaseStudy from '../components/UIComponents/General/CaseStudy';
import CaseStudyCard from '../components/UIComponents/Card/CaseStudyCard';
import CatalogCTA from '../components/UIComponents/General/CatalogCTA';
import ContactUsCTA from '../components/UIComponents/General/ContactUsCTA';
import MainNav from '../components/UIComponents/Navigation/MainNav';
import Hero from '../components/UIComponents/Hero/hero';
import Footer from '../components/Footer';
import {Helmet} from 'react-helmet';
import renderHTML from 'react-render-html';
import { ENV } from '../Constants';
class TemplateF extends React.Component {
    constructor(){
        super();
    
        this.state = {
            cardData: null,
            currentPageData: null,
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
            },
        }
    }

    getContentFromStore(heroDataObj, allCardsObj, caseStudyPageObj, globalDataObj, featuredCaseStudyObj){
        // Add data objects to state 

        let currentPage = caseStudyPageObj.data; //allPagesObj.filter(item => item.slug === 'case-studies');
        let featuredCaseStudyData = featuredCaseStudyObj.filter(item => item.slug === currentPage.acf.featured_case_study.post_name);

        let globalData = globalDataObj[0];
        let caseStudiesHeroData = heroDataObj.filter(item => item.slug === 'case-studies');
        this.setState({
            cardData: allCardsObj,
            currentPageData: currentPage,
            featuredCaseStudy: featuredCaseStudyData,
            heroData: caseStudiesHeroData[0],
            globalProps: globalData,
        }, () => this.getFields());
       
    }

    getFields() {
        // Set data obj from state to get acf fields
       
        const heroFieldsData = this.state.heroData.acf;
        let heroFields = {
            heroTitle: this.state.heroData.title.rendered,
            heroSubTitle: this.state.heroData.content.rendered,
            heroImage: heroFieldsData.image.url,
            heroBackgroundColor: heroFieldsData.background_color,
            heroPadding: heroFieldsData.padding,
            heroMargins: heroFieldsData.margins,
            heroMinHeight: heroFieldsData.min_height,
        }

        const globalFieldData = this.state.globalProps.acf;
        let globalFields = {
            ctaText: globalFieldData.cta_text,
            ctaContactUs: globalFieldData.cta_contact_us,
            ctaSubmit: globalFieldData.cta_submit,
            catalogImage: globalFieldData.catalog_download_image,
            catalogTitle: globalFieldData.catalog_download_title,
            catalogLinkText: globalFieldData.catalog_link_text,
            catalogLinkURL: globalFieldData.catalog_download_link
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

        const featuredCaseStudies = this.state.featuredCaseStudy[0].acf;
        const associatedCaseStudies = this.state.currentPageData.acf.more_case_studies;
        let associatedCardData = this.state.cardData.filter(item => item.acf.card_type === 'case study');
        let associatedCaseStudiesValues = associatedCaseStudies.map(item => { return item.post_name; });
        let associatedFilteredCaseStudies = associatedCardData.filter(item => associatedCaseStudiesValues.includes(item.slug));

        // Add data objects on state so we can pass them on props
        this.setState({
            associatedFilteredCaseStudies,
            heroFields,
            featuredCaseStudies,
            globalFields,
            seoFields,
            loading: false
        });
    }

     // Application instantiation 
    // Get all pages and create slug obj for getting page specific data

    componentWillMount(){
        window.scrollTo(0, 0);
        const url = `${ENV}wp-json/wp/v2/pages/10`;
        axios.get(url).then((data) => {
            let caseStudyPage = data;
            let allheros = DataStore.getAllHeros();
            let allCards = DataStore.getAllCards();
            let globalprops = DataStore.getGlobalProps();
            let featuredCaseStudy = DataStore.getFeaturedCaseStudy();
        this.getContentFromStore(allheros, allCards, caseStudyPage, globalprops,featuredCaseStudy);
        }); 
        
    }
   

    render() {
        const {associatedFilteredCaseStudies, featuredCaseStudies, seoFields} = this.state;
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
                <Hero pageFields={this.state.heroFields} />
                <section className="case-study-wrapper">
                    <div className="container">
                        {featuredCaseStudies &&
                            <CaseStudy fields={featuredCaseStudies}/>
        }
                    </div>
                </section>
                <section className="case-studies-section-wrapper pb-5">
                    <div className="container mb-5">
                        <div className="row pt-5 mb-5">
                            <div className="col mt-5">
                                <span className="subsalve-case-studies">More Case Studies</span>
                            </div>
                        </div>
                        <div className="row">
                            {associatedFilteredCaseStudies &&
                                associatedFilteredCaseStudies.map((card) => {
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
                <CatalogCTA fields={this.state.globalFields}/>
                <ContactUsCTA fields={this.state.globalFields}/>
                <Footer />
            </div>
        );
    }
}
}

export default TemplateF;