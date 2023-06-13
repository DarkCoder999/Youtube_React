import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {AiOutlineSearch} from 'react-icons/ai'
import VideoCard from '../VideoCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AllVideoView extends Component {
  state = {
    videosList: [],
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
  }

  componentDidMount() {
    this.getVideos()
  }

  getVideos = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {searchInput} = this.state
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.videos.map(video => ({
        title: video.title,
        viewCount: video.view_count,
        publishedAt: video.published_at,
        id: video.id,
        thumbnailUrl: video.thumbnail_url,
        channelName: video.channel.name,
        channelUrl: video.channel.profile_image_url,
      }))
      this.setState({
        videosList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  enterSearchInput = () => {
    this.getVideos()
  }

  changeSearchInput = e => {
    this.setState({searchInput: e.target.value})
  }

  renderFailureView = () => {
    const {searchInput} = this.state
    return (
      <div className="videos-error-view-container">
        <input
          type="search"
          placeholder="Search"
          value={searchInput}
          data-testid="searchButton"
          onChange={this.changeSearchInput}
        />
        <button type="button" onClick={this.enterSearchInput}>
          <AiOutlineSearch />
        </button>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
          alt="failure view"
          className="videos-failure-img"
        />
        <h1 className="videos-failure-heading-text">
          Oops! Something Went Wrong
        </h1>
        <p className="videos-failure-description">
          We are having some trouble processing your request. Please try again.
        </p>
        <button type="button" onClick={this.enterSearchInput}>
          Retry
        </button>
      </div>
    )
  }

  renderVideosList = () => {
    const {videosList, searchInput} = this.state
    const shouldShowVideosList = videosList.length > 0

    return shouldShowVideosList ? (
      <div className="all-videos-container">
        <input
          type="search"
          placeholder="Search"
          value={searchInput}
          className="search"
          onChange={this.changeSearchInput}
        />
        <button
          data-testid="searchButton"
          type="button"
          onClick={this.enterSearchInput}
        >
          <AiOutlineSearch />
        </button>
        <ul className="videos-list">
          {videosList.map(video => (
            <VideoCard videoData={video} key={video.id} />
          ))}
        </ul>
      </div>
    ) : (
      <>
        <input
          type="search"
          placeholder="Search"
          value={searchInput}
          data-testid="searchButton"
          onChange={this.changeSearchInput}
        />
        <button type="button" onClick={this.enterSearchInput}>
          <AiOutlineSearch />
        </button>
        <div className="no-videos-view">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
            className="no-videos-img"
            alt="no videos"
          />
          <h1 className="no-videos-heading">No Search results found</h1>
          <p className="no-videos-description">
            Try different key words or remove search filter.
          </p>
          <button type="button" onClick={this.enterSearchInput}>
            Retry
          </button>
        </div>
      </>
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVideosList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }
}

export default AllVideoView
