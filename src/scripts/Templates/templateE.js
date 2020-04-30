import axios from 'axios';
import DataStore from 'flux/stores/DataStore.js';
import ApplicationCard from '../components/UIComponents/Card/ApplicationCard';
import CatalogCTA from '../components/UIComponents/General/CatalogCTA';
import ContactUsCTA from '../components/UIComponents/General/ContactUsCTA';
import ProductCard from '../components/UIComponents/Card/ProductCard';
import Loading from '../components/UIComponents/General/Loading';
import MainNav from '../components/UIComponents/Navigation/MainNav';
import Hero from '../components/UIComponents/Hero/hero';
import Footer from '../components/Footer';
import {Helmet} from 'react-helmet';
import renderHTML from 'react-render-html';
import { ENV } from '../Constants';

class TemplateE extends React.Component {
    constructor(){
        super();
    
        this.state = {
            customSolution: null,
            heroData: null,
            productCardData: [],
            globalProps: null,
            pageData: null,
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
                heroImage: '',
                heroMobileImage: '',
                heroBackgroundColor: '',
                heroPadding: '',
                heroMargins: '',
                heroMinHeight: '',
            },
        }
    }

    getContentFromStore(heroDataObj, globalDataObj, cardDataObj, productsPageObj){
        // Add data objects to state 
        let sortedCardArray = cardDataObj.sort(function (a, b) {
            if (a.title.rendered < b.title.rendered) return -1;
            else if (a.title.rendered > b.title.rendered) return 1;
            return 0;
        });

        let needCustomSolution = sortedCardArray.filter(item => item.slug === 'custom-solutions');
        sortedCardArray = sortedCardArray.filter(item => item.slug !== 'custom-solutions');
        sortedCardArray = sortedCardArray.filter(item => item.slug !== 'auxiliary-power-unit-kit');
        sortedCardArray = sortedCardArray.filter(item => item.slug !== 'oasis-ldu');
        sortedCardArray = sortedCardArray.filter(item => item.slug !== 'quikwalls');

        sortedCardArray.push(needCustomSolution[0]);

        let productsPage = productsPageObj.data // allPagesObj.filter(item => item.slug === 'products');
        const currentPage = this.props.location;
        let globalData = globalDataObj[0];
        switch(currentPage.pathname){
            case '/products':
                    let productHeroData = heroDataObj.filter(item => item.slug === 'product');
                    this.setState({
                        customSolution: needCustomSolution[0],
                        heroData: productHeroData[0],
                        productCardData: sortedCardArray,
                        globalProps: globalData,
                        pageData: productsPage,
                    }, () => this.getFields());
            break;
            case '/aircraft-lifting-bags':
                    let pageHeroData = heroDataObj[3];
                    this.setState({
                        heroData: pageHeroData,
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
        const url = `${ENV}wp-json/wp/v2/pages/8`;
        axios.get(url).then((data) => {
            let productsPage = data;
            let allheros = DataStore.getAllHeros();
            let globalprops = DataStore.getGlobalProps();
            let allCards = DataStore.getAllCards();
            this.getContentFromStore(allheros, globalprops, allCards, productsPage);
        }); 
    }
   

    render() {
        const {customSolution, seoFields} = this.state;
        
        if( this.state.loading ) {
            return <div> <Loading /></div>
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
                <Hero pageFields={this.state.heroFields} />
                <section className="products-wrapper">
                    <div className="container">
                        <div className="row">
                            {this.state.productCardData.map((card) => {
                                if(card.acf.card_type === 'product'){
                                    return(
                                    <div className="col" key={card.id}>
                                        <ProductCard fields={card} />
                                    </div>
                                    )
                                }
                            })}
                        </div>
                    </div>
                </section>
                <section className="products-wrapper" style={{minHeight: '45px'}}>
                    <div className="container">
                        <div className="products-divder" />
                    </div>
                </section>
                <section className="products-wrapper">
                    <div className="container" style={{paddingBottom: '5rem'}}>
                        <div className="row">
                            {this.state.productCardData.map((card) => {
                                if(card.acf.card_type === 'application'){
                                    return(
                                    <div className="col-md-6" key={card.id}>
                                        <ApplicationCard fields={card} customSolution={customSolution}/>
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

export default TemplateE;