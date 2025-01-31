import './index.css'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="navContainer">
      <Link to="/" className="navItems">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="websiteLogo"
        />
      </Link>

      <ul className="navItemsContainer">
        <Link to="/" className="navItems">
          <li>Home</li>
        </Link>
        <Link to="/jobs" className="navItems">
          <li>Jobs</li>
        </Link>
        <li>
          <button
            type="button"
            className="logOutButton"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </li>
      </ul>

      <div className="navigationIcons">
        <AiFillHome size="30" />
        <BsBriefcaseFill size="30" />
        <FiLogOut onClick={onClickLogout} size="30" />
      </div>
    </nav>
  )
}

export default withRouter(Header)
