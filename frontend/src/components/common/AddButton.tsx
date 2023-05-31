import { AiFillPlusCircle as AddIcon } from 'react-icons/ai'
import '../../resources/css/button.css'

const AddButton = ({ size, color = 'book', onClick = () => {}, right = '2.5%', top = '20px' }) => {
	const addButtonStyle = {
		right: right,
		width: `${size}px`,
		height: `${size}px`,
		borderRadius: '50px',
		top: top,
		zIndex: '4'
	}

	return <AddIcon id='addButton' className={`text-${color} p-0 clickable position-absolute`} style={addButtonStyle} onClick={() => onClick()} />
}

export default AddButton
