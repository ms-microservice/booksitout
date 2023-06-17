import React from 'react'
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js'
import EditorButton from './EditorButton'
import customStyleMap from './customStyleMap'
import draftToHtml from 'draftjs-to-html';
import 'draft-js/dist/Draft.css'
import './editor.scss'
import keyBindingFn from './keyBindingFn';
import styled from 'styled-components';

const EditorForm = ({ placeholder, setContent, height = 300, autoFocus = true, id = 'input' }) => {
	const editor = React.useRef<Editor>(null)
	const [editorState, setEditorState] = React.useState(EditorState.createEmpty())
	const [showPlaceholder, setShowPlaceholder] = React.useState<boolean>(true)

	React.useEffect(() => {
		setShowPlaceholder(
			editorState.getCurrentContent().getBlockForKey(editorState.getSelection().getStartKey()).getType() !== 'unordered-list-item'
		)

		const textInHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()))
		setContent(textInHtml)
	}, [editorState, setContent])

	const toggleTextStyle = (style) => {
		setEditorState(RichUtils.toggleInlineStyle(editorState, style))
	}

	const toggleBlockStyle = (blockType) => {
		setEditorState(RichUtils.toggleBlockType(editorState, blockType))
	}

	const handleReturn = (event, editorState) => {
		const contentState = editorState.getCurrentContent()
		const selectionState = editorState.getSelection()
		const currentBlock = contentState.getBlockForKey(selectionState.getStartKey())

		if (currentBlock.getText().trim() === '') {
			const newContentState = RichUtils.tryToRemoveBlockStyle(editorState, selectionState)
			const newEditorState = EditorState.push(editorState, newContentState, 'change-block-type')
			setEditorState(newEditorState)
			return 'handled'
		}

		return 'not-handled'
	}

	const handleShortcut = (command, editorState) => {
		if (command === 'highlight') {
			toggleTextStyle(command)
			return 'handled'
		}

		const newState = RichUtils.handleKeyCommand(editorState, command)
		if (newState) {
			setEditorState(newState)
			return 'handled'
		}

		return 'not-handled'
	}

	const active = {
		quote: () => editorState.getCurrentContent().getBlockForKey(editorState.getSelection().getStartKey()).getType() === 'blockquote',
		list: () => editorState.getCurrentContent().getBlockForKey(editorState.getSelection().getStartKey()).getType() === 'unordered-list-item',
		bold: () => editorState.getCurrentInlineStyle().has('BOLD'),
		underline: () => editorState.getCurrentInlineStyle().has('UNDERLINE'),
		italic: () => editorState.getCurrentInlineStyle().has('ITALIC'),
		highlight: () => editorState.getCurrentInlineStyle().has('highlight'),
	}

	const focusEditor = () => {
		if (editor && editor.current) {
			editor.current.focus()
		}
	}

	return (
		<EditorFormContainer height={height} onClick={focusEditor} className='border rounded p-2'>
			<BlockButtonContainer>
				<EditorButton label='인용' style='blockquote' active={active.quote()} onToggleStyle={toggleBlockStyle} />
				<EditorButton label='리스트' style='unordered-list-item' active={active.list()} onToggleStyle={toggleBlockStyle} />
			</BlockButtonContainer>

			<div className='mb-2' />

			<TextButtonContainer>
				<EditorButton label='굵게' style='BOLD' active={active.bold()} onToggleStyle={toggleTextStyle} />
				<EditorButton label='기울게' style='ITALIC' active={active.italic()} onToggleStyle={toggleTextStyle} />
				<EditorButton label='밑줄' style='UNDERLINE' active={active.underline()} onToggleStyle={toggleTextStyle} />
				<EditorButton label='강조' style='highlight' active={active.highlight()} onToggleStyle={toggleTextStyle} />
			</TextButtonContainer>

			<hr className='m-3' />

			<EditorContainer>
				<Editor
					ref={editor}
					editorState={editorState}
					onChange={setEditorState}
					placeholder={showPlaceholder && placeholder}
					style={{ minHeight: height }}
					handleReturn={handleReturn}
					handleKeyCommand={handleShortcut}
					customStyleMap={customStyleMap}
					keyBindingFn={keyBindingFn}
				/>
			</EditorContainer>
		</EditorFormContainer>
	)
}

const EditorContainer = styled.div`
	padding-left: 20px;
	padding-right: 20px;
`

const EditorFormContainer = styled.div`
	min-height: ${props => props.height}px;
	background-color: white;
	overflow-y: scroll;
`;

const TextButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	height: 100%;
`

const BlockButtonContainer = styled.div`
	display: flex;
	justify-content: center;
`

export default EditorForm