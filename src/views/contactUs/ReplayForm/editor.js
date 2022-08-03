import React, { Component } from 'react';
import {EditorState, ContentState, convertFromHTML, convertToRaw,convertFromRaw} from 'draft-js';
import { Editor  } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import {stateFromHTML} from 'draft-js-import-html';
class ControlledEditor extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     editorState: EditorState.createEmpty(),
  //   };
  //   console.log(props)
  // }
  constructor(props) {
    super(props);
    // var contentState = stateFromHTML(props.privacyPolicy);
    // var editorStat = EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(props.privacyPolicy)));

    // const html = props.privacyPolicy;
    // const contentBlock = htmlToDraft(html);


    //  const editorStateInitial =
    //   EditorState.createWithContent(
    //     ContentState.createFromBlockArray(contentBlock.htmlToDraft(props.privacyPolicy)));

    // var editorStat = EditorState.createWithContent(contentState);
    this.state = {editorState:   EditorState.createWithContent(
      ContentState.createFromBlockArray(htmlToDraft(props.dataText)))};
}
  onEditorStateChange=(editorState) => {
    this.setState({
      editorState,
    });

    this.props.setDataText(draftToHtml(convertToRaw(editorState.getCurrentContent())))
  };

  render() {
    const { editorState } = this.state;

    return (
      <Editor
        editorState={editorState}
        wrapperClassName="demo-wrapper "
        editorClassName="demo-editor"
        onEditorStateChange={this.onEditorStateChange}
      />
    )
  }
}
export default ControlledEditor
