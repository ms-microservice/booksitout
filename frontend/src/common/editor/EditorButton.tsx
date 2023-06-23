import React from 'react'

const EditorButton = ({ label, style, active, onToggleStyle }) => {
	const onToggle = (e) => {
		e.preventDefault()
		onToggleStyle(style)
	}

	let className = 'clickable ms-1 me-1 force-1-line p-1 style-button'
	if (active) {
		className += ' active'
	}

	return (
		<div className={className} onMouseDown={onToggle} style={{ height: '25px', fontSize: '15px' }}>
			{label}
		</div>
	)
}

export default EditorButton