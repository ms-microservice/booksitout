import { Routes, Route } from 'react-router-dom';
import Topnav from './common/Topnav';
import Summary from './summary/Summary';
import Introduction from './introduction/Introduction';

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
                <Route path='/' element={<Summary />} />
                <Route path='/introduction' element={<Introduction />} />

                <Route path='/login' element={<></>} />
                <Route path='/join' element={<></>} />
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
