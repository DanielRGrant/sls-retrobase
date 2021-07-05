import { Link } from 'react-router-dom'

export const renderDnaList = (data) => {
    const dnaListScript = data.map((item, i) => {
        return (
            <>
                {(i !== 0)
                    ? <Link to={"/dna/" + item.dna_id}>, {item.dna_id}</Link>
                    : <Link to={"/dna/" + item.dna_id}>{item.dna_id}</Link>
                }
            </>
        )
    })
    return dnaListScript
}