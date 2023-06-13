import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Banner from '../Banner'
import Sidebar from '../Sidebar'
import Header from '../Header'
import AllVideoView from '../AllVideoView'
import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <div data-testid="home">
      <Header />
      <div className="container">
        <div className="container1">
          <Sidebar />
        </div>
        <div className="container2">
          <Banner />
          <AllVideoView />
        </div>
      </div>
    </div>
  )
}

export default Home
