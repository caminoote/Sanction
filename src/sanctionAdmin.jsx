import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import SanctionTableAdmin from './sanctionTableAdmin'
import 'antd/dist/antd.css';
import AddIndustry from './createIndustry'
import DelIndustry from './deleteIndustry'
import { Row, Space, } from 'antd';
import AddSanction from './createSanction'
import { useNavigate, NavLink } from 'react-router-dom';


const uri = "http://localhost:32143/api/Sanction/";

export function InitializeSanction() { return Sanction(); }

const Sanction = () => {

    let navigate = useNavigate();

    const [sanction, setSanction] = useState([]);
    const [industry, setIndustry] = useState([]);

    axios.post('http://localhost:32143/api/Account/' + 'checkRole', {}, { withCredentials: true })
        .then((response) => {
            if (response.status == 200) {
                if (response.data.role !== "admin") {
                    navigate("../../login", { replace: true });
                }
            }
        })
        .catch(console.error);

    return (
        <div className="container">
            
            <Row>
                <Space>
                    <DelIndustry
                        industry={industry}
                        setIndustry={setIndustry}
                    />
                    <AddIndustry
                        industry={industry}
                        setIndustry={setIndustry}
                    />
                    <AddSanction
                        sanction={sanction}
                        setSanction={setSanction}
                        industry={industry}
                        setIndustry={setIndustry}
                    />
                </Space>
                </Row>
           
            <SanctionTableAdmin
                sanction={sanction}
                setSanction={setSanction}
                
            />
            
        </div>
    );
}


