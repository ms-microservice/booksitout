import axios from "axios";
import urls from "../settings/urls";
import store, { RootState } from "../redux/store";

export const booksitoutServer = axios.create({
	baseURL: urls.api.base,
})

booksitoutServer.interceptors.request.use(
	(config) => {
		const state = store.getState() as RootState;
		const token = state.user.token;

		if (token) {
			config.headers['Authorization'] = token;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);