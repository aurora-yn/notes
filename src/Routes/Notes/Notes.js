import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import * as firebase from 'firebase'


const Header = styled.div`
  margin-bottom: 50px;
`
const Title = styled.h1`
  font-size: 50px;
  font-weight: 600;
  margin: 0;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
`
const Button = styled.div`
  margin-left: 10px;
  transform: scale(0.8);
  // background-color: #eee;
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
`
const Subtitle = styled.h2`
  color: #a2a19e;
  font-weight: 400;
`
const Notes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`
const Note = styled.div`
  padding: 10px;
  padding-left: 5px;
  transition: background-color 0.1s linear;
  cursor: pointer;
  border-radius: 5px;
  margin-bottom: 10px;
  &:hover {
    background-color: #eeeeee;
  }
`
const NoteTitle = styled.span`
  padding-bottom: 5px;
  font-weight: 600;
  font-size: 20px;
`

const NotesContainer = () => {
  const [notesData, setNotesData] = useState({})
  useEffect(() => {
    firebase.database().ref('notes').on('value', snapshot => {
      if (snapshot.val() != null) {
        setNotesData({
          ...snapshot.val()
        })
      }
    })
  }, [])
  return (
    <>
      <Header>
        <Title>
          Simple Notes
          <Link to={'/add'}>
            <Button>+</Button>
          </Link>
        </Title>
        <Subtitle>Taking notes wherever you are</Subtitle>
      </Header>
      <Notes>
        {
          Object.keys(notesData).map(id => {
            return (
              <Link to={`/note/${id}`} key={id}>
                <Note>
                  <NoteTitle>{notesData[id].title}</NoteTitle>
                </Note>
              </Link>
            )
          })
        }
      </Notes>
    </>
  )
}

export default NotesContainer