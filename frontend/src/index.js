import ReactDOM from 'react-dom/client'
import App from './App'

import { Provider } from 'react-redux'
import store from './redux/store'

import 'bootstrap/dist/css/bootstrap.min.css'
import './resources/css/index.css'
import './resources/css/customBootstrap.css'
import './resources/css/core.css'

if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker
			.register('/service-worker.js')
			.then((registration) => {
				console.log('Service worker registered:', registration)
			})
			.catch((error) => {
				console.log('Service worker registration failed:', error)
			})
	})
}  

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<Provider store={store}>
		<App />
	</Provider>
)
