import '../styles/header.css';
import logo from '../images/logo.png';

const Logo = ({ blurContent }) => {
    return(
        <div className='logo-container'>
            <img className={blurContent ? 'blur' : ''} src={logo} alt="Logo" />
        </div>
    )
}

export default Logo;