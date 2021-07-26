const usePageNumbersScript = ({start, end, numPages,currentPage, getPage}) => {
    var pageLinks = []
    for (var a = start; a <= end; a++) {
        pageLinks.push(
            <li
                className={`PageNumberLinks ${a === currentPage ? "active" : ""} pagination-link`}
                id={a}
                onClick={a !== currentPage ? (e) => getPage(e) : ()=>{}}
            >
                {a}
            </li>
        )
    }
    if (currentPage !== 1) {
        pageLinks.unshift(
            <>
                <li
                className="PageNumberLinks pagination-link" id={start}
                onClick={(e) => getPage(e)}
                >
                    Start
                </li>   
                <li
                    className="PageNumberLinks pagination-link"
                    id={"prev"}
                    onClick={(e) => getPage(e)}
                >
                    Prev
                </li>
            </>
        )
    }
    if (currentPage !== end) {
        pageLinks.push(
            <>
                <li
                    className="PageNumberLinks pagination-link" id={"next"}
                    onClick={(e) => getPage(e)}
                >
                    Next
                </li> 
                <li
                className="PageNumberLinks pagination-link" id={numPages}
                onClick={(e) => getPage(e)}
                >
                    End
                </li>        
            </>   
        )
        
    }
    return pageLinks
}

export default usePageNumbersScript