import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import ReactDOM from 'react-dom';
import AppAdmin from './AppAdmin.jsx'; //app для админа
import AppUser from './AppUser.jsx'; //app для пользователя
import { Route, Routes } from "react-router-dom"
import HeaderLog from "./headerLog" //header для страницы логина
import HeaderReg from "./headerReg" //header для страницы регистрации
import Login from "./login" //страница логина
import Register from "./registration" //страница регистрации

// Создаём всевозможные пути
// admin - рабочая панель админа, через которую он может работать с БД (доступен так же функционал пользователя)
// user - эта страница, которая позволяет пользователю увидеть книги в библиотеке
// register - это путь для регистрации нового пользователя (user)
// login - эта функция позволяет нам войти в систему. Является так же начальным окном приложения

const App = () => {
    return (<React.Fragment>
        <Routes>
           <Route path="/admin/*" element={<AppAdmin />} />
            <Route path='/user/*' element={<AppUser />} />
            <Route path='/register' element={<div> <HeaderReg /> <Register /> </div>} />
            <Route path='/login' element={<div> <HeaderLog /> <Login /> </div>} />
            <Route path='/*' element={<div> <HeaderLog /> <Login /> </div>} />
        </Routes>
    </React.Fragment>);
}

export default App;