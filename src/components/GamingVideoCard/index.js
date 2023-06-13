import {Link} from 'react-router-dom'
import './index.css'

const VideoCard = props => {
  const {videoData} = props
  const {title, viewCount, thumbnailUrl, id} = videoData

  return (
    <Link to={`/videos/${id}`} className="link-item">
      <li className="video-item_">
        <img src={thumbnailUrl} alt="video thumbnail" className="thumbnail__" />
        <div className="content__">
          <p>{title}</p>
          <p>{`${viewCount} Watching Worldwide`}</p>
        </div>
      </li>
    </Link>
  )
}
export default VideoCard
