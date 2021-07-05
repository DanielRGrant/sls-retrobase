import { Link } from 'react-router-dom'

export const renderClassItem = (classes) => {
    const classResultsScript = classes.map(rtClass => {
        return (
            <Link to={"/class/" + rtClass.class} className="linkNoDecoration">
                <div className="SearchResult">
                    <h3>{rtClass.class}</h3>
                </div>
            </Link>
        )
    })
    return classResultsScript
}