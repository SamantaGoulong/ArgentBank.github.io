import '../Sass/Header.scss'
import argentBankLogo from '../assets/Images/argentBankLogo.png'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <>
            <nav className="nav-container">
                <img src={argentBankLogo} alt="logo" />
                <Link to="/"className={`link-nav-sign-in`}>
                    <i class="fa fa-user-circle"></i>
                    Sign In
                </Link>
            </nav>
        </>
    )
}

export default Header
