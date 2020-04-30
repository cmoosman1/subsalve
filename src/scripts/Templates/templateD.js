import axios from 'axios';
import DataStore from 'flux/stores/DataStore.js';
import ContactCTA from '../components/UIComponents/General/ContactUsCTA';
import Loading from '../components/UIComponents/General/Loading';
import MainNav from '../components/UIComponents/Navigation/MainNav';
import Hero from '../components/UIComponents/Hero/hero';
import Footer from '../components/Footer';
import {Helmet} from 'react-helmet';
import renderHTML from 'react-render-html';
import { ENV } from '../Constants';

class TemplateB extends React.Component {
    constructor(){
        super();
    
        this.state = {
            heroData: null,
            loadingPage: null,
            globalProps: null,
            pageData: null,
            loading: false,
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
                heroImage: '',
                heroMobileImage: '',
                heroBackgroundColor: '',
                heroPadding: '',
                heroMargins: '',
                heroMinHeight: '',
            },
        }
    }

    getContentFromStore(heroDataObj, globalDataObj, contactPageObj){
        // Add data objects to state 
        const currentPage = this.props.location;
        let contactPage = contactPageObj.data // allPagesObj.filter(item => item.slug === 'contact');
        let globalData = globalDataObj[0];
        switch(currentPage.pathname){
            case '/about-us':
                    let aboutHeroData = heroDataObj[2];
                    this.setState({
                        heroData: aboutHeroData,
                        globalProps: globalData,
                    }, () => this.getFields());
            break;
            case '/contact':
                    let isContactPage = true;
                    let contactHeroData = heroDataObj[3];
                    this.setState({
                        loadingPage: isContactPage,
                        heroData: contactHeroData,
                        pageData: contactPage,
                        globalProps: globalData,
                    }, () => this.getFields());
            break;
            case '/news':
                    let newsHeroData = heroDataObj[1];
                    this.setState({
                        heroData: newsHeroData,
                        globalProps: globalData,
                    }, () => this.getFields());
            break;

        }
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

         // Add data objects on state so we can pass them on props
         const globalFieldData = this.state.globalProps.acf;
         let globalFields = {
             ctaText: globalFieldData.cta_text,
             ctaContactUs: globalFieldData.cta_contact_us,
             ctaSubmit: globalFieldData.cta_submit,
             isLoadingPage: this.state.loadingPage,
             isContactPage: true
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
             seoFields,
             loading: false
         });
    }

    // Application instantiation 
    // Get all pages and create slug obj for getting page specific data

    componentWillMount(){
        window.scrollTo(0, 0);
        const url = `${ENV}wp-json/wp/v2/pages/12`;
        axios.get(url).then((data) => {
            let contactPage = data;
            let allheros = DataStore.getAllHeros();
            let globalprops = DataStore.getGlobalProps();
            this.getContentFromStore(allheros, globalprops, contactPage);
        }); 
    }
   

    render() {
        const {seoFields} = this.state;
        if( this.state.loading ) {
            return <div> <Loading /></div>
        } else {
            return (
            <div>
                {seoFields &&
                    <Helmet>
                        <title>{renderHTML(seoFields.pageTitle ? seoFields.pageTitle : 'Contact Us | Subsalve')}</title>
                        <meta name="description" content={renderHTML(seoFields.pageDescription ? seoFields.pageDescription : 'If you are looking to get in contact with Subsalve, either visit them online and fill out our online form or by giving us a call today.')} />
                        <meta name="robots" content={seoFields.pageIndex} />
                        <meta name="robots" content={seoFields.pageNofollow} />
                        <link rel="canonical" href={'https://subsalve.com/'+seoFields.pageSlug} />
                        <meta property="og:title" content={renderHTML(seoFields.pageTitle ? seoFields.pageTitle : 'Contact Us | Subsalve')} />
                        <meta property="og:description" content={renderHTML(seoFields.pageDescription ? seoFields.pageDescription : 'If you are looking to get in contact with Subsalve, either visit them online and fill out our online form or by giving us a call today.')} />
                        <meta property="og:image" content={'https://subsalve.com/subsalve-only-badge-rgb@2x.png'} />
                        <meta property="og:url" content={'https://subsalve.com/'+seoFields.pageSlug} />
                        <meta property="og:type" content="website" />   
                    </Helmet>
                }
                <MainNav />
                {this.state.heroFields &&
                    <Hero pageFields={this.state.heroFields} />
                }
                <div className="contact-form-fullPage-container pb-5">
                    <div className="container">
                        <div className="row">
                            {this.state.globalFields &&
                                <ContactCTA fields={this.state.globalFields}/>
                            }
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
}

export default TemplateB;