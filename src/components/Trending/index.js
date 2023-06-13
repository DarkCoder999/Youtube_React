import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import OtherBanner from '../OtherBanner'
import Sidebar from '../Sidebar'
import Header from '../Header'
import TrendingVideoView from '../TrendingVideoView'
import './index.css'

const Trending = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <div data-testid="trending">
      <Header />
      <div className="container">
        <div className="container1">
          <Sidebar />
        </div>
        <div className="container2">
          <OtherBanner title="Trending" />
          <TrendingVideoView />
        </div>
      </div>
    </div>
  )
}

export default Trending
