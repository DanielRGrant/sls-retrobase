import { useDetectOutsideClick } from '../../hooks/useDetectOutsideClicksParentPassesState'
import { useRef } from 'react'

const PopUpBox = ({ options, mainText, bannerText, isActive, setIsActive, customClass, blockSurrounding }) => {
    const popUpRef = useRef(null);
    const [popUpIsActive, setPopUpIsActive] = useDetectOutsideClick({ el: popUpRef, isActive, setIsActive})
    const buttons = options 
        ? options.map(option => {
            return(
                <button onClick={option.function}>{option.text}</button>
            )
        })
        : undefined

    const doBlockSurrounding = blockSurrounding ? " blockSurrounding" : ""
    const customClassStr = customClass ? ` ${customClass} ` : ""

    return (
        <>
            {popUpIsActive &&
                <div ref={popUpRef} className={"popUpBox" + customClassStr +  doBlockSurrounding}>
                    <p className="topBar">{bannerText}</p>
                    <div className="contents">
                        <p>{mainText}</p>
                        {buttons && 
                            <div className="buttons">
                                {buttons}
                            </div>
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default PopUpBox