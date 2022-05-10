import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import CompanyCardAdmin from './companyCardAdmin'
import AddCompany from './createCompany'
import 'antd/dist/antd.css';
import { useNavigate, NavLink } from 'react-router-dom';


const uri = "http://localhost:32143/api/Company/";

export function InitializeCompanyAdmin() { return Company(); }

const Company = () => {

    let navigate = useNavigate();
    axios.post('http://localhost:32143/api/Account/' + 'checkRole', {}, { withCredentials: true })
        .then((response) => {
            if (response.status == 200) {
                if (response.data.role !== "admin") {
                    navigate("../../login", { replace: true });
                }
            }
        })
        .catch(console.error);


    const [company, setCompany ] = useState([]);
    const [sanction, setSanction] = useState([]);


    

    return (
        <div className="container" >
            <AddCompany
                company={company}
                setCompany={setCompany}
                sanction={sanction}
                setSanction={setSanction}
            />
            <CompanyCardAdmin
                company={company}
                setCompany={setCompany}
                
            />
            
        </div>
    );
}


