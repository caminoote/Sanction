import React, { Component } from 'react';
import companyIcon from './image/paper_icon.svg';
import sanctionIcon from './image/list.svg';
import logOutIcon from './image/exit.svg';
import siteIcon from './image/site.svg';
import { useNavigate, NavLink } from "react-router-dom"
import axios from 'axios';

const Initialize = () =>
{
    let navigate = useNavigate();

    const Exit = () => {
        axios.post('http://localhost:32143/api/Account/' + 'LogOff', {}, { withCredentials: true })
            .then((response) => {
                if (response.status == 200) {
                    navigate("../login", { replace: true });
                }
            })
            .catch(console.error);
    }

    return (
        <div className="px-3 py-2 bg-info text-black">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <a href="/" className="nav-link d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
                        <img className="bi me-2" src={companyIcon} alt="Bootstrap" width="50" height="50" />
                        <span className="fs-4 text-black">Приложение управления</span>
                    </a>
                    <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
                        <li>
                            <NavLink to={'/admin'} className="nav-link text-black">
                                <img className="bi d-block mx-auto mb-1" src={siteIcon} alt="" width="24" height="24" />
                                Список компаний
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/admin/sanction'} className="nav-link text-black">
                                <img className="bi d-block mx-auto mb-1" src={sanctionIcon} alt="" width="24" height="24" />
                                Санкции
                            </NavLink>
                        </li>
                        <li>
                            <a className="nav-link text-black">
                                <img className="bi d-block mx-auto mb-1" src={logOutIcon} alt="" width="24" height="24" onClick={Exit} />
                                Выход
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>);
}

function Footer() {
    return (<div className="container">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
            <div className="col-md-4 d-flex align-items-center">
                <span className="text-muted">©Onime 2022 Мельников Иван 3-42В</span>
            </div>
        </footer>
    </div>);
}

    
    



export function InitializeAdminTheme() { return Initialize(); }
export function InitializeFooter() { return Footer(); }
