import utils from '../functions/utils'

const apiSettings = {
	headers: {
		Authorization: utils.getToken(),
	},
}

export default apiSettings
