import { createSlice } from '@reduxjs/toolkit'
import { LibraryBook } from '../types/BookType'

interface ModalInitialState {
	searchLibraryDetailOpen: boolean
	searchLibraryDetailSelected: LibraryBook | null
}

const initalState: ModalInitialState = {
	searchLibraryDetailOpen: false,
	searchLibraryDetailSelected: null,
}

export const modalSlice = createSlice({
	name: 'modal',
	initialState: initalState,
	reducers: {
		openSearchLibraryDetail: (state) => {
			state.searchLibraryDetailOpen = true
		},
		closeSearchLibraryDetail: (state) => {
			state.searchLibraryDetailOpen = false
		},
		setSearchLibraryDetailSelected: (state, action) => {
			state.searchLibraryDetailSelected = action.payload
		},
	},
})

export const { openSearchLibraryDetail, closeSearchLibraryDetail, setSearchLibraryDetailSelected } = modalSlice.actions
export default modalSlice.reducer
