import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const logOut = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <ul className="header">
      <li className="lister">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-image"
          />
        </Link>
      </li>
      <div className="lisss">
        <li className="lister">
          <Link to="/" className="home">
            Home
          </Link>
          <Link to="/jobs" className="job">
            Jobs
          </Link>
        </li>
      </div>
      <Link to="/login">
        <li className="lister">
          <button type="button" className="logout-btn" onClick={logOut}>
            Logout
          </button>
        </li>
      </Link>
    </ul>
  )
}
export default withRouter(Header)
