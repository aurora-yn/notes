import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import MarkdownRenderer from "react-markdown-renderer";
import TextareaAutosize from "react-textarea-autosize";
import * as firebase from 'firebase'

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 50px;
`
const TitleInput = styled(TextareaAutosize)`
  font-size: 50px;
  font-weight: 600;
  width: 100%;
  &::placeholder {
    font-weight: 600;
  }
`
const ContentPreview = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 50px;
`
const ContentInput = styled(TextareaAutosize)`
  font-size: 18px;
  margin-top: 15px;
`
const Button = styled.button``

// const Editor = props => {
//   const [data, seData] = useState({})
//   const { title, content } = props

//   const _onInputChange = event => {
//     const { onChange } = props
//     const { target: { value, name } } = event
//     seData({
//       [name]: value
//     })
//   }

//   const _onSave = (event) => {
//     const { onSave } = props
//     const { title, content } = props
//     console.log(event)
//     // onSave(title, content)
//   }
    
//     return (
//       <>
//         <TitleContainer>
//           <TitleInput 
//             value={data.title}
//             name={'title'}
//             placeholder={'Note the title'}
//             onChange={_onInputChange}
//           />
//           <Button onClick={_onSave}>Save</Button>
//         </TitleContainer>
//         <ContentPreview>
//           <ContentInput 
//             value={data.content}
//             name={'content'}
//             placeholder={'# Whatever you write, it supports markdown preview'}
//             onChange={_onInputChange}
//           />
//           <MarkdownRenderer 
//             markdown={content}
//             className={'markdown'}
//           />
//         </ContentPreview>
//       </>
//     )

// }
// export default Editor


export default class Editor extends React.Component {
  constructor(props) {
    console.log('Editor props: ', props)
    super(props)
    this.state = {
      title: props.title || '',
      content: props.content || ''
    }
  }

  _onInputChange = event => {
    const { target: { value, name } } = event
    this.setState({
      [name]: value
    })
  }
  
  render() {
    // const { title, content } = this.state
    // this.state = {
    //   title: this.props.title || '',
    //   content: this.props.content || ''
    // }
    return (  
      <>
        <TitleContainer>
          <TitleInput 
            value={this.state.title}
            name={'title'}
            placeholder={'Note the title'}
            onChange={this._onInputChange}
          />
          <Button onClick={this._onSave}>Save</Button>
        </TitleContainer>
        <ContentPreview>
          <ContentInput 
            value={this.state.content}
            name={'content'}
            placeholder={'# Whatever you write, it supports markdown preview'}
            onChange={this._onInputChange}
          />
          <MarkdownRenderer 
            markdown={this.state.content}
            className={'markdown'}
          />
        </ContentPreview>
      </>
    )
  }
  

  _onSave = () => {
    const { onSave } = this.props
    const { title, content } = this.state
    onSave(title, content)
  }
}