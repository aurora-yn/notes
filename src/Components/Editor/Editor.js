import React from "react";
import styled from "styled-components";
import MarkdownRenderer from "react-markdown-renderer";
import TextareaAutosize from "react-textarea-autosize";

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

export default class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: props.title || '',
      content: props.content || '',
      id: props.id || null
    }
  }

  render() {
    const { title, content } = this.state
    return (
      <>
        <TitleContainer>
          <TitleInput 
            value={title}
            name={'title'}
            placeholder={'Note the title'}
            onChange={this._onInputChange}
          />
          <Button onClick={this._onSave}>Save</Button>
        </TitleContainer>
        <ContentPreview>
          <ContentInput 
            value={content}
            name={'content'}
            placeholder={'# Whatever you write, it supports markdown preview'}
            onChange={this._onInputChange}
          />
          <MarkdownRenderer 
            markdown={content}
            className={'markdown'}
          />
        </ContentPreview>
      </>
    )
  }

  _onInputChange = event => {
    const { target: { value, name } } = event
    this.setState({
      [name]: value
    })
  }

  _onSave = () => {
    const { onSave } = this.props
    const { title, content, id } = this.state
    onSave(title, content, id)
  }
}