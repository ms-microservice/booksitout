import { getDefaultKeyBinding, KeyBindingUtil } from 'draft-js'

const {hasCommandModifier} = KeyBindingUtil;

function keyBindingFn(e: KeyboardEvent): string {
	if (e.keyCode === 69 && hasCommandModifier(e)) {
		return 'highlight'
	}

	return getDefaultKeyBinding(e)	
}

export default keyBindingFn