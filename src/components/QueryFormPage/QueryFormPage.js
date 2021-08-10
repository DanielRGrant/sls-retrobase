import React, { useState, useEffect } from 'react';
import LoadingBox from '../LoadingBox';
import SubmittedBox from './SubmittedBox';
import { useSubmitSequence, useSubmitFile } from './QueryFormFunctions';
import { useAuth0 } from "@auth0/auth0-react";
import {
    renderFileInputMetaDataField,
    renderFileInputFields,
    renderSequenceInputFields,
    renderMustLoginInlineMessage,
    renderQueryForm
} from './renderHooks';


const QueryFormPage = (props) => {
    const [loading, setLoading] = useState(false);
    const [loadingBoxTitle, setLoadingBoxTitle] = useState("");
    const [loadingBoxMessage, setLoadingBoxMessage] = useState("");
    const [submitted, setSubmitted] = useState(true)
    const [showMessage, setShowMessage] = useState(false)
    const [message, setMessage] = useState("")
    // Form inputs
    const [file, setFile] = useState(null);
    const [metadata, setMetadata] = useState({
        "tissue": "",
        "cancer": "No",
        "published": "No",
        "publication": "",
        "researcher": "",
        "uploadTe": "No"
    })
    // initialise table settings
    const [inputType, setInputType] = useState(props.location.state?.uploadTe ? "file" : "sequence");
    const [uploadTe, setUploadTe] = useState("Yes");
    const { isAuthenticated, getAccessTokenSilently, user, loginWithRedirect } = useAuth0();
    const loginWithRedirectWithAppState = () => loginWithRedirect({ appState: { returnTo: window.location.pathname } })
    // event handlers
    const onInputTypeChange = (e) => {
        setInputType(e.target.value)
    }

    const onUploadTeChange = (e) => {
        setUploadTe(e.target.value)
        if (e.target.value === "No") {
            setMetadata(
                {
                    tissue: "",
                    cancer: "No",
                    published: "No",
                    publication: "",
                    researcher: "",
                    uploadTe: "No"
                });
        }
    }

    function FormGetFile(e) {
        setFile(e.target.files[0])
    }
    function FormGetTissue(e) {
        setMetadata({ ...metadata, tissue: e.target.value })
    }
    function FormGetCancer(e) {
        setMetadata({ ...metadata, cancer: String(e.target.value) })
    }
    function FormGetPublished(e) {
        setMetadata({ ...metadata, published: String(e.target.value) })
    }
    function FormGetPublication(e) {
        setMetadata({ ...metadata, publication: e.target.value })
    }
    function FormGetResearcher(e) {
        setMetadata({ ...metadata, researcher: e.target.value })
    }

    const useHandleSubmitSequence = e => useSubmitSequence({ e, 
        metadata, 
        setLoading, 
        setLoadingBoxMessage, 
        setLoadingBoxTitle, 
        setShowMessage, setMessage, 
        history: props.history
    });

    const useHandleSubmitFile = e => useSubmitFile({ 
        e,
        metadata,
        file,
        setLoading,
        setLoadingBoxTitle,
        setLoadingBoxMessage,
        setShowMessage,
        setMessage,
        setSubmitted,
        isAuthenticated,
        getAccessTokenSilently,
        user,
        loginWithRedirectWithAppState
    })

    const fileInputMetaDataField = renderFileInputMetaDataField({
        FormGetTissue,
        FormGetCancer,
        FormGetPublished,
        FormGetResearcher,
        FormGetPublication,
        metadata
    })
    const sequenceInputFields = renderSequenceInputFields()
    const fileInputFields = renderFileInputFields({ FormGetFile, uploadTe, onUploadTeChange, fileInputMetaDataField })
    const mustLoginInlineMessage = renderMustLoginInlineMessage({ loginWithRedirectWithAppState, inputType, isAuthenticated})
    const queryForm = renderQueryForm({ 
        mustLoginInlineMessage, 
        inputType, 
        useHandleSubmitSequence, 
        useHandleSubmitFile,
        onInputTypeChange,
        sequenceInputFields,
        fileInputFields,
        message,
        showMessage
    })


    if (loading) {
        return (
            <LoadingBox
                title={loadingBoxTitle}
                message={loadingBoxMessage}
            />
        )
    }

    return (
        <>
            <SubmittedBox isActive={submitted} setIsActive={setSubmitted} />
            {queryForm}
        </>
    )
};


export default QueryFormPage;