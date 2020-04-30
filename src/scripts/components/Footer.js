import DataStore from 'flux/stores/DataStore.js'
import {Link} from 'react-router-dom';
class Footer extends React.Component {
    render() {
        const footerMenu = DataStore.getFooterNav();
        const globalprops = DataStore.getGlobalProps();
        return (
            <div className="footer-wrapper">
                <div className="container pt-5">
                    <div className="row">
                        <div className="col-md-4 col-sm-12">
                            <a className="footer-logo-wrapper" href="/">
                                <img src={globalprops[0].acf.site_logo.url} className="footer-nav-logo" alt="Logo"/>
                            </a>
                        </div>
                        <div className="col-md-3 col-sm-12 mobile-footer-nav footer-nav">
                            <ul>
                                {footerMenu.map((page) => {
                                    return(
                                    <li key={page.id}>
                                        <Link to={`/${page.object_slug}`}>
                                            {page.title}
                                        </Link>
                                    </li>
                                    )
                                })}
                                <li>
                                    <a href={globalprops[0].acf.catalog_download_link} target="_blank">DOWNLOAD CATALOG</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-3 col-sm-12 mobile-footer-contact">
                            <p className="footer-contact-header">
                                PHONE
                            </p>
                            <p className="footer-conact-text">
                               {globalprops[0].acf.contact_info[0].phone_number}
                            </p>
                            {/* <p className="footer-contact-header">
                                FAX
                            </p>
                            <p className="footer-conact-text">
                                {globalprops[0].acf.contact_info[0].fax_number}
                            </p> */}
                            <p className="footer-contact-header">
                                EMAIL
                            </p>
                            <p className="footer-conact-text">
                                {globalprops[0].acf.contact_info[0].email_address}
                            </p>
                            <p className="footer-contact-header">
                                ADDRESS
                            </p>
                            <p className="footer-conact-text" dangerouslySetInnerHTML={{__html: globalprops[0].acf.contact_info[0].address}}/>
                        </div>
                        <div className="col-md-2 col-sm-12 mobile-social">
                            <h4 className="footer-follow">FOLLOW US</h4>
                            <a className="footer-logo-wrapper" href={globalprops[0].acf.social_icons[0].social_link} style={{paddingRight: "15px"}} target="_blank">
                                <img src={globalprops[0].acf.social_icons[0].icon.url} style={{width: "30px", height: "30px"}} alt="Icon"/>
                            </a>
                            <a className="footer-logo-wrapper" href={globalprops[0].acf.social_icons[1].social_link} target="_blank">
                                <img src={globalprops[0].acf.social_icons[1].icon.url} width="30" height="30"  alt="Icon"/>
                            </a>
                        </div>
                    </div>
                    <div className="row mt-5 pb-3 footer-privacy-wrapper">
                        <div className="col-md-9 mt-3 footer-ipad">
                            <span className="footer-privacy" dangerouslySetInnerHTML={{__html: globalprops[0].acf.privacy_text}}/>
                        </div>
                        <div className="col-md-3 mt-3 order-first order-md-last">
                            <a className="footer-logo-wrapper" href="https://performanceinflatables.com/" target="_blank">
                                <img src={globalprops[0].acf.footer_logo.url} width="199" height="40"  alt="Logo"/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;