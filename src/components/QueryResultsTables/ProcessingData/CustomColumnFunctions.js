import { Link } from 'react-router-dom'
import { FilterOut, collectUniqueValsFun } from './react-table-creator'


export function MultiValStringColLink({ fieldValue, columnHeader, excludeRow, columnsToFilter, filters, collectUniqueVals}, string_divider, baseurl,) {
    var vals = fieldValue.split(string_divider)
    var fieldScriptTmp = vals.map((val, i) => {
        if (i + 1 !== vals.length) {
            return <Link to={baseurl + val}>{val},</Link>
        } else {
            return <Link to={baseurl + val}>{val}</Link>
        }
    })

    var excludeRow_ListCheck = [] // list booleans, record if filtering value present
    for (let i = 0; i < vals.length; i++) {
        var fieldSubValue = vals[i]
        collectUniqueValsFun(columnsToFilter, collectUniqueVals, columnHeader, fieldSubValue)
        excludeRow_ListCheck[i] = FilterOut(excludeRow, fieldSubValue, filters[columnHeader], columnHeader, columnsToFilter)
    }

    excludeRow = !excludeRow_ListCheck.includes(false)
    var fieldScript = <td>{fieldScriptTmp}</td>
    return [fieldScript, excludeRow, collectUniqueVals]
}

export const FilterDNAProts = ({fieldValue, columnHeader, excludeRow, columnsToFilter, filters, collectUniqueVals}) => {
    console.log(columnsToFilter)
    const proteins = fieldValue.split("#")
    var excludeRow_ListCheck = [] // list booleans, record if filtering value present

    for (var i = 0; i < proteins.length; i++) {
        var protein = proteins[i]

        collectUniqueValsFun(columnsToFilter, collectUniqueVals, columnHeader, protein)
        var filter_bool = FilterOut(excludeRow, protein, filters[columnHeader], columnHeader, columnsToFilter)
        excludeRow_ListCheck.push(filter_bool)
    }
    excludeRow = !excludeRow_ListCheck.includes(false)

    return [false, excludeRow, collectUniqueVals]
}

// DNA search results protein column pre-process
export const processDNAQueryProts = (data, prot_idURL, protURL) => {
    var listOffSet = 0
    let processedData = []
    for (var i = 0; i < data.length; i++) {

        var current = data[i]

        if (i !== 0) {
            var prev = processedData[i - 1 - listOffSet]
        } else {
            var prev = { "dna_id": "" }
        }

        if (current.prot_id === "null") {
            current.protein = "None"
            processedData.push(current)
            continue
        }

        // Create jsx for prot_id
        var protIdLink = <Link to={prot_idURL + current.prot_id}>{current.prot_id}</Link>

        if (current.protein.includes("#")) {
            // Create jsx for proteins with links: (prot1, prot2)
            var protspl = current.protein.split('#');
            const protLinks = protspl.map((prot, j) => {
                return <>
                    <Link to={protURL + prot}>
                        {prot}
                    </Link>
                    {j !== protspl.length - 1
                        ? ", "
                        : null
                    }
                </>
            });
        } else {
            var protLinks =
                <Link to={protURL + current.protein}>
                    {current.protein}
                </Link>;
        };

        try {
            const first = prev.dna_id
            const sec = current.dna_id
        } catch {
            console.log("HEREE BE ERROR: ", processedData)
        }



        if (prev.dna_id === current.dna_id) {
            current.protein = <>{protIdLink} ({protLinks})</>
            prev.protein.push(<p>{current.protein}</p>)
            listOffSet++
        } else {
            current.protein = [<>{protIdLink} ({protLinks})</>]
            processedData.push(current)
        }
    }
    return processedData
}