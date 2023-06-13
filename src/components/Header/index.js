import {Link, withRouter} from 'react-router-dom'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="nav-header">
      <div className="nav-content1">
        <Link to="/">
          <img
            className="website-logo"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="website logo"
          />
        </Link>
      </div>
      <div>
        <Popup
          trigger={
            <button type="button" className="profile-button">
              <img
                className="profile"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                alt="profile"
              />
            </button>
          }
          position="bottom right"
        >
          <p>Hi User !!!</p>
        </Popup>

        <Popup
          modal
          trigger={
            <button type="button" className="trigger-button">
              Logout
            </button>
          }
          className="popup-content"
        >
          {close => (
            <>
              <div>
                <p>Are you sure, you want to logout?</p>
              </div>
              <div>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => close()}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="confirm-button"
                  onClick={onClickLogout}
                >
                  Confirm
                </button>
              </div>
            </>
          )}
        </Popup>
      </div>
    </nav>
  )
}
export default withRouter(Header)
