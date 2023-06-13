import {Component} from 'react'
import {FaVideo} from 'react-icons/fa'
import {AiOutlineClose} from 'react-icons/ai'
import './index.css'

class OtherBanner extends Component {
  state = {
    showBanner: true,
  }

  onClose = () => {
    this.setState({showBanner: false})
  }

  render() {
    const {showBanner} = this.state
    const {title} = this.props
    if (!showBanner) {
      return null
    }

    return (
      <div className="banner_" data-testid="banner">
        <div className="banner_details">
          <FaVideo />
          <h1>{title}</h1>
        </div>
        <button
          type="button"
          className="close_"
          data-testid="close"
          onClick={this.onClose}
        >
          <AiOutlineClose />
        </button>
      </div>
    )
  }
}

export default OtherBanner
