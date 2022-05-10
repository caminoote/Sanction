import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import CompanyCardUser from './companyCardUser'
import 'antd/dist/antd.css';
import { useNavigate, NavLink } from 'react-router-dom';


const uri = "http://localhost:32143/api/Company/";

export function InitializeCompanyUser() { return Company(); }

const Company = () => {

    let navigate = useNavigate();
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:32143/api/Account/' + 'checkRole')
        .then((response) => {
            if (response.status == 200) {
                console.log(response.data);
                if (response.data.role === "admin") {
                    navigate("../admin", { replace: true });
                }
                if (response.data.role === "user") {
                    navigate("../user", { replace: true });
                }
            }
        })
        .catch(console.error);


    const [company, setCompany ] = useState([]);
    const [sanction, setSanction] = useState([]);
    

    return (
        <div className="container" >
            
            <CompanyCardUser
                company={company}
                setCompany={setCompany}
                sanction={sanction}
                setSanction={setSanction}
            />
            
        </div>
    );
}


