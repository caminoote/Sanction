/* JSX - файл для отображения компаний (доступно только админу) */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import { Row, Col,} from 'antd';
import {Card } from 'antd';
import { Button } from 'antd';


const uri = "http://localhost:32143/api/Company/"; //ссылка на api компаний
const uriSanction = "http://localhost:32143/api/Sanction/"; //ссылка на api санкций
const uriIndustry = "http://localhost:32143/api/Industry/"; //ссылка на api санкций

const CompanyCardAdmin = () => {
    const [company, setCompany] = useState([]);
    const [sanction, setSanction] = useState([]);
    const [industry, setIndustry] = useState([]);
    const removeCompany = (removeId) => setCompany(company.filter(({ idCompany }) => idCompany !== removeId));  //удаление компании


    useEffect(() => {
        axios({
            "method": "GET",
            "url": uri,
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

    useEffect(() => {
        axios({
            "method": "GET",
            "url": uriIndustry,
            "headers": {
                "content-type": "application/json",
            }
        })
            .then((response) => {
                setIndustry(response.data);

            })
            .catch((error) => {
                console.log(error);

            });
    }, [setIndustry]);

    const deleteCompany = ({ idCompany }) => { // отправка delete запроса, получает id элемента для удаления
        axios.delete(uri + idCompany)
            .then((response) => {
                response.status = 204 ? removeCompany(idCompany) : null;
            })
            .catch(console.error);
    };


    return (
        <React.Fragment>
            <br />
            <h2 align="center">Список санкций компаний</h2>
            <br />
            {company.map(({ idCompany, nameCompany, photo, businessArea, idSanctionNavigation, idIndustryNavigation}) => (
                <div className="Company" key={idCompany} id={idCompany} >
                    <Card hoverable style={{ width: 1290 }} >
                        <Row>
                            <Col span={5}>
                                <img alt="NO DATA" height="380" width="250" src={`data:image/image/png;base64,${photo}`} />
                                <p>&nbsp;</p>
                                <Row>
                                    <Button shape="round" danger onClick={(e) => deleteCompany({ idCompany })}> Удалить </Button>
                                </Row>
                            </Col>
                            <p>&nbsp;&nbsp;&nbsp;</p>
                            <Col span={18}>
                                <Row>
                                    <h6><strong> {nameCompany} </strong> </h6>
                                </Row>
                                <Row>
                                    <h6><strong>Тип санкции:</strong></h6>
                                    {industry.map(({ idIndustry, type }) => (
                                        <div className="san" key={idIndustry} id={idIndustry} >
                                            <h6>{type}</h6>
                                        </div>
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
                    <br/>
                </div>
            ))}
        </React.Fragment>
    );
};

export default CompanyCardAdmin;