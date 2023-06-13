import TrendingVideoCard from '../TrendingVideoCard'
import SavedContext from '../../context/SavedContext'

import './index.css'

const SavedVideoView = () => (
  <SavedContext.Consumer>
    {value => {
      const {savedList} = value
      return (
        <ul className="video-list">
          {savedList.map(video => (
            <TrendingVideoCard key={video.id} videoData={video} />
          ))}
        </ul>
      )
    }}
  </SavedContext.Consumer>
)

export default SavedVideoView
