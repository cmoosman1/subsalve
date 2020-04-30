import DataStore from 'flux/stores/DataStore.js'
import {Link} from 'react-router-dom';
import MobileNav from './MobileNav'
import ProductsNav from './ProductsNav'
import SubNavFooter from './SubNavFooter'

class Header extends React.Component {   
    constructor(){
        super();
    
        this.state = {
            applicationsNav: null,
            applicationTitle: 'Applications',
            caseStudiesNav: null,
            caseStudiesTitle: 'Case Studies',
            currentDropDown: null,
            currentTitle: null,
            dropDownNav:{
                products: 'products',
                applications: 'applications',
                caseStudies: 'case-studies'
            },
            globalProperties: null,
            isDropdownOpen: false,
            isMobileNavOpen: false,
            isApplications: false,
            mainNav: null,
            productsNav: null,
            productsTitle: 'Products',
            subNavItems: null,
            sectionNav: null,
        }
    }

    componentWillMount(){
        const mainMenu = DataStore.getMainNav();
        const productSubNav = mainMenu[0].children;
        const applicationsSubNav = mainMenu[1].children;
        const casStudiesSubNav = mainMenu[2].children;
        const globalprops = DataStore.getGlobalProps();

        this.setState({
            mainNav: mainMenu,
            productsNav: productSubNav,
            applicationsNav: applicationsSubNav,
            caseStudiesNav: casStudiesSubNav,
            globalProperties: globalprops,
            subNavItems: {applicationsSubNav, casStudiesSubNav, productSubNav}
        })
    }

    handleDropDown(id){
        switch(id){
            case 202:
                this.setState((prevState, props) => ({
                    currentDropDown: this.state.productsNav,
                    currentTitle: this.state.productsTitle,
                    sectionNav: this.state.dropDownNav.products,
                    isDropdownOpen: !prevState.isDropdownOpen,
                    isApplications: false,
                }));
            break;
            case 281:
                this.setState((prevState, props) => ({
                    currentDropDown: this.state.applicationsNav,
                    currentTitle: this.state.applicationTitle,
                    sectionNav: this.state.dropDownNav.applications,
                    isDropdownOpen: !prevState.isDropdownOpen,
                    isApplications: true,
                }));
            break;
            case 192:
                this.setState((prevState, props) => ({
                    currentDropDown: this.state.caseStudiesNav,
                    currentTitle: this.state.caseStudiesTitle,
                    sectionNav: this.state.dropDownNav.caseStudies,
                    isDropdownOpen: !prevState.isDropdownOpen,
                    isApplications: false,
                }));
            break;
            default:

            break;
        }
        
    }

    handleMobileNav(){
        this.setState((prevState, props) => ({
            isMobileNavOpen: !prevState.isMobileNavOpen
        }));
    }
    render() {

        const {
            applicationsNav,
            caseStudiesNav,
            currentDropDown, 
            currentTitle, 
            globalProperties, 
            isDropdownOpen, 
            isMobileNavOpen, 
            isApplications,
            mainNav, 
            productsNav,
            sectionNav,} = this.state;
       
        return (
        <div>
            <div className="nav-wrapper">  
                <section className="columns">
                    <div className="column nav-img">
                        <a className="nav-logo-wrapper" href="/">
                            <img src="https://subsalvestage.wpengine.com/wp-content/uploads/2019/12/subsalve-only-logo-horizontal-R-RGB@2x.svg" width="285" height="65" alt="Logo"/>
                        </a>
                    </div>
                    <div className="column nav-menu">
                        <ul>
                            {mainNav.map((page) => {
                                if(page.title === 'Products' || 
                                page.title === 'Applications' ||
                                page.title === 'Case Studies'){
                                return(
                                    <li key={page.id}>
                                        <a href="#" onClick={() => {this.handleDropDown(page.id)}}>
                                            {page.title}
                                        </a>
                                        <i className="fas fa-chevron-down" style={{marginRight: '10px'}}></i>
                                        {isDropdownOpen ?
                                        <hr id={page.id} className={isDropdownOpen ? 'nav-selected' : 'active-link'}></hr>
                                        : null}
                                    </li>
                                )
                            } else {
                                return(
                                    <li key={page.id}>
                                        <Link 
                                            key={page.id} 
                                            style={{marginRight: '10px'}}
                                            to={`/${page.object_slug}`} 
                                            >
                                            {page.title}
                                        </Link>
                                    </li>
                                )
                            }           
                            })} 
                        </ul>
                    </div>
                    <div className="column nav-button">
                        <a href="#" className="blue-outline-button">DOWNLOAD CATALOG</a>
                    </div>
                    <div className="column nav-mobile">
                        <div 
                            className={isMobileNavOpen ? 'navbar-toggle' : 'navbar'}
                            onClick={(e) => this.handleMobileNav(e)}
                            >
                            <span className="icon-bar top-bar"></span>
                            <span className="icon-bar middle-bar"></span>
                            <span className="icon-bar bottom-bar"></span>
                        </div>
                    </div>
                </section>	
            </div>
            {isDropdownOpen && (
                <div className={isDropdownOpen ? 'sub-nav-wrapper' : 'closed'}>
                    <div className="container">
                        <div className="row" style={{paddingLeft: '20px'}}>
                            {isApplications ?
                                <h4 className="sub-nav-header"> 
                                    See All {currentTitle}
                                </h4>
                            : 
                                <h4 className="sub-nav-header"> 
                                    <a href={`/${sectionNav}`}>See All {currentTitle}</a>
                                    <i className="fas fa-arrow-right sub-nav-menu-item-fas"></i>
                                </h4>
                            }
                            <hr className="hero-subheader-line" />
                        </div>
                        <ProductsNav currentDropDown={currentDropDown} currentMenu={currentTitle}/>
                        <SubNavFooter currentMenu={currentTitle} />
                    </div>  
                </div>
            )}
            {isMobileNavOpen ? 
                <MobileNav 
                    applications={applicationsNav}
                    caseStudiesNav={caseStudiesNav}
                    productsNav={productsNav}
                    globalprops={globalProperties}
                    topLevel={mainNav} 
                />
            : null}
          </div>
        );
    }
}

export default Header;