import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import OtherBanner from '../OtherBanner'
import SavedContext from '../../context/SavedContext'
import Sidebar from '../Sidebar'
import Header from '../Header'
import SavedVideoView from '../SavedVideoView'
import './index.css'

const SavedVideo = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <SavedContext.Consumer>
      {value => {
        const {savedList} = value
        const showEmptyView = savedList.length === 0
        return (
          <div data-testid="savedVideos">
            <Header />
            <div className="container">
              <div className="container1">
                <Sidebar />
              </div>
              <div className="container2">
                {showEmptyView ? (
                  <div className="no-videos-view">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                      className="no-videos-img"
                      alt="no saved videos"
                    />
                    <h1 className="no-videos-heading">No saved videos found</h1>
                    <p className="no-videos-description">
                      You can save your videos while watching them
                    </p>
                  </div>
                ) : (
                  <>
                    <OtherBanner title="Saved Videos" />
                    <SavedVideoView />
                  </>
                )}
              </div>
            </div>
          </div>
        )
      }}
    </SavedContext.Consumer>
  )
}

export default SavedVideo
