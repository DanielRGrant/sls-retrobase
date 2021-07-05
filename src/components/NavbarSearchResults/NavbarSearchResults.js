import { NavbarSearchResultItems } from './NavbarSearchResultItems'
import { renderClassItem} from './renderHooks'

const NavbarSearchResults = (props) => {
    
    const search = props.match.params.search
    const data = JSON.parse(props.location.state.data)
    const classItems = renderClassItem(data.classes)

    return (
        <section>
            <div className="box">
                <h1>Search Results for <i>"{search}"</i></h1>
                <div style={{"height": "20px"}}></div>
                <>{classItems}</>
                <NavbarSearchResultItems pathName="/dna/" items={data.dna_ids} title="dna_id" entity="a DNA element" />
                <NavbarSearchResultItems pathName="/family/" items={data.families} title="family" entity="a family" />
                <NavbarSearchResultItems pathName="/knownprotein/" items={data.proteins} title="protein" entity="a protein" />
                <NavbarSearchResultItems pathName="/predictedprotein/" items={data.prot_ids} title="prot_id" entity="an in silico predicted protein sequence" />
            </div>
        </section>
    )
}

export default NavbarSearchResults