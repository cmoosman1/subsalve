import DataStore from "flux/stores/DataStore.js"; 
import React from 'react'; 
import { HashLink as Link } from 'react-router-hash-link';
import styled from 'styled-components'; 
import DropDown from './Dropdown'; 
import CovidBanner from '../General/CovidBanner';

export default class DesktopNav extends React.Component { 
  constructor() { 
    super(); 
    this.state = { 
      showDropdown: false, 
      showCovid: true,
      catalog: [],
      category: '', 
      pageData: [], 
    }; 
  } 
 
  toggleDropdown = (category) => { 
    const cleanCategory = category.replace(/-/g, " "); 
      this.setState({ 
        showDropdown: true, 
        category: cleanCategory 
      }); 
  } 
 
  componentWillMount() { 
    const covidSession = window.sessionStorage.getItem('covidBanner');
    if(covidSession === "true"){
      this.setState({showCovid: false});
    }
    const catalogObj = DataStore.getGlobalProps();
    const pageData = DataStore.getMainNav(); 
    this.setState({ 
      catalog: catalogObj,
      headerLogo: catalogObj[0].acf.site_logo.url,
      pageData: pageData 
    }); 
  } 
 
  toggleCovidBanner = () => {
    if(this.state.showCovid === true){
      window.sessionStorage.setItem('covidBanner', "true");
    }
    this.setState((currentState) => ({showCovid: !currentState.showCovid}));
  }

  render() { 
    const StyledNav = styled.nav` 
            padding-bottom: 15px; 
            height: 105px;
            width:100%;
            .navbar-collapse { 
                justify-content: flex-end; 
                        } 
 
                        .navbar-brand { 
                            width: 255.7px; 
                            height: 67px; 
                            object-fit: contain; 
                            margin-left: 40px; 

                            @media(min-width: 500px) and (max-width: 1068px) { 
                              width: 153px; 
                          } 
                        } 
 
                        .navbar-brand img { 
                            margin-left: -16px; 
                            
                            @media(min-width: 500px) and (max-width: 1068px) { 
                                width: 153px; 
                            } 
                        } 
 
                        .nav-item { 
                            margin-right: 12px; 
                                i.fal.fa-chevron-down { 
                                    font-weight: bold; 
                                    position: relative; 
                                    left: 5px; 
                                    width: 10px; 
                                    height: 6px; 
                                    color: #001641; 
                            } 
                        } 
 
                        .nav-link { 
                            color: #001641; 
                            height: 17px; 
                            font-family: proxima-nova, sans-serif; 
                            font-size: 13px; 
                            font-weight: bold; 
                            font-style: normal; 
                            font-stretch: normal; 
                            line-height: normal; 
                            letter-spacing: 1.17px; 
                            text-align: center; 
                            margin-top: 5px; 
                        } 
 
                        .navbar-nav a.btn { 
                            width: 217px; 
                            height: 50px; 
                            border-radius: 50px; 
                            border: solid 2px #001641; 
                            font-size: 13px; 
                            font-weight: bold; 
                            line-height: 1.69; 
                            letter-spacing: 1.08px; 
                            text-align: center; 
                            color: #001641; 
                            margin-left: 27px; 
                            padding-top: 12px;
                    } 
 
                    .download-btn { 
                        @media(max-width: 1296px) { 
                            display: none; 
                        } 

                        :hover{
                          background-color: #001641;
                          color: #FFFFFF !important;
                        }
                    } 
                         
                ` 
    return ( 
      <div>
      <StyledNav className="navbar navbar-expand-md" onMouseLeave={() => this.setState({ showDropdown: false })}> 
        <Link to="/" className="navbar-brand"><img src={this.state.headerLogo} alt="Logo" style={{maxWidth: "285px"}}/></Link> 
        <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"> 
          <span className="navbar-toggler-icon"></span> 
        </button> 
        <div className="navbar-collapse collapse" id="navbarNav"> 
          <ul className="navbar-nav"> 
            {this.state.showDropdown ? (<DropDown category={this.state.category} pageData={this.state.pageData}/>) : (null)} 

            {this.state.pageData.map((page) => { 
              return page.object_slug === 'products' || page.object_slug === 'applications' || page.object_slug === 'case-studies' ? ( 
                <li className="nav-item" key={page.id}> 
                  <div 
                    key={page.id} 
                    to={`/${page.object_slug}`} 
                    className={'nav-link'} 
                    onMouseEnter={() => this.toggleDropdown(page.object_slug)} 
                  > 
                    {page.title.toUpperCase()} 
                    <i className="fal fa-chevron-down"></i> 
                  </div> 
                </li> 
              ) 
                : 
                <li className="nav-item" key={page.id}> 
 
                  <Link 
                    key={page.id} 
                    to={`/${page.object_slug}`} 
                    className={'nav-link'} 
                  > 
                    {page.title.toUpperCase()} 
                  </Link> 
                </li> 
            })} 
            <a className="btn download-btn" href={this.state.catalog[0].acf.catalog_download_link} role="button" target="_blank">DOWNLOAD CATALOG</a> 
          </ul> 
        </div> 
      </StyledNav>   
      {this.state.showCovid ? <CovidBanner onClick ={ () => this.toggleCovidBanner()}/> : ''}
      </div>
    ) 
  } 
}