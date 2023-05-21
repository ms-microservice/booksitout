import axios from "axios";
import urls from "../settings/urls";
import utils from "./utils";

export const booksitoutServer = axios.create({
	baseURL: urls.api.base,
	headers: { Authorization: utils.getToken() },
})