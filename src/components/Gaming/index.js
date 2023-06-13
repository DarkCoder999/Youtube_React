import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import OtherBanner from '../OtherBanner'
import Sidebar from '../Sidebar'
import Header from '../Header'
import GamingVideoView from '../GamingVideoView'
import './index.css'

const Trending = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <div data-testid="gaming">
      <Header />
      <div className="container">
        <div className="container1">
          <Sidebar />
        </div>
        <div className="container2">
          <OtherBanner title="Gaming" />
          <GamingVideoView />
        </div>
      </div>
    </div>
  )
}

export default Trending
