import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { NavbarSearchResultItems } from './NavBarSearchResultItems'

const NavbarSearchResults = (props) => {
    
    const search = props.match.params.search
    const data = JSON.parse(props.location.state.data)

    const classResultsScript = data.classes.map( rtClass => {
        return(
            <Link to={"/class/" + rtClass.class} className="linkNoDecoration">
                <div className="SearchResult">
                    <h3>{rtClass.class}</h3>
                    <p>{rtClass.description.substr(0, 200)}...</p>
                </div>
            </Link>
            
        )
    })

    const dnaResultsScript = <NavbarSearchResultItems pathName="/dna/" items={data.dna_ids} title="dna_id" entity="a DNA element"/>
    const familiesResultsScript = <NavbarSearchResultItems pathName="/family/" items={data.families} title="family" entity="a family" />
    const proteinResultsScript = <NavbarSearchResultItems pathName="/knownprotein/" items={data.proteins} title="protein" entity="a protein" />
    const prot_idResultsScript = <NavbarSearchResultItems pathName="/predictedprotein/" items={data.prot_ids} title="prot_id" entity="an in silico predicted protein sequence" />


    return (
        <section>
            <div className="box">
                <h1>Search Results for <i>"{search}"</i></h1>

                <div style={{"height": "20px"}}></div>
                <>{classResultsScript}</>
                <>{dnaResultsScript}</>
                <>{prot_idResultsScript}</>
                <>{familiesResultsScript}</>
                <>{proteinResultsScript}</>
            </div>
        </section>
    )
}

export default NavbarSearchResults