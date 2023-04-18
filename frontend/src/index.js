import ReactDOM from 'react-dom/client'
import App from './App'
import {BrowserRouter as Router} from 'react-router-dom'

import {Provider} from 'react-redux'
import store from './redux/store'

import './resources/css/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './resources/css/customBootstrap.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
        <Router basename={process.env.PUBLIC_URL} refresh>
            <App/>
        </Router>
    </Provider>
)
