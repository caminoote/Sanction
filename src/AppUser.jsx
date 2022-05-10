import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import ReactDOM from 'react-dom';
import HeaderUser from './headerUser' //header для пользователя
import { Route, Routes } from "react-router-dom"
import { InitializeCompanyUser } from './companyUser.jsx'; //страница компаний для пользователя

const AppUser = () => {
    return (<React.Fragment>
        < HeaderUser />
        <Routes>
            <Route path="/companyUser" element={<InitializeCompanyUser />} />
            <Route path='/*' element={<InitializeCompanyUser />} />
        </Routes>
    </React.Fragment>);
}

export default AppUser;