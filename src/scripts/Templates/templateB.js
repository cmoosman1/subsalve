import axios from 'axios';
import AboutUs from '../components/UIComponents/Section/AboutUs';
import DataStore from 'flux/stores/DataStore.js';
import Events from '../components/UIComponents/General/Events';
import CaseStudyCard from '../components/UIComponents/Card/CaseStudyCard';
import CatalogCTA from '../components/UIComponents/General/CatalogCTA';
import ContactUsCTA from '../components/UIComponents/General/ContactUsCTA';
import GridCard from '../components/UIComponents/Card/GridCard';
import AboutUsTimeline from '../components/UIComponents/General/AboutUsTimeline';
import Loading from '../components/UIComponents/General/Loading';
import MainNav from '../components/UIComponents/Navigation/MainNav';
import Hero from '../components/UIComponents/Hero/hero';
import Footer from '../components/Footer';
import {Helmet} from 'react-helmet';
import renderHTML from 'react-render-html';
import WhySubsalve from '../components/UIComponents/General/WhySubsalve';
import { ENV } from '../Constants';
class TemplateB extends React.Component {
    constructor(){
        super();
    
        this.state = {
            cardData: null,
            currentPage: null,
            heroData: null,
            globalProps: null,
            loading: false,
            pressItemsData: null,
            trustedLogosData: null,
            globalFields: {
                catalogTitle: '',
                catalogLinkURL: '',
                catalogLinkText: '',
                catalogImage: ''
            },
            heroFields: {
                heroImage: '',
                heroMobileImage: '',
                heroBackgroundColor: '',
                heroPadding: '',
                heroMargins: '',
                heroMinHeight: '',
            },
            pageData: {
                content: {rendered: ''},
                acf: {
                    grid_images: [],
                    timeline_content: [{
                        single_image: '',
                        left_images: '',
                        right_image: '',
                        description: '',
                        year: '',
                        title: '',
                    }],
                    why_content: []
                }
            },
            pressEvent1: {
                title: '',
                location: '',
                area: '',
                month: '',
                day: '',
                eventStart: '',
                eventEnd: ''
            },
            pressEvent2: {
                title: '',
                location: '',
                area: '',
                month: '',
                day: '',
                eventStart: '',
                eventEnd: ''
            },
            pressEvent3: {
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

    getContentFromStore(heroDataObj, allCardsObj, allTrustedLogosObj, globalDataObj, aboutPageObj, allPressitemsObj){
        // Add data objects to state 
        let globalData = globalDataObj[0];
        let trustedLogosData = allTrustedLogosObj;
        let aboutPage = aboutPageObj.data; // allPagesObj.filter(item => item.slug === 'about-us');
        let aboutHeroData = heroDataObj.filter(item => item.slug === 'about-us');//heroDataObj[4];
        this.setState({
            cardData: allCardsObj,
            heroData: aboutHeroData,
            globalProps: globalData,
            pageData: aboutPage,
            pressItemsData: allPressitemsObj,
            trustedLogosData: trustedLogosData
        }, () => this.getFields());
        
    }

    getFields() {
        // Set data obj from state to get acf fields
        const pressItemsFieldsData = this.state.pressItemsData;
        const pressEvent1 = {
            title: pressItemsFieldsData[0].acf.event_title,
            location: pressItemsFieldsData[0].acf.event_location,
            area: pressItemsFieldsData[0].acf.event_area,
            month: pressItemsFieldsData[0].acf.event_month,
            day: pressItemsFieldsData[0].acf.event_day,
            eventStart: pressItemsFieldsData[0].acf.event_start,
            eventEnd: pressItemsFieldsData[0].acf.event_end
        }

        const pressEvent2 = {
            title: pressItemsFieldsData[1].acf.event_title,
            location: pressItemsFieldsData[1].acf.event_location,
            area: pressItemsFieldsData[1].acf.event_area,
            month: pressItemsFieldsData[1].acf.event_month,
            day: pressItemsFieldsData[1].acf.event_day,
            eventStart: pressItemsFieldsData[1].acf.event_start,
            eventEnd: pressItemsFieldsData[1].acf.event_end
        }
        const pressEvent3 = {
            title: pressItemsFieldsData[2].acf.event_title,
            location: pressItemsFieldsData[2].acf.event_location,
            area: pressItemsFieldsData[2].acf.event_area,
            month: pressItemsFieldsData[2].acf.event_month,
            day: pressItemsFieldsData[2].acf.event_day,
            eventStart: pressItemsFieldsData[2].acf.event_start,
            eventEnd: pressItemsFieldsData[2].acf.event_end
        }

        const pageFieldsData = this.state.pageData.acf;
        let pageFields = {
            card: pageFieldsData.card,
        }

        const heroFieldsData = this.state.heroData[0].acf;
        let heroFields = {
            heroTitle: this.state.heroData[0].title.rendered,
            heroSubTitle: this.state.heroData[0].content.rendered,
            heroImage: heroFieldsData.image.url,
            heroBackgroundColor: heroFieldsData.background_color,
            heroPadding: heroFieldsData.padding,
            heroMargins: heroFieldsData.margins,
            heroMinHeight: heroFieldsData.min_height,
        }

         // Add data objects on state so we can pass them on props
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

        const trustedLogosFieldData = this.state.trustedLogosData;
        let trustedLogosFields = {
            trustedLogos: trustedLogosFieldData
        }

        // SEO 
        const seoFieldsData = this.state.pageData;
        let seoFields ={
            pageNofollow: seoFieldsData._aioseop_nofollow ? 'nofollow' : '',
            pageIndex: seoFieldsData._aioseop_noindex ? 'noindex' : '', 
            pageTitle: seoFieldsData._aioseop_title,
            pageDescription: seoFieldsData._aioseop_description,
            pageCannonical: seoFieldsData._aioseop_custom_link,
            pageSlug: seoFieldsData.slug,
        }

        const associatedCaseStudies = this.state.pageData.acf.about_case_studies;
        let associatedCardData = this.state.cardData.filter(item => item.acf.card_type === 'case study');
        let associatedCaseStudiesValues = associatedCaseStudies.map(item => { return item.post_name; });
        let associatedFilteredCaseStudies = associatedCardData.filter(item => associatedCaseStudiesValues.includes(item.slug));

          // Add data objects on state so we can pass them on props
         this.setState({
            associatedFilteredCaseStudies,
            heroFields,
            globalFields,
            loading: false,
            pageFields,
            pressEvent1,
            pressEvent2,
            pressEvent3,
            pressItemsFieldsData,
            seoFields,
            trustedLogosFields
         });
    }

    // Application instantiation 
    // Get all pages and create slug obj for getting page specific data

    componentWillMount(){
        window.scrollTo(0, 0);
        const url = `${ENV}wp-json/wp/v2/pages/12`;
        axios.get(url).then((data) => {
            let aboutPage = data;
            let allheros = DataStore.getAllHeros();
            let allCards = DataStore.getAllCards();
            let allTrustedLogos = DataStore.getAllTrustedLogos();
            let globalprops = DataStore.getGlobalProps();
            let allPressitems = DataStore.getAllPressitems();
            this.getContentFromStore(allheros, allCards, allTrustedLogos, globalprops, aboutPage, allPressitems);
        }); 
    }
   

    render() {
        const {
            associatedFilteredCaseStudies, 
            trustedLogosFields, 
            pageFields,
            pressEvent1,
            pressEvent2,
            pressEvent3,
            pressItemsData,
            seoFields} = this.state;
        
        if( this.state.loading ) {
            return <div> <Loading /></div>
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
                <section className="products-wrapper about-wrapper">
                    <AboutUs fields={this.state.pageData}/>
                    <GridCard fields={this.state.pageData.acf.grid_images}/>
                </section>
                <section className="history-wrapper pb-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                {this.state.pageData.acf.timeline_content &&
                                    <AboutUsTimeline fields={this.state.pageData.acf.timeline_content}/>
                                }
                            </div>
                        </div>
                    </div>
                </section>
                <section className="why-wrapper pb-5">
                    <div className="container">
                        <div className="row pt-5 mb-5">
                            <div className="col mt-5 text-center">
                                <span className="why-title">{this.state.pageData && this.state.pageData.acf.why_header}</span>
                                <hr className="why-line mb-3"/>
                            </div>
                        </div>
                        <div className="row">
                            <WhySubsalve fields={this.state.pageData.acf.why_content}/>
                        </div>
                    </div>
                </section>
                <section className="general-wrapper pb-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-5 mt-5 pt-5">
                                <h4 className="general-header">{this.state.pageData && this.state.pageData.acf.difference_left_header}</h4>
                                <p className="general-text" dangerouslySetInnerHTML={{ __html: this.state.pageData && this.state.pageData.acf.difference_left_copy}}/>
                            </div>
                            <div className="col-md-2" />
                            <div className="col-md-5 mt-5 pt-5">
                                <h4 className="general-header">{this.state.pageData && this.state.pageData.acf.difference_right_header}</h4>
                                <p className="general-text" dangerouslySetInnerHTML={{ __html: this.state.pageData && this.state.pageData.acf.difference_right_copy}}/>
                            </div>
                        </div>
                    </div>
                </section>
                {associatedFilteredCaseStudies &&
                    <section className="case-studies-section-wrapper pb-5">
                        <div className="container">
                            <div className="row mb-5">
                                <div className="col mt-5">
                                    <span className="subsalve-case-studies">Subsalve Case Studies</span>
                                </div>
                            </div>
                            <div className="row">
                                {associatedFilteredCaseStudies.slice(0, 3).map((card) => {
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
                }
                <section className="trusted-section-wrapper pb-5">
                    <div className="container">
                        <div className="row pt-5 mb-5">
                            <div className="col mt-5">
                                <p className="trusted-title mb-5">Trusted by</p>
                                <p className="trusted-content">
                                    We are proud to include the US Department of Defense, all branches of the U.S. Armed Forces, NASA, and the FBI on our list of satisfied and ongoing customers, as well as leading companies in the private sector and the governments of more than 30 foreign countries.
                                </p>
                            </div>
                        </div>
                        {trustedLogosFields &&
                            <div className="row">
                                <ul>
                                    <li className="mb-5 pb-5">
                                        {trustedLogosFields.trustedLogos.slice(0, 4).map((company, i) => {
                                            return(
                                                <img key={company.id} className="pl-3 pr-3" src={company.acf.company_logo.url} style={{width: '25%', height: 'auto'}} alt="Logo1"/>
                                            )
                                        })}
                                    </li>
                                    <li className="mb-5 pb-5">
                                    {trustedLogosFields.trustedLogos.slice(4, 8).map((company, i) => {
                                        return(
                                                <img key={company.id} className="pl-3 pr-3" src={company.acf.company_logo.url} style={{width: '25%', height: 'auto'}} alt="Logo2"/>
                                            )
                                        })}
                                    </li>
                                    <li className="mb-5 pb-5">
                                    {trustedLogosFields.trustedLogos.slice(8, 12).map((company, i) => {
                                        return(
                                                <img key={company.id} className="pl-3 pr-3" src={company.acf.company_logo.url} style={{width: '25%', height: 'auto'}} alt="Logo3"/>
                                            )
                                        })}
                                    </li>
                                    <li className="mb-5 pb-5">
                                    {trustedLogosFields.trustedLogos.slice(12, 16).map((company, i) => {
                                        return(
                                                <img key={company.id} className="pl-3 pr-3" src={company.acf.company_logo.url} style={{width: '25%', height: 'auto'}} alt="Logo4"/>
                                            )
                                        })}
                                    </li>
                                    <li className="mb-5 pb-5">
                                    {trustedLogosFields.trustedLogos.slice(16, 18).map((company, i) => {
                                        return(
                                                <img key={company.id} className="pl-3 pr-3" src={company.acf.company_logo.url} style={{width: '25%', height: 'auto'}} alt="Logo5"/>
                                            )
                                        })}
                                    </li>
                                </ul>
                            </div>
                        }
                    </div>
                </section>
                {pressItemsData &&
                    <Events fields={pressItemsData}/>
                }
                <CatalogCTA fields={this.state.globalFields}/>
                <ContactUsCTA fields={this.state.globalFields}/>
                <Footer />
            </div>
        );
    }
}
}

export default TemplateB;