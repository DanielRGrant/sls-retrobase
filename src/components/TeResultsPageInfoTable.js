const TeResultsPageInfoTable = (props) => {
    const item = props.item
    const infoTable = item.tissue 
        ? (
            <table className="infotable">
                <tbody>
                    <tr>
                        <th scope="row">Tissue: </th>
                        <td>{item.tissue}</td>
                    </tr>
                    <tr>
                        <th scope="row">Publication: </th>
                        <td>{item.publication}</td>
                    </tr>
                    <tr>
                        <th scope="row">Cancer: </th>
                        <td>{item.cancer}</td>
                    </tr>                
                    <tr>
                        <th scope="row">Validated: </th>
                        <td>{item.validated}</td>
                    </tr>
                </tbody>
            </table>
        )
        : <p>No metadata available if data wasn't uploaded to Tissue Expression Atlas</p>

    return infoTable
}

export default TeResultsPageInfoTable