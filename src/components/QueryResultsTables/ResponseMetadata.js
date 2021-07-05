const ResponseMetadata = ({respData, params}) => {
    return (
        <div className="infoBox">
            <h3>Metadata</h3>
            <table>
                <tr>
                    <th>Sequence Type</th>
                    <td>{respData.seq_type}</td>
                </tr>
                <tr>
                    <th>Query Sequence</th>
                    <td className="wrapped nokern">{params.query}</td>
                </tr>
                <tr>
                    <th>Number of Matches</th>
                    <td>{respData.num_items}</td>
                </tr>               
            </table>
        </div>
    )
}

export default ResponseMetadata