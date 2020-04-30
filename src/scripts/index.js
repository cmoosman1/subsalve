import {render} from 'react-dom';
import DataActions from 'flux/actions/DataActions.js';
import TemplateA from './Templates/templateA';
import TemplateB from './Templates/templateB';
import TemplateC from './Templates/templateC';
import TemplateD from './Templates/templateD';
import TemplateE from './Templates/templateE';
import TemplateF from './Templates/templateF';
import TemplateG from './Templates/templateG';
import TemplateH from './Templates/templateH';
import TemplateI from './Templates/templateI';
import TemplateJ from './Templates/templateJ';
import './index.scss';

import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';


class AppInitializer {

    templates = {
        'templateA': TemplateA, // Home page
        'templateB': TemplateB, // About page
        'templateC': TemplateC, // News page
        'templateD': TemplateD, // Contact Us page
        'templateE': TemplateE, // Products page
        'templateF': TemplateF, // Case Studies page
        'templateG': TemplateG, // Product Detail page
        'templateH': TemplateH, // Application Detail page
        'templateI': TemplateI, // Case Study Detail page
        'templateJ': TemplateJ, // Accessories page
    }

    buildRoutes(data){
        //data.pages.sort((a, b) => a.slug.localeCompare(b.slug)); // Alpha sort links by page slug
        const routes = data.routes[0].acf.routers;
        return routes.map((page, i) => {
            return(
                <Route
                    key={i}
                    component={this.templates[page.template_type]}
                    path={page.slug}
                    exact
                /> 
            )
        })     
    }
    run() {
        DataActions.getRoutes((response)=>{
            render(
                <Router>
                    <div>
                        <Switch>
                            <Route path="/" component={ TemplateA } exact exact strict/>
                                {this.buildRoutes(response)}
                        </Switch> 
                    </div>
                </Router>

                , document.getElementById('app')
            );
        });
    }
}

new AppInitializer().run();
