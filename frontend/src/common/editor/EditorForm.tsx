import React from 'react'
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js'
import EditorButton from './EditorButton'
import customStyleMap from './customStyleMap'
import draftToHtml from 'draftjs-to-html';
import 'draft-js/dist/Draft.css'
import './editor.scss'
import keyBindingFn from './keyBindingFn';
import styled from 'styled-components';
import EditorFormButton from './EditorFormButton';

const EditorForm = ({ placeholder, setContent, height = 300, autoFocus = true, id = 'input' }) => {
	const editor = React.useRef<Editor>(null)
	const [editorState, setEditorState] = React.useState(EditorState.createEmpty())
	const [showPlaceholder, setShowPlaceholder] = React.useState<boolean>(true)

	React.useEffect(() => {
		if (editor.current && autoFocus) {
			editor.current.focus()
		}
	}, [autoFocus])

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

		// if (currentBlock.getText().trim() === '') {
			// const newContentState = RichUtils.tryToRemoveBlockStyle(editorState, selectionState)
			// const newEditorState = EditorState.push(editorState, newContentState, 'change-block-type')
			// setEditorState(newEditorState)
			// return 'handled'
		// }

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

	const [labelLanguage, setLabelLanguage] = React.useState<'english' | 'korean'>('korean')

	const label = {
		korean: {
			quote: '인용',
			list: '리스트',
			bold: '굵게',
			italic: '기울게',
			underline: '밑줄',
			highlight: '강조',
		},
		english: {
			quote: 'Quote',
			list: 'List',
			bold: 'B',
			italic: 'I',
			underline: 'U',
			highlight: 'H',
		},
	}

	const focusEditor = () => {
		if (editor && editor.current) {
			editor.current.focus()
		}
	}

	return (
		<EditorFormContainer height={height} onClick={focusEditor} className="border rounded p-2">
			<EditorFormButton labelLanguage={labelLanguage} setLabelLanguage={setLabelLanguage} />

			<BlockButtonContainer>
				<EditorButton
					label={labelLanguage === 'english' ? label.english.quote : label.korean.quote}
					style="blockquote"
					active={active.quote()}
					onToggleStyle={toggleBlockStyle}
				/>
				<EditorButton
					label={labelLanguage === 'english' ? label.english.list : label.korean.list}
					style="unordered-list-item"
					active={active.list()}
					onToggleStyle={toggleBlockStyle}
				/>
			</BlockButtonContainer>

			<div className="mb-2" />

			<TextButtonContainer>
				<EditorButton
					label={labelLanguage === 'english' ? label.english.bold : label.korean.bold}
					style="BOLD"
					active={active.bold()}
					onToggleStyle={toggleTextStyle}
				/>
				<EditorButton
					label={labelLanguage === 'english' ? label.english.italic : label.korean.italic}
					style="ITALIC"
					active={active.italic()}
					onToggleStyle={toggleTextStyle}
				/>
				<EditorButton
					label={labelLanguage === 'english' ? label.english.underline : label.korean.underline}
					style="UNDERLINE"
					active={active.underline()}
					onToggleStyle={toggleTextStyle}
				/>
				<EditorButton
					label={labelLanguage === 'english' ? label.english.highlight : label.korean.highlight}
					style="highlight"
					active={active.highlight()}
					onToggleStyle={toggleTextStyle}
				/>
			</TextButtonContainer>

			<hr className="m-3" />

			<EditorContainer height={height}>
				<Editor
					ref={editor}
					editorState={editorState}
					onChange={setEditorState}
					placeholder={showPlaceholder && placeholder}
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
	overflow: scroll;
	height: ${props => props.height}px;
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