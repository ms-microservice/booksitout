import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
// common
import Topnav from './common/Topnav'
import AddButton from './common/AddButton'
// user
import Login from './user/Login'
import Join from './user/Join'
import Settings from './user/Settings'
// book
import BookList from './book/BookList'
import BookDetail from './book/BookDetail'
import BookAddForm from './book/BookAddForm'
// others
import Summary from './summary/Summary'
import Introduction from './introduction/Introduction'

function App() {
    const [token, setToken] = useState(localStorage.getItem('login-token'))

    return (
        <div className='App'>
            <Topnav token={token} />

            <div style={{marginBottom: '80px'}}/>

            <Routes>
                <Route path='/' element={<Summary token={token} />} />
                <Route path='/introduction' element={<Introduction />} />
                <Route path='/qna' element={<></>}/>
                <Route path='/faq' element={<></>}/>

                <Route path='/login' element={<Login setToken={setToken} />} />
                <Route path='/join' element={<Join />} />
                <Route path='/settings' element={<Settings />} />

                <Route path='/book/:range' element={<BookList token={token} />}/>
                <Route path='/book/detail/:id' element={<BookDetail token={token}/>} />
                <Route path='book/add' element={<BookAddForm token={token}/>} />
                <Route path='/book/edit' element={<></>}/>
                <Route path='/statistics' element={<></>} />
                <Route path='/reading' element={<></>} />

                <Route path='/search/:key' element={<></>} />
            </Routes>

            <AddButton />
        </div>
    )
}

export default App