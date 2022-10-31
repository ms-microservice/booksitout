import { Routes, Route } from 'react-router-dom';
import Topnav from './common/Topnav';
import Main from './routes/Main';

function App() {
    return (
        <div className='App'>
            <Topnav />

            <div
                className='div'
                style={{
                    marginBottom: '75px',
                }}
            ></div>

            <Routes>
                <Route path='/' element={<Main />} />
                <Route path='/introduction' element={<></>} />

                <Route path='/login' element={<></>} />
                <Route path='/join' element={<></>} />
                <Route path='/settings' element={<></>} />

                <Route path='/book/reading' element={<></>} />
                <Route path='/book/toread' element={<></>} />

                <Route path='/search/:key' element={<></>} />

                <Route path='/book/add' element={<></>} />
            </Routes>
        </div>
    );
}

export default App;
