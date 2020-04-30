import axios from 'axios';
import DataStore from 'flux/stores/DataStore.js';
import Events from '../components/UIComponents/General/Events';
import CatalogCTA from '../components/UIComponents/General/CatalogCTA';
import ContactUsCTA from '../components/UIComponents/General/ContactUsCTA';
import Loading from '../components/UIComponents/General/Loading';
import MainNav from '../components/UIComponents/Navigation/MainNav';
import Hero from '../components/UIComponents/Hero/hero';
import NewsCard from '../components/UIComponents/Card/NewsCard';
import Footer from '../components/Footer';
import {Helmet} from 'react-helmet';
import renderHTML from 'react-render-html';
import { ENV } from '../Constants';

class TemplateC extends React.Component {
    constructor(){
        super();
    
        this.state = {
            heroData: null,
            globalProps: null,
            pressItemsData: null,
            pageData: null,
            loading: false,
            heroFields: {
                heroImage: '',
                heroMobileImage: '',
                heroBackgroundColor: '',
                heroPadding: '',
                heroMargins: '',
                heroMinHeight: '',
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
            pageFields: {
                card: {
                    details: [{
                        button_title: '',
                        title: '',
                        subtitle: '',
                        button_url: '',
                        button_title: '',
                    }]
                }
            }
        }
    }

    getContentFromStore(dataObj, globalDataObj, newsPageObj, allPressitemsObj){
        // Add data objects to state 
        let newsPage = newsPageObj.data //allPagesObj.filter(item => item.slug === 'news');
        let pageHeroData = dataObj.filter(item => item.slug === 'news');
        let globalData = globalDataObj[0];
        this.setState({
            heroData: pageHeroData[0],
            globalProps: globalData,
            pageData: newsPage,
            pressItemsData: allPressitemsObj,
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

        const heroFieldsData = this.state.heroData.acf;
        let heroFields = {
            heroTitle: this.state.heroData.title.rendered,
            heroSubTitle: this.state.heroData.content.rendered,
            heroImage: heroFieldsData.image.url,
            heroBackgroundColor: heroFieldsData.background_color,
            heroPadding: heroFieldsData.padding,
            heroMargins: heroFieldsData.margins,
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
        const seoFieldsData = this.state.pageData;
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
            heroFields,
            globalFields,
            pressEvent1,
            pressEvent2,
            pressEvent3,
            pageFields,
            loading: false,
            seoFields
        });
    }

     // Application instantiation 
    // Get all pages and create slug obj for getting page specific data

    componentWillMount(){
        window.scrollTo(0, 0);
        const url = `${ENV}wp-json/wp/v2/pages/11`;
        axios.get(url).then((data) => {
            let newsPage = data;
            let allheros = DataStore.getAllHeros();
            let globalprops = DataStore.getGlobalProps();
            let allPressitems = DataStore.getAllPressitems();
            this.getContentFromStore(allheros, globalprops, newsPage, allPressitems);
        }); 
    }
   

    render() {
       
        const {
            pressEvent1,
            pressEvent2,
            pressEvent3,
            pageFields,
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
                    <section className="news-section">
                        <NewsCard pageFields={pageFields}/>
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
export default TemplateC;