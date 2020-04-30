import axios from 'axios';
import Accessories from '../components/UIComponents/Card/AccessorieCard';
import ApplicationCard from '../components/UIComponents/Card/ApplicationCard';
import Carousel from '../components/UIComponents/Carousel/carousel';
import CatalogCTA from '../components/UIComponents/General/CatalogCTA';
import ContactUsCTA from '../components/UIComponents/General/ContactUsCTA';
import DataStore from 'flux/stores/DataStore.js';
import Events from '../components/UIComponents/General/Events';
import Footer from '../components/Footer';
import MainNav from '../components/UIComponents/Navigation/MainNav';
import Loading from '../components/UIComponents/General/Loading';
import { HashLink as Link } from 'react-router-hash-link';
import {Helmet} from 'react-helmet';
import renderHTML from 'react-render-html';
import NewsPress from '../components/UIComponents/General/NewPress';
import Section from '../components/UIComponents/Section/section';
import { ENV } from '../Constants';

class TemplateA extends React.Component {
    constructor(){
        super();
    
        this.state = {
            allPages: null,
            allPagesSearch: null,
            accessoriesDate: null,
            cardData: null,
            customSolution: null,
            featuredCaseStudyData: null,
            currentFeaturedImage: null,
            pressItems: null,
            swapImage0: null,
            swapImage01: null,
            swapImage02: null,
            swapImage03: null,
            heroData: null,
            globalProps: null,
            pageData: null,
            pressItemsData: null,
            trustedLogosData: null,
            loading: false,
            isSearching: false,
            searchTerm: '',
            filteredResults: null,
            featuredCaseStudyFields: {
                caseStudyTitle: '',
                caseStudyIntro: '',
                caseStudyContent: '',
                caseStudyFeaturedImage: '',
                caseStudyGalleryImage01: '',
                caseStudyGalleryImage02: '',
                caseStudyGalleryImage03: '',
            },
            accessoriesFields: {
                accessories: []
            },
            currentFeaturedImage: '',
            swapImage01: '',
            swapImage02: '',
            swapImage03: '',
            heroFields: {
                heroImage: '',
                heroMobileImage: '',
                heroBackgroundColor: '',
                heroPadding: '',
                heroMargins: '',
                heroMinHeight: '',
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
            pageFieldsData: {
                hero_header: '',
                hero_sub_title: '',
                left_content_header: '',
                left_content_copy: '',
                right_content_header: '',
                right_content_copy: '',
                right_button_text: '',
                right_button_url: {
                    post_name: ''
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

        this.handleClick = this.handleClick.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
    }


    getContentFromStore(heroDataObj, globalDataObj, cardsObj, trustedLogosObj, allAccessoriesObj, featuredCaseStudyObj, homePageObj, allPressitemsObj){
        const url = `${ENV}wp-json/wp/v2/pages/?per_page=100`; //'https://subsalvestage.wpengine.com/wp-json/wp/v2/pages/?per_page=100';
        axios.get(url).then((data) => {
            this.setState({
                allPages: data.data
            });
        }); 

        let sortedEvents = allPressitemsObj.sort(function (a, b) {
            if (a.acf.event_start > b.acf.event_start) return 1;
            else if (a.acf.event_start < b.acf.event_start) return -1;
            return 0;
        });
        // Add data objects to state 
        // alpha order card list
        let sortedCardArray = cardsObj.sort(function (a, b) {
            if (a.title.rendered < b.title.rendered) return -1;
            else if (a.title.rendered > b.title.rendered) return 1;
            return 0;
        });

        let needCustomSolution = sortedCardArray.filter(item => item.slug === 'custom-solutions');
        sortedCardArray = sortedCardArray.filter(item => item.slug !== 'custom-solutions');
        sortedCardArray.push(needCustomSolution[0]);
        let heroData = heroDataObj.filter(item => item.slug === 'hero');
        let globalData = globalDataObj[0];
        let trustedLogosData = trustedLogosObj;
        let accessoriesData = allAccessoriesObj;
        let currentPage = homePageObj.data.acf; //allPagesObj.filter(item => item.slug === 'home');
        let featuredCaseStudyData = featuredCaseStudyObj.filter(item => item.slug === currentPage.featured_case_study.post_name);
        this.setState({
            accessoriesDate: accessoriesData,
            cardData: sortedCardArray,
            customSolution: needCustomSolution[0],
            featuredCaseStudyData: featuredCaseStudyData,
            heroData: heroData[0],
            globalProps: globalData,
            pageData: currentPage,
            pressItemsData: sortedEvents.reverse(),
            trustedLogosData: trustedLogosData,
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

        const pageFieldsData = this.state.pageData;
        let pageFields = {
            card: pageFieldsData.card,
        }

        const featuredCaseStudyFieldsData = this.state.featuredCaseStudyData[0].acf;
        let featuredCaseStudyFields = {
            caseStudyTitle: featuredCaseStudyFieldsData.title,
            caseStudyIntro: featuredCaseStudyFieldsData.intro,
            caseStudyContent: featuredCaseStudyFieldsData.content,
            caseStudyFeaturedImage: featuredCaseStudyFieldsData.images[0].image.url,
            caseStudyGalleryImage01: featuredCaseStudyFieldsData.images[1].image.url,
            caseStudyGalleryImage02: featuredCaseStudyFieldsData.images[2].image.url,
            caseStudyGalleryImage03: featuredCaseStudyFieldsData.images[3].image.url,
        }

        const heroFieldsData = this.state.heroData.acf;
        let heroFields = {
            heroImage: heroFieldsData.image.url,
            heroMobileImage: pageFieldsData.hero.mobile_background_image,
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

        const trustedLogosFieldData = this.state.trustedLogosData;
        let trustedLogosFields = {
            trustedLogos: trustedLogosFieldData
        }

        const accessoriesFieldData = this.state.accessoriesDate;
        let accessoriesFields = {
            accessories: accessoriesFieldData
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
            featuredCaseStudyFields,
            accessoriesFields,
            currentFeaturedImage: featuredCaseStudyFields.caseStudyFeaturedImage,
            swapImage01: featuredCaseStudyFields.caseStudyGalleryImage01,
            swapImage02: featuredCaseStudyFields.caseStudyGalleryImage02,
            swapImage03: featuredCaseStudyFields.caseStudyGalleryImage03,
            heroFields,
            globalFields,
            pageFields,
            pageFieldsData,
            pressEvent1,
            pressEvent2,
            pressEvent3,
            seoFields,
            trustedLogosFields,
            loading: false,
        });
    }

     // Application instantiation 
    // Get all pages and create slug obj for getting page specific data

    componentWillMount(){
        window.scrollTo(0, 0);
        const url = `${ENV}wp-json/wp/v2/pages/7`;
        axios.get(url).then((data) => {
            let homePage = data;
            let allheros = DataStore.getAllHeros();
            let allTrustedLogos = DataStore.getAllTrustedLogos();
            let globalprops = DataStore.getGlobalProps();
            let allCards = DataStore.getAllCards();
            let allAccessories = DataStore.getAllAccessories();
            let featuredCaseStudy = DataStore.getFeaturedCaseStudy();
            let allPressitems = DataStore.getAllPressitems();
            this.getContentFromStore(allheros, globalprops, allCards, allTrustedLogos, allAccessories, featuredCaseStudy, homePage, allPressitems);
        }); 
    }
   

    galleryChange(id){
        switch(id){
            case 0:
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

    updateSearch(event){
        if(!event.target.value){
            document.removeEventListener('click', this.handleOutsideClick, false);
            this.setState({
                isSearching: false
            });
        } else {
            const searchValue = event.target.value;
            document.addEventListener('click', this.handleOutsideClick, false);
            this.setState({
                searchTerm: searchValue.substr(0,300),
                isSearching: true
            });
            if(this.state.allPages){
                this.setState({filteredResults: this.state.allPages.filter(
                    (page) => {
                        if(page.acf && page.acf.search_terms){
                            return page.acf.search_terms.indexOf(searchValue) !== -1;
                        }
                        return 0;
                    }
                
                )});
            }
        }

    }

    handleClick() {
        if (!this.state.isSearching) {
            // attach/remove event handler
            document.addEventListener('click', this.handleOutsideClick, false);
        } else {
            document.removeEventListener('click', this.handleOutsideClick, false);
        }

        this.setState(prevState => ({
            isSearching: !prevState.isSearching,
            searchTerm: !prevState.searchTerm,
        }));
    }
      
    handleOutsideClick(e) {
        // ignore clicks on the component itself
        if (this.node.contains(e.target)) {
            return;
        }
        
        this.handleClick();
    }

    render() {
        const {
            searchData, 
            customSolution, 
            currentFeaturedImage, 
            isSearching, 
            featuredCaseStudyFields, 
            swapImage01, 
            swapImage02, 
            swapImage03, 
            pageFieldsData, 
            pageFields, 
            pressItemsData,
            pressEvent1,
            pressEvent2,
            pressEvent3,
            filteredResults,
            seoFields,} = this.state;
       
            

        if( this.state.loading ) {
            return <div> <Loading /></div>
        } else {
            return (
            <div>
                <Helmet>
                    <title>{renderHTML(seoFields && seoFields.pageTitle ? seoFields.pageTitle : 'Commercial Buoyancy Inflatables | Inflatable Lift Bags | Subsalve' )}</title>
                    <meta name="description" content={renderHTML(seoFields.pageDescription ? seoFields.pageDescription : 'Commercial Buoyancy Inflatables | Inflatable Lift Bags | Subsalve ')} />
                    <meta name="robots" content={seoFields.pageIndex} />
                    <meta name="robots" content={seoFields.pageNofollow} />
                    <link rel="canonical" href={'https://subsalve.com/'+seoFields.pageSlug} />
                    <meta property="og:title" content={renderHTML(seoFields.pageTitle ? seoFields.pageTitle : 'Commercial Buoyancy Inflatables | Inflatable Lift Bags | Subsalve')} />
                    <meta property="og:description" content={renderHTML(seoFields.pageDescription ? seoFields.pageDescription : 'Commercial Buoyancy Inflatables | Inflatable Lift Bags | Subsalve')} />
                    <meta property="og:image" content={'https://subsalve.com/subsalve-only-badge-rgb@2x.png'} />
                    <meta property="og:url" content={'https://subsalve.com/'+seoFields.pageSlug} />
                    <meta property="og:type" content="website" />   
                </Helmet>
                <MainNav />
                
                <Section fields={this.state.heroFields} sectionContent={pageFieldsData}/>
        
                {this.state.trustedLogosFields &&
                    <Carousel fields={this.state.trustedLogosFields}/>
                }
                <section className="products-wrapper pb-5">
                    <div id="applications" className="container">
                        <div className="row pt-5 mb-5">
                            <div className="col mt-5 text-center">
                                <span className="products-title">Our Products</span>
                                <hr className="products-line mb-3"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <span className="products-search-text">Explore our products by application type below.</span>
                            </div>
                            <div className="col-md-6 products-search-container float-md-right">
                                <form>
                                    <div className="form-group">
                                        <input 
                                            type="search" 
                                            className="hs-search-field__input" 
                                            id="search" 
                                            required="" 
                                            name="term" 
                                            autoComplete="off" 
                                            placeholder="Looking for something specific?"
                                            onChange={this.updateSearch.bind(this)} 
                                            />
                                    </div>
                                </form>
                            </div>
                        </div>
                        {isSearching &&
                            <div className="row search-results-wrapper" ref={node => { this.node = node; }}>
                                <div className="col">
                                    <span className="search-header">Search results for "{this.state.searchTerm}"</span>
                                    <hr className="search-line-break"/>
                                    {filteredResults && filteredResults.map((page) => {
                                        return(
                                            <div className="row pl-3">
                                                <h3 className="search-link" style={{width: '100%'}}>
                                                    <Link 
                                                        key={page.id} 
                                                        to={`/${page.slug}`} 
                                                        >
                                                        {page.title.rendered}
                                                    </Link>
                                                </h3>
                                                <p className="search-conent" dangerouslySetInnerHTML={{ __html: page.acf.search_terms}}/>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        }
                        <div className="row">
                            {this.state.cardData &&
                                this.state.cardData.map((card) => {
                                    if(card.acf.card_type === 'application'){
                                        return(
                                        <div className="col-md-12 col-lg-6" key={card.id} style={{ paddingLeft: '10px', paddingRight: '10px'}}>
                                            <ApplicationCard fields={card} customSolution={customSolution}/>
                                        </div>
                                        )
                                    }
                                }) 
                            } 
                        </div>
                    </div>
                </section>
                <section className="accessories-wrapper pb-5">
                    <div className="container">
                        <div className="row pt-5 mb-5">
                            <div className="col mt-5 text-center">
                                <span className="accessories-title">Accessories</span>
                                <hr className="products-line mb-3"/>
                            </div>
                        </div>
                        <div className="row mx-auto justify-content-center">
                            {this.state.accessoriesDate &&
                                this.state.accessoriesDate.slice(0, 4).map((accessories) => {
                                    return(
                                        <div key={accessories.id}>
                                            <Accessories  fields={accessories} />
                                        </div>
                                    )
                            })}
                        </div>
                        <div className="row text-center mt-5">
                            <div className="col-md-12">
                                <Link to="/accessories" className="yellow-button mt-5">SEE ALL ACCESSORIES</Link>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="case-studies-wrapper pb-5">
                    {/* <div className="case-study-circle" /> */}
                    <div className="container">
                        <div className="row pt-5 mb-5">
                            <div className="col mt-5 text-center">
                                <span className="case-studies-title">Featured Case Study</span>
                                <hr className="products-line mb-3"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <span className="case-studies-sub-title">{featuredCaseStudyFields.caseStudyTitle}</span>
                                <hr className="case-studies-line mb-3"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <span className="case-study-sub-header">
                                    {featuredCaseStudyFields.caseStudyIntro}
                                </span>
                            </div>
                        </div>
                        <div className="row mt-5 pr-0">
                            <div className="col-md-4 case-study-background pt-5">
                                <span className="case-study-content">
                                    {featuredCaseStudyFields.caseStudyContent}
                                </span>
                            </div>
                            <div className="col-md-8 pl-0 pr-0 gallery-case-study-feature">
                                {/* <div className="play-hover" onClick={() => this.galleryChange(0)}>
                                    <p className="overlay-play-icon ml-5" />
                                    <p className="overlay-text">Image Switch</p>
                                </div> */}
                                <img className="img-cover" src={currentFeaturedImage} style={{ maxHeight: '505px'}} alt="FeaturedImage"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 pl-0 pr-0 gallery-case-study">
                                <div className="hover" onClick={() => this.galleryChange(1)}>
                                    <p className="overlay-icon ml-4" />
                                    <p className="overlay-text">View Larger</p>
                                </div>
                                <img className="img-cover" src={swapImage01} style={{ maxHeight: '255px'}} alt="swapImage01"/>
                            </div>
                            <div className="col-md-4 pl-0 pr-0 gallery-case-study">
                                <div className="hover" onClick={() => this.galleryChange(2)}>
                                    <p className="overlay-icon ml-4" />
                                    <p className="overlay-text">View Larger</p>
                                </div>
                                <img className="img-cover" src={swapImage02} style={{ maxHeight: '255px'}} alt="swapImage02"/>
                            </div>
                            <div className="col-md-4 pl-0 pr-0 gallery-case-study">
                                <div className="hover" onClick={() => this.galleryChange(3)}>
                                    <p className="overlay-icon ml-4" />
                                    <p className="overlay-text">View Larger</p>
                                </div>
                                <img className="img-cover" src={swapImage03} style={{ maxHeight: '255px'}} alt="swapImage03"/>
                            </div>
                        </div>
                        <div className="row text-center mt-5">
                            <div className="col-md-12">
                                <Link to="/case-studies" className="yellow-button mt-5">VIEW ALL CASE STUDIES</Link>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="news-wrapper">
                    <div className="container">
                        {pageFields &&
                            <NewsPress pageFieldsData={pageFields}/>
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

export default TemplateA;