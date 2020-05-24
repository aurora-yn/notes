import React from 'react'
import * as firebase from 'firebase'

import Editor from '../../Components/Editor/Editor'

export default class Add extends React.Component {
  render() {
    return (
      <Editor 
        onSave={this._onSave} 
      />
    )
  }
  _onSave = (title, content) => {
    const { history : { push }} = this.props
    if (title !== '' && content !== '') {
      firebase.database().ref('notes').push({
        title: title,
        content: content,
      })
      push('/')
    }
  }
}