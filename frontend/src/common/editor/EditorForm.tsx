import React from 'react'
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js'
import EditorButton from './EditorButton'
import customStyleMap from './customStyleMap'
import draftToHtml from 'draftjs-to-html';

import 'draft-js/dist/Draft.css'
import './editor.scss'

const EditorForm = ({ placeholder, setContent, height = 300, autoFocus = true, id = 'input' }) => {
	const editor = React.useRef(null)
	const [editorState, setEditorState] = React.useState(EditorState.createEmpty())
	const [showPlaceholder, setShowPlaceholder] = React.useState<boolean>(true)

	React.useEffect(() => {
		setShowPlaceholder(
			editorState.getCurrentContent().getBlockForKey(editorState.getSelection().getStartKey()).getType() !== 'unordered-list-item'
		)

		const textInHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()))
		setContent(textInHtml)
	}, [editorState])

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

	const active = {
		quote: () => editorState.getCurrentContent().getBlockForKey(editorState.getSelection().getStartKey()).getType() === 'blockquote',
		list: () => editorState.getCurrentContent().getBlockForKey(editorState.getSelection().getStartKey()).getType() === 'unordered-list-item',
		bold: () => editorState.getCurrentInlineStyle().has('BOLD'),
		underline: () => editorState.getCurrentInlineStyle().has('UNDERLINE'),
		italic: () => editorState.getCurrentInlineStyle().has('ITALIC'),
		highlight: () => editorState.getCurrentInlineStyle().has('highlight'),
	}

	return (
		<div style={{ minHeight: height, backgroundColor: 'white', overflowY: 'scroll' }} className='border rounded p-2'>
			<div className='d-flex justify-content-center'>
				<EditorButton label='인용' style='blockquote' active={active.quote()} onToggleStyle={toggleBlockStyle} />
				<EditorButton label='리스트' style='unordered-list-item' active={active.list()} onToggleStyle={toggleBlockStyle} />
			</div>

			<div className='mb-2' />

			<div className='d-flex justify-content-center h-100'>
				<EditorButton label='굵게' style='BOLD' active={active.bold()} onToggleStyle={toggleTextStyle} />
				<EditorButton label='기울게' style='ITALIC' active={active.italic()} onToggleStyle={toggleTextStyle} />
				<EditorButton label='밑줄' style='UNDERLINE' active={active.underline()} onToggleStyle={toggleTextStyle} />
				<EditorButton label='강조' style='highlight' active={active.highlight()} onToggleStyle={toggleTextStyle} />
			</div>

			<hr className='m-3' />

			<div className='ps-3 pe-3'>
				<Editor
					ref={editor}
					editorState={editorState}
					onChange={setEditorState}
					placeholder={showPlaceholder && placeholder}
					style={{ minHeight: height }}
					customStyleMap={customStyleMap}
					handleReturn={handleReturn}
				/>
			</div>
		</div>
	)
}

export default EditorForm