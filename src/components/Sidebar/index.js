import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {FaGripfire, FaSave} from 'react-icons/fa'
import {SiYoutubegaming} from 'react-icons/si'
import './index.css'

const Sidebar = () => (
  <nav className="nav-sidebar">
    <div className="nav-content">
      <ul className="nav-menu">
        <Link to="/" className="nav-link">
          <li className="list-item">
            <AiFillHome />
            <span> Home</span>
          </li>
        </Link>
        <Link to="/trending" className="nav-link">
          <li className="list-item">
            <FaGripfire />
            <span> Trending</span>
          </li>
        </Link>
        <Link to="/gaming" className="nav-link">
          <li className="list-item">
            <SiYoutubegaming />
            <span> Gaming</span>
          </li>
        </Link>
        <Link to="/saved-videos" className="nav-link">
          <li className="list-item">
            <FaSave />
            <span> Saved Videos</span>
          </li>
        </Link>
      </ul>
    </div>
    <div>
      <p>CONTACT US</p>
      <div className="logos">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
          alt="facebook logo"
          className="logo"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
          alt="twitter logo"
          className="logo"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
          alt="linked in logo"
          className="logo"
        />
      </div>
      <p>Enjoy! Now to see your channels and recommendations!</p>
    </div>
  </nav>
)
export default withRouter(Sidebar)
