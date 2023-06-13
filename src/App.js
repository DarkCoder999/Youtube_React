import {Route, Switch, Redirect} from 'react-router-dom'
import {Component} from 'react'
import Login from './components/Login'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import VideoItemView from './components/VideoItemView'
import SavedVideo from './components/SavedVideo'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import SavedContext from './context/SavedContext'
import './App.css'

class App extends Component {
  state = {
    savedList: [],
  }

  addVideo = video => {
    this.setState(prevState => ({savedList: [...prevState.savedList, video]}))
  }

  deleteVideo = videoId => {
    this.setState(prevState => ({
      savedList: prevState.savedList.filter(it => it.id !== videoId),
    }))
  }

  render() {
    const {savedList} = this.state

    return (
      <SavedContext.Provider
        value={{
          savedList,
          addVideo: this.addVideo,
          deleteVideo: this.deleteVideo,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideo} />
          <ProtectedRoute exact path="/videos/:id" component={VideoItemView} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </SavedContext.Provider>
    )
  }
}

export default App
