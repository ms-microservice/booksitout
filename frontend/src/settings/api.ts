import { getToken } from '../functions/user'

const apiSettings = {
	headers: {
		Authorization: getToken(),
	},
}

export default apiSettings
