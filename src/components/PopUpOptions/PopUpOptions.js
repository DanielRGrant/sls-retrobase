import {useEffect} from 'react'


const PopUpOptions = ({options, active, setActive}) => {
    const buttons = options.map(option => {
        return(
            <button onClick={option.function}>{option.text}</button>
        )
    })
    return (
        <div className="popUpBox">
            <p className="topBar">Deleting Data</p>
            <div className="contents">
                <p>Would you also like to delete this data from the Tissue Expression Database?</p>
                <div className="buttons">
                    {buttons}
                    <button onClick={() => setActive(false)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default PopUpOptions