import React from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  convertFromRaw,
  convertToRaw,
} from 'draft-js';
import BlockStyleControls from './BlockStyleControls';
import InlineStyleControls from './InlineStyleControls';

class ServiceEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: 
      props.editorState ? EditorState.createWithContent(convertFromRaw(props.editorState))
        : EditorState.createEmpty(),
    };

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => {
      const rawDraftContentState = convertToRaw(
        editorState.getCurrentContent()
      );
      this.props.onChange(rawDraftContentState);
      this.setState({ editorState });
    };

    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    this.onTab = (e) => this._onTab(e);
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
  }

  _handleKeyCommand(command) {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _onTab(e) {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }

  _toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  }

  render() {
    const { editorState } = this.state;

    const rawDraftContentState = convertToRaw(editorState.getCurrentContent());
    const contentState = convertFromRaw(rawDraftContentState);
    // const contentState = convertFromRaw(rawDraftContentState);
    // console.log(rawDraftContentState);
    let className = 'RichEditor-editor';
    // var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    

    return (
      <div>
        {this.props.readOnly?
        <Editor 
         editorState={editorState}
         readOnly={true} />
         :
        <div className='RichEditor-root'>
          <BlockStyleControls
          editorState={editorState}
          onToggle={this.toggleBlockType}
          />
          <InlineStyleControls
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
          />
          <div className={className} onClick={this.focus}>
            <Editor
              blockStyleFn={getBlockStyle}
              customStyleMap={styleMap}
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              onChange={this.onChange}
              onTab={this.onTab}
              placeholder='Write your activity description here'
              ref='editor'
              spellCheck={true}
              readOnly={this.props.readOnly}
            />
          </div>
         </div>
  }
      </div>
    );
  }
}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote':
      return 'RichEditor-blockquote';
    default:
      return null;
  }
}

export default ServiceEditor;
