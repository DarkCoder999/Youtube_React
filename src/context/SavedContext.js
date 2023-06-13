import React from 'react'

const SavedContext = React.createContext({
  savedList: [],
  addVideo: () => {},
  deleteVideo: () => {},
})

export default SavedContext
