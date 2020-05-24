import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import MarkdownRenderer from "react-markdown-renderer";
import TextareaAutosize from "react-textarea-autosize";
import * as firebase from 'firebase'

import Editor from '../../Components/Editor/Editor'

// const TitleContainer = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 50px;
// `
// const TitleInput = styled(TextareaAutosize)`
//   font-size: 50px;
//   font-weight: 600;
//   width: 100%;
//   &::placeholder {
//     font-weight: 600;
//   }
// `
// const ContentPreview = styled.div`
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
//   grid-gap: 50px;
// `
// const ContentInput = styled(TextareaAutosize)`
//   font-size: 18px;
//   margin-top: 15px;
// `
// const Button = styled.button``

const Edit = props =>  {
  console.log('Edit props: ', props)
  const { match: { params: { id } } } = props
  const [noteData, setNoteData] = useState({})
  const data = firebase.database().ref(`notes/${id}`)

  console.log('noteData: ', noteData)
  const title = noteData.title

  useEffect(() => {
    data.on('value', snapshot => {
      setNoteData(snapshot.val())
    })
  }, [])

  const _onSave = (title, content) => {
    const { history : { push }} = props
    if (title !== '' && content !== '') {
      data.update({
        title: title,
        content: content,
      })
      push(`/`)
    }
  }
  // const _onInputChange = event => {
  //   const { target: { value, name } } = event
  //   setNoteData({
  //     [name]: value
  //   })
  // }

  return (
    <Editor 
      id={id}
      title={title}
      content={noteData.content}
      onSave={_onSave}
    />
    // <>
    //   <TitleContainer>
    //     <TitleInput 
    //       value={noteData.title}
    //       name={'title'}
    //       placeholder={'Note the title'}
    //       onChange={_onInputChange}
    //     />
    //     <Button onClick={() => _onSave(noteData)}>Save</Button>
    //   </TitleContainer>
    //   <ContentPreview>
    //     <ContentInput 
    //       value={noteData.content}
    //       name={'content'}
    //       placeholder={'# Whatever you write, it supports markdown preview'}
    //       onChange={_onInputChange}
    //     />
    //     <MarkdownRenderer 
    //       markdown={noteData.content}
    //       className={'markdown'}
    //     />
    //   </ContentPreview>
    // </>
  )
}

export default Edit