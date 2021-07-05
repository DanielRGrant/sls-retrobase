import { Link } from 'react-router-dom';

export const renderProteinNameList = (knownProt) => {
    const proteinNameList = knownProt.map((proteinName, i) => {

        var tmp = (
            <Link to={"/knownprotein/" + proteinName.protein}>
                <span>{proteinName.protein}</span>
            </Link>
        )

        if (i !== 0) {
            return <span>, {tmp}</span>
        } else {
            return <span>{tmp}</span>
        }
    });
    return proteinNameList
}

export const renderProteinFunctions = (knownProt) => {
    const proteinFunctions = knownProt.map(proteinName => {
        return (
            <div>
                <h2> {proteinName.protein}</h2>
                <h3> Function </h3>
                <p><i>Information taken from Uniprot</i> <a href={"https://www.uniprot.org/" + proteinName.accession}>({proteinName.accession})</a></p>
                <p>{proteinName.function}</p>
                <h3>Reference Sequence</h3>
                <p class="wrapped nokern">{proteinName.sequence}</p>
            </div>

        )
    })
    return proteinFunctions
}