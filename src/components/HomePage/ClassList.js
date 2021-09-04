import axios from 'axios'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
const config = require('../../config.json')

const ClassList = () => {
    const [classesScript, setClassesScript] = useState([])
    const requestUrl = config.queryApiUrl + "/list-classes"
    useEffect(async ()=>{
        const resp = await axios.get(requestUrl)
        const rtClasses = JSON.parse(resp.data.body)
        var tmp = rtClasses.map(rtClass => {
            return <li><Link to={"/class/" + "ERV"}>ERV</Link></li>
        })
        setClassesScript(tmp)
    },[])

    return (
        <ul>
            { classesScript }
        </ul>
    )
}

export default ClassList