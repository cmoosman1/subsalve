import axios from 'axios';
import DataStore from 'flux/stores/DataStore.js'
import CaseStudyCard from '../components/UIComponents/Card/CaseStudyCard'
import CatalogCTA from '../components/UIComponents/General/CatalogCTA'
import ContactUsCTA from '../components/UIComponents/General/ContactUsCTA'
import MainNav from '../components/UIComponents/Navigation/MainNav'
import ApplicationHero from '../components/UIComponents/Hero/ApplicationHero'
import Footer from '../components/Footer'
import {Helmet} from 'react-helmet';
import renderHTML from 'react-render-html';
import { ENV } from '../Constants';
class TemplateI extends React.Component {
    constructor(){
        super();
    
        this.state = {
            cardData: null,
            currentPage: null,
            featuredCaseStudyData: null,
            currentFeaturedImage: null,
            swapImage01: null,
            swapImage02: null,
            swapImage03: null,
            heroData: null,
            globalProps: null,
            loading: false,
            challengeSolutionOutcomeFields: [{}],
            currentFeaturedImage: '',
            featuredCaseStudyFields: {caseStudyContent: ''},
            swapImage01: '',
            swapImage02: '',
            swapImage03: '',
            heroFields: {
                heroTitle: '',
                heroSubTitle: '',
                heroImage: '',
                heroBackgroundColor: '',
                heroPadding: '',
                heroMargins: '',
                heroMinHeight: '',
                heroPageType: '',
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
            seoFields: {
                title: '',
                location: '',
                area: '',
                month: '',
                day: '',
                eventStart: '',
                eventEnd: ''
            },
        }
    }

    getContentFromStore(allPagesObj, allCardsObj, featuredCaseStudyObj, globalDataObj){
        // Add data objects to state 
        let currentPage = allPagesObj.data[0]
        let featuredCaseStudyData = featuredCaseStudyObj.filter(item => item.slug === currentPage.slug);
        let globalData = globalDataObj[0];
        this.setState({
            cardData: allCardsObj,
            currentPage: currentPage,
            featuredCaseStudyData: featuredCaseStudyData,
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
            heroPageType: heroFieldsData.page_type
        }

        const featuredCaseStudyFieldsData = this.state.featuredCaseStudyData[0];
        let featuredCaseStudyFields = {
            caseStudyTitle: featuredCaseStudyFieldsData.acf.title,
            caseStudyContent: featuredCaseStudyFieldsData.acf.content,
            caseStudyFeaturedImage: featuredCaseStudyFieldsData.acf.images[0].image.url,
            caseStudyGalleryImage01: featuredCaseStudyFieldsData.acf.images[1].image.url,
            caseStudyGalleryImage02: featuredCaseStudyFieldsData.acf.images[2].image.url,
            caseStudyGalleryImage03: featuredCaseStudyFieldsData.acf.images[3].image.url,
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
        const seoFieldsData = this.state.currentPage;
        let seoFields ={
            pageNofollow: seoFieldsData._aioseop_nofollow ? 'nofollow' : '',
            pageIndex: seoFieldsData._aioseop_noindex ? 'noindex' : '', 
            pageTitle: seoFieldsData._aioseop_title,
            pageDescription: seoFieldsData._aioseop_description,
            pageCannonical: seoFieldsData._aioseop_custom_link,
            pageSlug: seoFieldsData.slug,
        }

    
        const associatedCaseStudies = this.state.currentPage.acf.more_case_studies;
        let associatedCardData = this.state.cardData.filter(item => item.acf.card_type === 'case study');
        let associatedCaseStudiesValues = associatedCaseStudies.map(item => { return item.post_name; });
        let associatedFilteredCaseStudies = associatedCardData.filter(item => associatedCaseStudiesValues.includes(item.slug));
        const challengeSolutionOutcomeFields = this.state.currentPage.acf;

         // Add data objects on state so we can pass them on props
        this.setState({
            associatedFilteredCaseStudies,
            featuredCaseStudyFields,
            challengeSolutionOutcomeFields,
            currentFeaturedImage: featuredCaseStudyFields.caseStudyFeaturedImage,
            swapImage01: featuredCaseStudyFields.caseStudyGalleryImage01,
            swapImage02: featuredCaseStudyFields.caseStudyGalleryImage02,
            swapImage03: featuredCaseStudyFields.caseStudyGalleryImage03,
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
            let caseStudiesPage = data;
            let allCards = DataStore.getAllCards();
            let globalprops = DataStore.getGlobalProps();
            let featuredCaseStudy = DataStore.getFeaturedCaseStudy();
            this.getContentFromStore(caseStudiesPage, allCards, featuredCaseStudy, globalprops);
        }); 
    }
   
    galleryChange(id){
        switch(id){
			case 1:
				this.setState({
                    swapImage01: this.state.currentFeaturedImage, 
                    currentFeaturedImage: this.state.swapImage01,
				})	
			break;
			case 2:
				this.setState({
                    swapImage02: this.state.currentFeaturedImage, 
					currentFeaturedImage: this.state.swapImage02
				})	
			break;
			case 3:
				this.setState({
                    swapImage03: this.state.currentFeaturedImage, 
					currentFeaturedImage: this.state.swapImage03
				})	
            break;
        }
    }

    render() {
        const {
            associatedFilteredCaseStudies, 
            challengeSolutionOutcomeFields, 
            heroFields, 
            currentFeaturedImage, 
            featuredCaseStudyFields, 
            swapImage01, 
            swapImage02, 
            swapImage03,
            seoFields} = this.state;
        if( this.state.loading ) {
            return <div> Loading....</div>
        } else {
            return (
            <div>
                <Helmet>
                    <title>{renderHTML(seoFields && seoFields.pageTitle ? seoFields.pageTitle : '')}</title>
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
                <ApplicationHero fields={heroFields} challengeSolutionOutcomeFields={challengeSolutionOutcomeFields}/>
                <section className="featured-case-study-wrapper margin-top-spacer">
                        <div className="container">    
                            <div className="row pr-0">
                                <div className="col-md-4 case-study-background pt-5">
                                    <span className="case-study-content">
                                        {featuredCaseStudyFields.caseStudyContent}
                                    </span>
                                </div>
                                <div className="col-md-8 pl-0 pr-0 gallery-case-study-feature">
                                    {/* <div className="play-hover">
                                        <p className="overlay-play-icon ml-5" />
                                        <p className="overlay-text">Image Switch</p>
                                    </div> */}
                                    <img className="img-cover" src={currentFeaturedImage} style={{ maxHeight: '505px'}} alt="FeaturedImage"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4 pl-0 pr-0 gallery-case-study">
                                    <div className="hover" onClick={() => this.galleryChange(1)}>
                                        <p className="overlay-icon ml-3" />
                                        <p className="overlay-text">View Larger</p>
                                    </div>
                                    <img className="img-cover" src={swapImage01} style={{ maxHeight: '255px'}} alt="swapImage01"/>
                                </div>
                                <div className="col-md-4 pl-0 pr-0 gallery-case-study">
                                    <div className="hover" onClick={() => this.galleryChange(2)}>
                                        <p className="overlay-icon ml-3" />
                                        <p className="overlay-text">View Larger</p>
                                    </div>
                                    <img className="img-cover" src={swapImage02} style={{ maxHeight: '255px'}} alt="swapImage02"/>
                                </div>
                                <div className="col-md-4 pl-0 pr-0 gallery-case-study">
                                    <div className="hover" onClick={() => this.galleryChange(3)}>
                                        <p className="overlay-icon ml-3" />
                                        <p className="overlay-text">View Larger</p>
                                    </div>
                                    <img className="img-cover" src={swapImage03} style={{ maxHeight: '255px'}} alt="swapImage03"/>
                                </div>
                            </div>
                        </div>
                </section>
                
                <section className="case-studies-section-wrapper pb-3">
                    <div className="container mb-5">
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
                <CatalogCTA fields={this.state.globalFields}/>
                <ContactUsCTA fields={this.state.globalFields}/>
                <Footer />
            </div>
        );
    }
}
}

export default TemplateI;