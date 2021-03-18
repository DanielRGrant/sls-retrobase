import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { useHistory } from "react-router-dom";
import { useDetectOutsideClick } from '../hooks/useDetectOutsideClick';
import axios from 'axios'

// icons
import DropdownMenu from './DropDown';
import downArrow from '../assets/downArrow.png'
import accountIcon from '../assets/accountIcon.png'
import spannerIcon from '../assets/spannerIcon.png'
import homeIcon from '../assets/homeIcon.png'
import searchIcon from '../assets/searchIcon.png'
import { AxiosGetAndPush } from '../functions/functions';
const config = require("../jsconfig.json")


const Navbar = (props) => {
    //search bar submit
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        setMobileSearchBarActive(false);  
        
        const search = e.target.search_input.value
        const params = { "search": search }
        const requestUrl = config.queryApiUrl + "/navbarsearch"
        const pushUrl = "/searchresults/" + search
        AxiosGetAndPush(params, requestUrl, pushUrl, history)
    }

    async function signOut() {
        try {
            await Auth.signOut();
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

    // mobile logic
    
    // Search bar
    const dropdownRef = useRef(null);
    const [mobileSearchBarActive, setMobileSearchBarActive] = useDetectOutsideClick(dropdownRef, false);
    const OpenMobileSearch = () => setMobileSearchBarActive(!mobileSearchBarActive)

    // Tools dropdown
    const dropdownMobileRef = useRef(null);
    const [mobileToolsActive, setMobileToolsActive] = useDetectOutsideClick(dropdownMobileRef, false);
    const OpenMobileTools = () => setMobileToolsActive(!mobileToolsActive)    

    //tools dropdown menu
    const toolOptions = [
        {
            "title": "Query",
            "route": "/query"
        },
        {
            "title": "Tissue Expression Atlas",
            "route": "/tissueexpression"
        }
    ]

    const signInOption = [
        {
            "title": "Sign In / Register",
            "route": {
                "pathname": "/signin",
                "state": { "from": window.location.pathname}
            }
        }
    ]

    const signedInOptions = [
        {
            "title": "Account",
            "route": "/account"
        },
        {
            "title": "Sign Out",
            "function": signOut
        }
    ]

    return (
        <nav className="navbar">
            <span id="mobile-nav-icons">
                <img className="mobile-nav-icon" src={homeIcon} onClick={ () => history.push("/") }/>
                <span className="mobile-tool-menu-container">
                    <DropdownMenu
                        options={toolOptions}
                        heading={<img className="mobile-nav-icon" src={spannerIcon} onClick={OpenMobileTools} />}
                        classes="mobile-dropdown"
                    /> 
                </span>
                <img className="mobile-nav-icon" src={searchIcon} onClick={ OpenMobileSearch }/>
            </span>



            {mobileSearchBarActive ?
                <div className="mobile-search-bar-container" ref={dropdownRef}>
                    <form className="mobile-search-bar-form" onSubmit={handleSubmit}>
                        <input className="mobile-search-bar" id="search_input" type="text" name="search_input" placeholder="Search Retrobase..." ></input>
                    </form>
                </div>
            : null
            }
            
            <span id="desktop-nav">
                <Link className="inline menu-button RetrobaseLogo" to="/" > Retrobase</Link>

                <div className="search-bar-tool-menu">
                    <form className="inline searchBarForm" onSubmit={ handleSubmit }>
                        <input className="searchBar" id="search_input" type="text" name="search_input" placeholder="Search Retrobase..." ></input>
                    </form>
                    <span className="tool-menu">
                        <DropdownMenu 
                            options={toolOptions} 
                            heading={<><span>Tools</span>
                            <img src={downArrow} /></>}
                            classes="menu-container-left-align"
                        /> 
                    </span>      
                </div>
            </span>
                <span className="logout logout-mobile">
                    <DropdownMenu 
                        options={
                            props.user
                                ? signedInOptions
                                : signInOption
                        }
                        heading={<><img src={accountIcon}/><img src={downArrow} /></>}
                        classes="menu-container-right-align"
                    />
                </span>   
                <span className="logout logout-desktop">
                    <DropdownMenu
                        options={
                            props.user
                                ? signedInOptions
                                : signInOption
                        }
                        heading={<><img src={accountIcon} /><img src={downArrow} /></>}
                        classes="mobile-dropdown"
                    />
                </span>
        </ nav>
    )
}

export default Navbar

