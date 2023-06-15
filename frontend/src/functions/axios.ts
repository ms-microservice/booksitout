import axios from "axios";
import urls from "../settings/urls";

export const booksitoutServer = axios.create({
	baseURL: urls.api.base,
	headers: { Authorization: localStorage.getItem('login-token') },
})