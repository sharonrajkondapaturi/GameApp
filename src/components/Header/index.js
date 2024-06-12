import {Link, withRouter} from 'react-router-dom'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = () => (
  <nav className="navBar">
    <img
      src="https://t4.ftcdn.net/jpg/05/72/72/19/360_F_572721906_KxUR0YRhp84BHvH3JsSxGmclhMQAeb50.jpg"
      alt="game-logo"
      className="logo"
    />
    <div>
      <Link to="/login" className="link-names">
        <FiLogOut />
        <span>Logout</span>
      </Link>
    </div>
  </nav>
)

export default withRouter(Header)
