import React from 'react';


const InlineMessage = (props) => {
    return props.show 
        ? 
            <div className={`inlineMessage ${props.success ? 'success' : 'fail'}`}>
                <p>{props.message}</p>
            </div>
        :
            null
}

export default InlineMessage