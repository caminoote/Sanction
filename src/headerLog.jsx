import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as ReactDOMClient from 'react-dom/client';
import companyIcon from './image/paper_icon.svg';
import registerIcon from './image/register_login_signup_icon.svg';
import { useNavigate, NavLink } from "react-router-dom"

const HeaderLog = () => {
    return (
        <div className="px-3 py-2 bg-warning text-black">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <a href="/" className="nav-link d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
                        <img className="bi me-2" src={companyIcon} alt="Bootstrap" width="50" height="50" />
                        <span className="fs-4 text-black">Справочник санкций</span>
                    </a>
                    <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
                        <li>
                            <NavLink to={'/register'} className="nav-link text-black">
                                <img className="bi d-block mx-auto mb-1" src={registerIcon} alt="" width="24" height="24" />
                                Регистрация
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>);
}

export default HeaderLog