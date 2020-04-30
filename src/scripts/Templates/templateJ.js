import axios from 'axios';
import DataStore from 'flux/stores/DataStore.js';
import Accessories from '../components/UIComponents/Card/AccessorieCard';
import ApplicationCard from '../components/UIComponents/Card/ApplicationCard';
import CatalogCTA from '../components/UIComponents/General/CatalogCTA';
import ContactUsCTA from '../components/UIComponents/General/ContactUsCTA';
import MainNav from '../components/UIComponents/Navigation/MainNav';
import Hero from '../components/UIComponents/Hero/hero';
import Footer from '../components/Footer';
import {Helmet} from 'react-helmet';
import renderHTML from 'react-render-html';
import { ENV } from '../Constants';
class TemplateJ extends React.Component {
    constructor(){
        super();
    
        this.state = {
            accessoriesData: null,
            customSolution: null,
            heroData: null,
            productCardData: null,
            globalProps: null,
            pageData: null,
            loading: true
        }
    }

    getContentFromStore(heroDataObj, globalDataObj, cardDataObj, allAccessoriesObj, allPagesObj){
        // Add data objects to state 
        let sortedCardArray = cardDataObj.sort(function (a, b) {
            if (a.title.rendered < b.title.rendered) return -1;
            else if (a.title.rendered > b.title.rendered) return 1;
            return 0;
        });

        let needCustomSolution = sortedCardArray.filter(item => item.slug === 'custom-solutions');
        sortedCardArray = sortedCardArray.filter(item => item.slug !== 'custom-solutions');
        sortedCardArray.push(needCustomSolution[0]);

        let globalData = globalDataObj[0];

        let sortedHeroArray = heroDataObj.sort(function (a, b) {
            if (a.title.rendered < b.title.rendered) return -1;
            else if (a.title.rendered > b.title.rendered) return 1;
            return 0;
        });

        let accessoriesPage = allPagesObj.data[0];
        let pageHeroData = sortedHeroArray[1];
        let accessoriesData = allAccessoriesObj;
        this.setState({
            accessoriesData: accessoriesData,
            customSolution: needCustomSolution[0],
            heroData: pageHeroData,
            globalProps: globalData,
            pageData: accessoriesPage,
            productCardData: sortedCardArray,
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

        const accessoriesFieldData = this.state.accessoriesDate;
        let accessoriesFields = {
            accessories: accessoriesFieldData
        }
         // Add data objects on state so we can pass them on props

        this.setState({
            accessoriesFields,
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
        const currentPage = this.props.location.pathname;
        const pageSlug = currentPage.substr(1);
        const url = `${ENV}wp-json/wp/v2/pages?slug=${pageSlug}`;
        axios.get(url).then((data) => {
            let allheros = DataStore.getAllHeros();
            let globalprops = DataStore.getGlobalProps();
            let allCards = DataStore.getAllCards();
            let allPages = data;
            let allAccessories = DataStore.getAllAccessories();
            this.getContentFromStore(allheros, globalprops, allCards, allAccessories, allPages);
        }); 
        
    }
   

    render() {
        const {customSolution, seoFields} = this.state;
        
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
                <Hero pageFields={this.state.heroFields} />
                <section className="accessories-page-wrapper">
                    <div className="container">
                        <div className="row mx-auto">
                            {this.state.accessoriesData.map((accessories) => {
                                return(
                                <div key={accessories.id}>
                                    <Accessories fields={accessories} title={this.state.pageData.title.rendered} pageView={true}/>
                                </div>
                                )
                            })}
                        </div>
                    </div>
                </section>
                <section className="products-wrapper pt-5" style={{minHeight: '45px'}}>
                    <div className="container">
                        <div className="products-divder" />
                    </div>
                </section>
                <section className="products-wrapper">
                    <div className="container">
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

export default TemplateJ;