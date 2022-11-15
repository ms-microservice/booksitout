import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Topnav from './common/Topnav';
import Summary from './summary/Summary';
import Introduction from './introduction/Introduction';
import Login from './user/Login';
import Join from './user/Join';

function App() {
    const [token, setToken] = useState(localStorage.getItem('login-token'));

    return (
        <div className='App'>
            <Topnav token={token} />

            <div
                className='div'
                style={{
                    marginBottom: '75px',
                }}
            ></div>

            <Routes>
                <Route path='/' element={<Summary />} />
                <Route path='/introduction' element={<Introduction />} />

                <Route path='/login' element={<Login setToken={setToken} />} />
                <Route path='/join' element={<Join />} />
                <Route path='/settings' element={<></>} />

                <Route path='/book/:range' element={<></>} />
                <Route path='/book/detail/:id' element={<></>} />
                <Route path='/review' element={<></>} />
                <Route path='/statistics' element={<></>} />
                <Route path='/reading' element={<></>} />

                <Route path='/search/:key' element={<></>} />
            </Routes>
        </div>
    );
}

export default App;
