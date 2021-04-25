import FadeLoader from 'react-spinners/FadeLoader';

const LoadingBox = (props) => {
    return (
        <section className="LoadingBox">
            <div className="box">
                <h3>{props.title}</h3>
                <p>{props.message}</p>
            </div>                
                <FadeLoader />
        </section>
    )
}

export default LoadingBox