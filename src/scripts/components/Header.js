import DataStore from 'flux/stores/DataStore.js'
import {Link} from 'react-router-dom';
class Header extends React.Component {   
   
    render() {
        let paddingAhrefCSS = {
            marginRight: '60%'
        }
        let allPages = DataStore.getAllPages();
        allPages = _.sortBy(allPages, [function(page) { return page.menu_order; }]); // Sort pages by order
        allPages = allPages.filter(item => item.slug !== 'home');
        allPages = allPages.filter(item => item.slug !== 'footer');
        return (
            <nav className="navbar navbar-expand-lg" style={{position: 'absolute', zIndex: '2', width: '100%'}}>
                <a className="navbar-brand logo-wrapper" href="/">
                    <img src="https://subsalvedev.wpengine.com/wp-content/uploads/2019/06/subsalve-only-logo-horizontal-rgb.png" width="265" height="65" alt="Logo"/>
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse menu-position" id="navbarNav">
                    <ul className="navbar-nav">
                        {allPages.map((page) => {
                            return(
                                <li className="nav-item main-menu-wrapper" key={page.id}>
                                    <Link 
                                        key={page.id} 
                                        to={`/${page.slug}`} 
                                        className={'main-menu'}
                                        style={{marginRight: '10px'}}
                                        >
                                        {page.slug}
                                    </Link>
                                </li>
                            )      
                        })} 
                    </ul>
                </div>
                <button className="btn-catalog btn-wrapper">DOWNLOAD CATALOG</button>
            </nav>
        );
    }
}

export default Header;