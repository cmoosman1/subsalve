import React from 'react';
import {Link} from 'react-router-dom';

function ProductsNav({currentDropDown, currentMenu}) {
    if(currentMenu === 'Products'){
    return (
        <div className="sub-nav-menu-wrapper">
            <div className="sub-nav-menu-item">
                <ul>
                {currentDropDown.slice(0, 4).map((page, i) => {
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
                })}
                </ul>
            </div>
            <div className="sub-nav-menu-item">
                <ul>
                    {currentDropDown.slice(4, 8).map((page, i) => {
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
                    })}
                </ul>
            </div>
            <div className="sub-nav-menu-item">
                <ul>
                    {currentDropDown.slice(8, 12).map((page, i) => {
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
                    })}
                </ul>
            </div>
            <div className="sub-nav-menu-item">
                <ul>
                    {currentDropDown.slice(12, 16).map((page, i) => {
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
                    })}
                </ul>
            </div>
        </div>  
    )    
    } else if(currentMenu === 'Applications'){
        return (
        <div className="sub-nav-menu-wrapper">
            <div className="sub-nav-menu-item" style={{flexBasis: '33%'}}>
                <ul>
                {currentDropDown.slice(0, 3).map((page, i) => {
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
                })}
                </ul>
            </div>
            <div className="sub-nav-menu-item" style={{flexBasis: '33%'}}>
                <ul>
                    {currentDropDown.slice(3, 6).map((page, i) => {
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
                    })}
                </ul>
            </div>
            <div className="sub-nav-menu-item" style={{flexBasis: '33%'}}>
                <ul>
                    {currentDropDown.slice(6, 11).map((page, i) => {
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
                    })}
                </ul>
            </div>
        </div>  
        )
    } else if(currentMenu === 'Case Studies'){
        return(
            <div className="sub-nav-menu-wrapper">
                <div className="sub-nav-menu-item">
                    <ul>
                    {currentDropDown.slice(0, 4).map((page, i) => {
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
                    })}
                    </ul>
                </div>
                <div className="sub-nav-menu-item">
                    <ul>
                        {currentDropDown.slice(4, 8).map((page, i) => {
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
                        })}
                    </ul>
                </div>
                <div className="sub-nav-menu-item">
                    <ul>
                        {currentDropDown.slice(8, 12).map((page, i) => {
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
                        })}
                    </ul>
                </div>
                <div className="sub-nav-menu-item">
                    <ul>
                        {currentDropDown.slice(12, 16).map((page, i) => {
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
                        })}
                    </ul>
                </div>
            </div>  
        )
    }
}


export default ProductsNav;