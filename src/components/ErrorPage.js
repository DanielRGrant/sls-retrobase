const ErrorPage = (props) => {
    return(
        <section>
            <div className="box">
                <h3>Error Occured: </h3><span>{props.location?.state?.error ? props.location.state.error : "Unspecified Error"}</span>
            </div>
        </section>
    )
}

export default ErrorPage