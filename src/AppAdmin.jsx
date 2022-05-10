import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import ReactDOM from 'react-dom';
import { InitializeAdminTheme, } from './headerAdmin.jsx'; //из header для админа испортируется header
import { InitializeCompanyAdmin } from './companyAdmin.jsx'; //страница компаний для админа
import { InitializeSanction } from './sanctionAdmin.jsx'; //страница санкций для админа
import { Route, Routes } from "react-router-dom"

const AppAdmin = () => {
    return (<React.Fragment>
        <InitializeAdminTheme />
        <Routes>
            <Route path="/company" element={<InitializeCompanyAdmin />} />
            <Route path='/sanction' element={<InitializeSanction />} />
            <Route path='/*' element={<InitializeCompanyAdmin />} />
        </Routes>
    </React.Fragment>);
}

export default AppAdmin;