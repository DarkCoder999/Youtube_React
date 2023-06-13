import {Component} from 'react'
import {formatDistanceToNow} from 'date-fns'
import {BsDot} from 'react-icons/bs'
import {AiOutlineLike, AiOutlineDislike, AiOutlineSave} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import ReactPlayer from 'react-player'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Sidebar from '../Sidebar'
import Header from '../Header'
import SavedContext from '../../context/SavedContext'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoItemView extends Component {
  state = {
    videoData: {},
    apiStatus: apiStatusConstants.initial,
    isSaved: false,
    activeButton: null,
  }

  componentDidMount() {
    this.getVideos()
  }

  getVideos = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = {
        title: fetchedData.video_details.title,
        viewCount: fetchedData.video_details.view_count,
        publishedAt: fetchedData.video_details.published_at,
        id: fetchedData.video_details.id,
        thumbnailUrl: fetchedData.video_details.thumbnail_url,
        channelName: fetchedData.video_details.channel.name,
        channelUrl: fetchedData.video_details.channel.profile_image_url,
        channelCount: fetchedData.video_details.channel.subscriber_count,
        description: fetchedData.video_details.description,
        videoUrl: fetchedData.video_details.video_url,
      }
      this.setState({
        videoData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  retry = () => {
    this.getVideos()
  }

  renderFailureView = () => (
    <div className="videos-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
        className="videos-failure-img"
      />
      <h1 className="videos-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="videos-failure-description">
        We are having some trouble to complete your request. Please try again.
      </p>
      <button type="button" onClick={this.retry}>
        Retry
      </button>
    </div>
  )

  renderVideoData = () => (
    <SavedContext.Consumer>
      {value => {
        const jwtToken = Cookies.get('jwt_token')
        if (jwtToken === undefined) {
          return <Redirect to="/login" />
        }
        const {videoData, isSaved, activeButton} = this.state
        const {
          title,
          viewCount,
          publishedAt,
          channelName,
          channelUrl,
          channelCount,
          description,
          videoUrl,
        } = videoData
        const {addVideo, deleteVideo} = value
        const onClickSave = () => {
          if (isSaved) {
            deleteVideo(videoData.id)
            this.setState({isSaved: false})
          } else {
            addVideo({...videoData})
            this.setState({isSaved: true})
          }
        }

        const onClickLike = () => {
          this.setState({activeButton: 'like'})
        }

        const onClickDislike = () => {
          this.setState({activeButton: 'dislike'})
        }

        return (
          <div data-testid="videoItemDetails">
            <Header />
            <div className="container">
              <div className="container1">
                <Sidebar />
              </div>
              <div className="container2">
                <div className="all-videos-container">
                  <div style={{width: '80%'}}>
                    <ReactPlayer url={videoUrl} />
                  </div>
                  <p>{title}</p>
                  <div className="details">
                    <div>
                      <p>
                        {viewCount} views
                        <BsDot />
                        {formatDistanceToNow(new Date(publishedAt))}
                      </p>
                    </div>
                    <div className="icons">
                      <button
                        type="button"
                        className="buttons"
                        onClick={onClickLike}
                        style={{
                          color: activeButton === 'like' ? '#2563eb' : 'black',
                        }}
                      >
                        <AiOutlineLike />
                        Like
                      </button>
                      <button
                        type="button"
                        className="buttons"
                        onClick={onClickDislike}
                        style={{
                          color:
                            activeButton === 'dislike' ? '#2563eb' : 'black',
                        }}
                      >
                        <AiOutlineDislike />
                        Dislike
                      </button>
                      <button
                        type="button"
                        className="buttons"
                        onClick={onClickSave}
                        style={{
                          color: isSaved ? '#2563eb' : 'black',
                        }}
                      >
                        <AiOutlineSave />
                        {isSaved ? 'Saved' : 'Save'}
                      </button>
                    </div>
                  </div>
                  <hr />
                  <div className="video-content">
                    <img src={channelUrl} alt="channel logo" />
                    <div className="video-details">
                      <p>{channelName}</p>
                      <p>{`${channelCount} subscribers`}</p>
                      <p>{description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }}
    </SavedContext.Consumer>
  )

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVideoData()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }
}

export default VideoItemView
