import alt          from 'flux/alt/alt.js';
import axios from 'axios';
import DataActions  from 'flux/actions/DataActions.js';

class DataStore {
    constructor() {
        this.data = {};

        this.bindListeners({
            // Listen to the getSuccess() in DataActions.js
            handleSuccess: DataActions.GET_SUCCESS
        });

        this.exportPublicMethods({
            getAll:         this.getAll,
            getAllPages:    this.getAllPages,
            getAllPosts:    this.getAllPosts,
            getAllHeros:    this.getAllHeros,
            getGlobalProps: this.getGlobalProps,
            getMainNav:     this.getMainNav,
            getFooterNav:   this.getFooterNav,
            getAllCards:    this.getAllCards,
            getFeaturedCaseStudy:    this.getFeaturedCaseStudy,
            getAllAccessories:    this.getAllAccessories,
            getAllTrustedLogos:    this.getAllTrustedLogos,
            getAllPressitems:    this.getAllPressitems,
            getPageBySlug:  this.getPageBySlug,
            getHomePage: this.getHomePage,
            getRoutes: this.getRoutes,
        });
    }

    // Store data returned by getSuccess() in DataActions.js
    handleSuccess(data) {
        this.setState({ data });
    }

    // Returns all pages and posts
    getAll() { 
        return this.getState().data; 
    }

     // Returns all Pages
     getHomePage() { 
        return this.getState().data.homePage; 
    }

    // Returns all Pages
    getAllPages() { 
        return this.getState().data.pages; 
    }

    // Returns all Posts
    getAllPosts() { 
        return this.getState().data.posts; 
    }

    getAllHeros() {
        return this.getState().data.hero;
    }

    // Returns all Media Cards
    getAllMediaCardPosts(){
        return this.getState().data.cards;
    }

    //Returns Main navigation
    getMainNav(){
        return this.getState().data.mainNav.items;
    }

    //Returns Footer navigation
    getFooterNav(){
        return this.getState().data.footerNav.items;
    }

    //Returns All Global Properties
    getGlobalProps(){
        return this.getState().data.globalProps;
    }

    //Returns All Cards
    getAllCards(){
        return this.getState().data.cards;
    }

    //Returns All Trusted Logos
    getAllTrustedLogos(){
        return this.getState().data.trustedlogos;
    }

    //Returns All Accessories
    getAllAccessories(){
        return this.getState().data.accessories;
    }

    //Returns Featured Case Study
    getFeaturedCaseStudy(){
        return this.getState().data.caseStudy;
    }

    getAllPressitems(){
        return this.getState().data.pressItems;
    }

    getRoutes(){
        return this.getState().data.routes;
    }

    // Returns a Page by provided slug
    getPageBySlug(slug){
        const pages = this.getState().data.pages;
        return pages[Object.keys(pages).find((page, i) => {
            return pages[page].slug === slug;
        })] || {};
    }
}

export default alt.createStore(DataStore, 'DataStore');