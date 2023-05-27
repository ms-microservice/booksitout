import ReactDOM from 'react-dom/client'
import App from './App'

import { Provider } from 'react-redux'
import store from './redux/store'

import './resources/css/index.scss'
import './resources/css/customBootstrap.scss'
import './resources/css/core.scss'

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
