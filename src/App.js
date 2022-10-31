import { Routes, Route } from 'react-router-dom';
import Topnav from './common/Topnav';
import Main from './routes/Main';

function App() {
    return (
        <div className='App'>
            <Topnav />

            <Routes>
                <Route path='/' element={<Main />} />
            </Routes>
        </div>
    );
}

export default App;
