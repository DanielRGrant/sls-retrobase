import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { useDetectOutsideClick } from '../../hooks/useDetectOutsideClick';
import { useAuth0 } from "@auth0/auth0-react";
import DropdownMenu from '../DropDown/DropDown';
import { NavbarSearch } from './functions';
import {
    toolOptions,
    signInOption,
    signedInOptions
} from './params'
import { renderMobileSearchBar } from './renderHooks'

// icons
import downArrow from '../../assets/downArrow.png';
import accountIcon from '../../assets/accountIcon.png';
import spannerIcon from '../../assets/spannerIcon.png';
import homeIcon from '../../assets/homeIcon.png';
import searchIcon from '../../assets/searchIcon.png';


const Navbar = () => {
    const history = useHistory();
    const dropdownRef = useRef(null);
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

    // auth hooks to dropdown options
    signInOption[0]["function"] = () => loginWithRedirect({ appState: { returnTo: window.location.pathname } })
    signedInOptions[1]["function"] = () => logout({ returnTo: `${window.location.origin}/loggedout` })

    const handleNavbarSearchSubmit = e => NavbarSearch({ e, setMobileSearchBarActive, history });

    // Search bar
    const [mobileSearchBarActive, setMobileSearchBarActive] = useDetectOutsideClick(dropdownRef, false);
    const OpenMobileSearch = () => setMobileSearchBarActive(!mobileSearchBarActive)
    const mobileSearchBar = renderMobileSearchBar({ dropdownRef, handleNavbarSearchSubmit })

    // Tools dropdown
    const dropdownMobileRef = useRef(null);
    const [mobileToolsActive, setMobileToolsActive] = useDetectOutsideClick(dropdownMobileRef, false);
    const OpenMobileTools = () => setMobileToolsActive(!mobileToolsActive)    

    return (
        <nav className="navbar">
            <span id="mobile-nav-icons">
                <img className="mobile-nav-icon" src={homeIcon} onClick={ () => history.push("/") } alt=""/>
                <span className="mobile-tool-menu-container">
                    <DropdownMenu
                        options={toolOptions}
                        heading={
                            <img className="mobile-nav-icon" src={spannerIcon} onClick={OpenMobileTools} alt=""/>
                        }
                        classes="mobile-dropdown"
                    /> 
                </span>
                <img className="mobile-nav-icon" src={searchIcon} onClick={OpenMobileSearch} alt=""/>
            </span>

            {mobileSearchBarActive && mobileSearchBar}

            <span id="desktop-nav">
                <Link className="inline menu-button RetrobaseLogo" to="/" > Retrobase</Link>

                <div className="search-bar-tool-menu">
                    <form className="inline searchBarForm" onSubmit={handleNavbarSearchSubmit }>
                        <input className="searchBar" id="search_input" type="text" name="search_input" placeholder="Search Retrobase..." ></input>
                    </form>
                    <span className="tool-menu">
                        <DropdownMenu 
                            options={toolOptions} 
                            heading={
                            <>
                                <span>Tools</span>
                                <img src={downArrow} alt=""/>
                            </>
                            }
                            classes="menu-container-left-align"
                        /> 
                    </span>      
                </div>
            </span>
                <span className="logout logout-mobile">
                    <DropdownMenu 
                        options={
                            isAuthenticated 
                                ? signedInOptions
                                : signInOption
                        }
                        heading={<><img src={accountIcon} alt=""/><img src={downArrow} alt=""/></>}
                        classes="menu-container-right-align"
                    />
                </span>   
                <span className="logout logout-desktop">
                    <DropdownMenu
                        options={
                            isAuthenticated
                                ? signedInOptions
                                : signInOption
                        }
                        heading={<><img src={accountIcon} alt=""/><img src={downArrow} alt=""/></>}
                        classes="mobile-dropdown"
                    />
                </span>
        </ nav>
    )
}

export default Navbar

