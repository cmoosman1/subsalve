import axios from 'axios';
import alt   from 'flux/alt/alt.js';
import { ENV } from '../../Constants';

class DataActions {

    constructor() {
        const appUrl = ENV; //'https://subsalvestage.wpengine.com'; // Wordpress PROD url
        //const appUrl = 'https://subsalvedev.wpengine.com'; // Wordpress DEV url
        this.routerEndPoint = `${appUrl}/wp-json/wp/v2/router` // Site router for Wordpress
        this.homePagesEndPoint = `${appUrl}/wp-json/wp/v2/pages/7`; // for getting Wordpress Pages
        this.pagesEndPoint = `${appUrl}/wp-json/wp/v2/pages/?per_page=100`; // Endpoint for getting Wordpress Pages
        this.accessorieEndPoint = `${appUrl}/wp-json/wp/v2/accessorie?per_page=100` // Endpoint for Getting All Accessories
        this.cardsEndPoint = `${appUrl}/wp-json/wp/v2/card?per_page=100` // Endpoint for Getting All Cards
        this.caseStudyEndPoint = `${appUrl}/wp-json/wp/v2/case_studies/?per_page=100` // Endpoint for Featured Case Study(home Page)
        this.trustedLogosEndPoint = `${appUrl}/wp-json/wp/v2/trusted_logos?per_page=100` // Endpoint for getting Wordpress Trusted Logos
        this.postsEndPoint = `${appUrl}/wp-json/wp/v2/posts`; // Endpoint for getting Wordpress Posts
        this.heroEndPoint = `${appUrl}/wp-json/wp/v2/hero`; // Endpoint for getting Wordpress Posts
        this.pressItemEndPoint = `${appUrl}/wp-json/wp/v2/press_item`; // Endpoint for getting Wordpress Press Items
        this.globalsEndPoint = `${appUrl}/wp-json/wp/v2/global`; // Endpoint for getting Wordpress Posts
        this.mainMenuEndPoint = `${appUrl}/wp-json/wp-api-menus/v2/menus/2` //Endpoint for getting Main Menu call
        this.footerMenuEndPoint = `${appUrl}/wp-json/wp-api-menus/v2/menus/3` //Endpoint for getting Footer Menu call
        
    }

    
    // Method for getting data from the provided end point url
    api(endPoint) {
        return new Promise((resolve, reject) => {
            axios.get(endPoint).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            }); 
        });     
    }

    // Method for getting Pages data
    getRoutes(cb){
        this.api(this.routerEndPoint).then((response)=>{
            this.getMainNav(response, cb)
        });
        return true;
    }

    // Method for getting Main menu data
    getMainNav(routes, cb){
        this.api(this.mainMenuEndPoint).then((response)=>{
            this.getFooterNav(routes, response, cb);
        });
        return true;
    }

    // Method for getting Footer menu data
    getFooterNav(routes, mainNav, cb){
        this.api(this.footerMenuEndPoint).then((response)=>{
            this.getGlobalProps(routes, mainNav, response, cb);
        });
        return true;
    }

    // Method for getting Footer menu data
    getGlobalProps(routes, mainNav, footerNav, cb){
        this.api(this.globalsEndPoint).then((response)=>{
            this.getCards(routes, mainNav, footerNav, response, cb);
        });
        return true;
    }

    // Method for getting cards data
    getCards(routes, mainNav, footerNav, globalProps, cb){
        this.api(this.cardsEndPoint).then((response)=>{
            this.getTrustedLogos(routes, mainNav, footerNav, globalProps, response, cb);
        });
        return true;
    }

    // Method for getting trusted logo data
    getTrustedLogos(routes, mainNav, footerNav, globalProps, cards, cb){
        this.api(this.trustedLogosEndPoint).then((response)=>{
            this.getAccessories(routes, mainNav, footerNav, globalProps, cards, response,  cb);
        });
        return true;
    }

    // Method for getting accessories data
    getAccessories(routes, mainNav, footerNav, globalProps, cards, trustedlogos, cb){
        this.api(this.accessorieEndPoint).then((response)=>{
            this.getFeaturedCaseStudy(routes, mainNav, footerNav, globalProps, cards, trustedlogos, response,  cb);
        });
        return true;
    }

    // Method for getting featured case study data
    getFeaturedCaseStudy(routes, mainNav, footerNav, globalProps, cards, trustedlogos, accessories, cb){
        this.api(this.caseStudyEndPoint).then((response)=>{
            this.getPressItems(routes,mainNav, footerNav, globalProps, cards, trustedlogos, accessories, response,  cb);
        });
        return true;
    }
     
    // Method for getting featured press items data
    getPressItems(routes, mainNav, footerNav, globalProps, cards, trustedlogos, accessories, caseStudy, cb){
        this.api(this.pressItemEndPoint).then((response)=>{
            this.getHero(routes, mainNav, footerNav, globalProps, cards, trustedlogos, accessories, caseStudy, response,  cb);
        });
        return true;
    }

    // Method for getting Posts data
    getHero(routes, mainNav, footerNav, globalProps, cards, trustedlogos, accessories, caseStudy, pressItems, cb){
        this.api(this.heroEndPoint).then((response)=>{
            const hero    = response
            const payload   = { hero, routes, mainNav, footerNav, globalProps, cards, trustedlogos, accessories, caseStudy, pressItems};

            this.getSuccess(payload); // Pass returned data to the store
            cb(payload); // This callback will be used for dynamic rout building
        });
        return true;
    }

    // This returnes an object with Pages and Posts data together
    // The Alt Store will listen for this method to fire and will store the returned data
    getSuccess(payload){
        return payload;
    }
}

export default alt.createActions(DataActions);