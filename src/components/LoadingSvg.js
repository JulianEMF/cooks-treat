import loadingSvg from "../images/loading.svg";
import '../styles/loading-svg.css';

const LoadingSvg = () => {
    return(
        <img className="loading-svg" src={loadingSvg} alt="Loading..." />
    )
}

export default LoadingSvg;
