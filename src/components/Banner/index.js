import {Component} from 'react'
import {AiOutlineClose} from 'react-icons/ai'
import {Container} from './styledComponents'
import './index.css'

class Banner extends Component {
  state = {
    showBanner: true,
  }

  onClose = () => {
    this.setState({showBanner: false})
  }

  render() {
    const {showBanner} = this.state
    if (!showBanner) {
      return null
    }

    return (
      <Container data-testid="banner">
        <div className="banner-details">
          <img
            className="website-logo1"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="nxt watch logo"
          />
          <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
          <button type="button" className="button">
            GET IT NOW
          </button>
        </div>
        <button
          type="button"
          className="close"
          data-testid="close"
          onClick={this.onClose}
        >
          <AiOutlineClose />
        </button>
      </Container>
    )
  }
}

export default Banner
