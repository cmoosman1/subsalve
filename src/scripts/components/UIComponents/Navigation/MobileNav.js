import DataStore from "flux/stores/DataStore.js"; 
import React from 'react'; 
import { Link } from 'react-router-dom'; 
import styled from 'styled-components'; 
import DropDown from './Dropdown'; 
import MobileDropDown from "./MobileDropdown"; 
import CovidBanner from '../General/CovidBanner';
 
export default class MobileNav extends React.Component { 
  constructor() { 
    super(); 
    this.state = { 
      showDropdown: false, 
      showCovid: true,
      category: '', 
      pageData: [], 
      goBack: true 
    }; 
  } 
 
  toggleMainMenuDropdown = () => { 
    this.setState({ 
      showDropdown: !this.state.showDropdown 
    }) 
  } 
 
  toggleDropdown = (category) => { 
    const cleanCategory = category.replace(/-/g, " "); 
    this.setState({ 
      showDropdown: !this.state.showDropdown, 
      category: cleanCategory 
    }); 
  } 
 
  goBack = () => { 
    this.setState({ 
      goBack: this.state.goBack, 
      showDropdown: this.state.showDropdown 
    }) 
  } 
 
  componentWillMount() { 
    const covidSession = window.sessionStorage.getItem('covidBanner');
    if(covidSession === "true"){
      this.setState({showCovid: false});
    }
    const pageData = DataStore.getMainNav(); 
    this.setState({ 
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
    const StyledNav = styled.nav ` 
 
    .nav-wrapper { 
      display: flex; 
    } 
     
    .navbar { 
      border: none; 
      width: 50px; 
      height: 45px; 
      cursor: pointer;  
      float: right; 
      margin-top: 6px; 
      padding: .5rem .5rem;
      .icon-bar { 
        width: 45px; 
        transition: all 0.2s; 
      } 
    } 
    .navbar-brand img { 
      width: 153px; 
      height: auto; 
      margin-top: 10px; 
    } 
    .top-bar, .middle-bar, .bottom-bar { 
      background-color: #001641; 
      border-radius: 3px; 
      content: ''; 
      display: block; 
      height: 3px; 
      margin: 2px 0; 
    } 
     
    .navbar-toggle { 
      border: none; 
      height: 45px; 
      cursor: pointer;  
      float: right; 
      margin-top: 12px; 

      .icon-bar { 
        width: 45px; 
        transition: all 0.2s; 
      } 
      .top-bar { 
        transform: translateY(13px) rotate(135deg); 
      } 
      .middle-bar { 
        opacity: 0; 
      } 
      .bottom-bar { 
        transform: translateY(2px) rotate(-135deg); 
      } 
       
    } 
      
      
    ` 
    return ( 
      <div>
        <StyledNav> 
          <div className="nav-wrapper"> 
            <Link to="/" className="col navbar-brand"><img src="https://subsalvedev.wpengine.com/wp-content/uploads/2019/06/subsalve-only-logo-horizontal-rgb.png" alt="Logo"/></Link> 
            <div className="col nav-mobile"> 
              <div className={!this.state.showDropdown ? 'navbar' : 'navbar-toggle'} onClick={this.toggleMainMenuDropdown}> 
                <span className="icon-bar top-bar"></span> 
                <span className="icon-bar middle-bar"></span> 
                <span className="icon-bar bottom-bar"></span> 
              </div> 
            </div> 
          </div> 
          <div className="row" style={{background: '#000819'}}>
              {this.state.showDropdown ? (<MobileDropDown goBack={this.goBack} pageData={this.state.pageData} />) : (null)} 
          </div>
        </StyledNav> 
        {this.state.showCovid ? <CovidBanner onClick ={ () => this.toggleCovidBanner()}/> : ''}
      </div>
    ) 
  } 
} 