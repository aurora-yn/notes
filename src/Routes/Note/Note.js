import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import MarkdownRenderer from 'react-markdown-renderer'

import * as firebase from 'firebase'

const TitleComponent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 50px;
`
const Title = styled.h1`
  font-size: 50px;
  margin: 0;
  padding: 0;
`
const ButtonContainer = styled.div`
`
const Button = styled.button`
  margin-right = 30px;
`

const Note = props => {
  const { match: { params: { id } } } = props
  const [noteData, setNoteData] = useState({})
  const data = firebase.database().ref(`notes/${id}`)

  useEffect(() => {
    data.on('value', snapshot => {
      setNoteData(snapshot.val())
    })
  }, [])

  const deleteNote = () => {
    const { history : { push }} = props
    data.remove()
    push('/')
  }

  return (
    <>
      <TitleComponent>
        <Title>{noteData.title}</Title>
        <ButtonContainer>
          <Link to={`/edit/${id}`} title={noteData.title}>
            <Button>Edit</Button>
          </Link>
          <Button onClick={deleteNote}>Delete</Button>
        </ButtonContainer>
      </TitleComponent>
      <MarkdownRenderer
        markdown={noteData.content}
      />
    </>
  )
}

export default Note