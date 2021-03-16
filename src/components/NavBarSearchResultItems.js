import React from 'react'
import { Link } from 'react-router-dom'

//props.title is the item attribute that will be the title of the search result
//props.entity must have "a/an" prefixed 

export const NavbarSearchResultItems = (props) => {
    const resultsScript = props.items.map(item => {
        return (
            <Link to={props.pathName + item[props.title]} className="linkNoDecoration">
                <div className="SearchResult">
                    <h3>{item[props.title]}</h3>
                    <p>{item[props.title]} is {props.entity} of the {item.class} class of retrotransposons</p>
                </div>
            </Link>
        )
    })    
    return resultsScript
}

export default NavbarSearchResultItems