import {formatDistanceToNow} from 'date-fns'
import {Link} from 'react-router-dom'
import {BsDot} from 'react-icons/bs'
import './index.css'

const VideoCard = props => {
  const {videoData} = props
  const {
    title,
    viewCount,
    publishedAt,
    thumbnailUrl,
    channelName,
    id,
  } = videoData

  return (
    <Link to={`/videos/${id}`} className="link-item">
      <li className="video_item">
        <img src={thumbnailUrl} alt="video thumbnail" className="thumbnail_" />
        <div className="content_">
          <p>{title}</p>
          <p>{channelName}</p>
          <div className="content_">
            <p>
              {viewCount}
              <BsDot />
              {formatDistanceToNow(new Date(publishedAt))}
            </p>
          </div>
        </div>
      </li>
    </Link>
  )
}
export default VideoCard
