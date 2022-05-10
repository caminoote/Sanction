/* JSX - файл для отображения компаний и санкций для пользователя */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import { Row, Col,} from 'antd';
import {Card } from 'antd';
import { Button } from 'antd';
import { Empty } from 'antd';


const uriCompany = "http://localhost:32143/api/Company/"; //ссылка на api компании
const uriSanction = "http://localhost:32143/api/Sanction/"; //ссылка на api санкций

const CompanyCardUser = () => {
    const [company, setCompany] = useState([]);
    const [sanction, setSanction] = useState([]);

    useEffect(() => {
        axios({
            "method": "GET",
            "url": uriCompany,
            "headers": {
                "content-type": "application/json",
            }
        })
            .then((response) => {
                setCompany(response.data);
                
            })
            .catch((error) => {
                console.log(error);
                
            });
    }, [setCompany]);

    useEffect(() => {
        axios({
            "method": "GET",
            "url": uriSanction,
            "headers": {
                "content-type": "application/json",
            }
        })
            .then((response) => {
                setSanction(response.data);

            })
            .catch((error) => {
                console.log(error);

            });
    }, [setSanction]);
    //Список компаний
    return (
        <React.Fragment>
            <br />
            <h2 align="center">Список санкций компаний</h2>
            <br />
            {company.map(({ idCompany, nameCompany, photo, businessArea, idSanctionNavigation}) => (
                <div className="Company" key={idCompany} id={idCompany} >
                    <Card hoverable style={{ width: 1290 }} >
                        <Row>
                            <Col span={5}>
                                <img alt=" " height="380" width="250" src={`data:image/image/png;base64,${photo}`} />
                                <p>&nbsp;</p>
                            </Col>
                            <p>&nbsp;&nbsp;&nbsp;</p>
                            <Col span={18}>
                                <Row>
                                    <h6><strong> {nameCompany} </strong> </h6>
                                </Row>
                                <Row>
                                    <h6><strong>Тип санкции:</strong></h6>
                                    {sanction.map(({ idIndustry, idIndustryNavigation }) => (
                                        <h6 key={idIndustry}>{idIndustryNavigation.type}</h6>
                                    ))}
                                </Row>
                                <Row>
                                    <h6><strong>Описание:  </strong></h6>
                                    <h6> {idSanctionNavigation.sanctionText}</h6>
                                </Row>
                                <Row>
                                    <h6><strong>Отрасль:  </strong></h6>
                                    <h6>{businessArea}</h6>
                                </Row>
                                <Row>
                                    <h6><strong>Дата:  </strong></h6>
                                    <h6> {idSanctionNavigation.dateSanction}</h6>
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                       
                </div>
            ))}
        </React.Fragment>
    );
};

export default CompanyCardUser;