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
    channelUrl,
    id,
  } = videoData

  return (
    <Link to={`/videos/${id}`} className="link-item">
      <li className="video-item">
        <img src={thumbnailUrl} alt="video thumbnail" className="thumbnail" />
        <div className="content">
          <img src={channelUrl} alt="channel logo" className="logo" />
          <div>
            <p>{title}</p>
            <p>{channelName}</p>
            <div className="content">
              <p>{viewCount}</p>
              <p>
                <BsDot /> {formatDistanceToNow(new Date(publishedAt))}
              </p>
            </div>
          </div>
        </div>
      </li>
    </Link>
  )
}
export default VideoCard
