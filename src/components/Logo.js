import '../styles/header.css';
import logo from '../images/logo.png';

const Logo = () => {
    return(
        <div className="logo-container">
            <img src={logo} alt="Logo" />
        </div>
    )
}

export default Logo;