import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import { Row, Col,} from 'antd';
import { Table, Card } from 'antd';
import { Button, Space } from 'antd';

const uri = "http://localhost:32143/api/Sanction/";

const SanctionTableAdmin = () => {
    const [sanction, setSanction] = useState([]);
    const [industry, setIndustry] = useState([]);

    const removeSanction = (removeId) => setSanction(sanction.filter(item => item.idSanction !== removeId));  //удаление санкции

    useEffect(() => {
        axios({
            "method": "GET",
            "url": uri,
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
            "url": "http://localhost:32143/api/Industry/",
            "mode": 'no-cors',
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
    }, [industry]);

    const deleteSanction = (idSanction) => { // отправка delete запроса, получает id элемента для удаления
        axios.delete(uri + idSanction)
            .then((response) => {
                response.status = 204 ? removeSanction(idSanction) : null;
            })
    };


    const columns = [
        
        {
            title: 'Описание санкции',
            dataIndex: 'sanctionText',
            key: 'sanctionText',
            render: (sanctionText, record) =>
                <form id={record.id} onSubmit={handleSubmit}>
                    <input size="35" name="sanctionText" form={record.id} defaultValue={sanctionText} width="500"/>
                </form>
            
        },
        {
            title: 'Дата введения санкции',
            dataIndex: 'dateSanction',
            key: 'dateSanction',
            render: (dateSanction, record) =>
                <form id={record.id}>
                    <input size="35" name="dateSanction" form={record.id} defaultValue={dateSanction} width="100"/>
                </form>
        },
        {
            title: 'Удаление',
            key: 'action',
            render: (text, record) => (
                    <Button shape="round" danger onClick={(e) => deleteSanction(record.idSanction)}> Удалить </Button>
            ),
        },

    ];

    1

    const updateSanction = (sanctions) => {
        let bufSanction = Object.assign([], sanction);
        bufSanction.filter(item => item.idSanction === sanction.idSanction)[0].sanctionText = sanction.sanctionText;
        setSanction(bufSanction);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const sanctionText = e.target.elements.sanctionText.value;
        const idSanction = e.target.idSanction;
        const sanctions = { idSanction: Number(idSanction), sanctionText: sanctionText };
        axios.put(uri + idSanction, sanctions)
            .then((response) => {
                response.status = 201 ? updateSanction(sanctions) : null;
            })
            .catch(console.error);
    };

    return (
        <React.Fragment>
            <div>
                <br />
                <h2 align="center"></h2>
                <br />
                <Card style={{ width: 1300 }} >
                    <Row>
                        <Col span={13}>
                            <h5 align="center"><strong>Введенные компаниями санкции</strong></h5>
                            <br />
                            <Table dataSource={sanction} columns={columns}/>
                        </Col>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                        <Col span={10}>
                            <h5 align="center"><strong>Типы санкций</strong></h5>
                            <br />
                            {industry.map(({ type }) => (
                                <div>
                                    <Row>
                                        <p><strong>{type}&nbsp;</strong></p>
                                    </Row>
                                </div>
                            ))}
                        </Col>
                    </Row>
                </Card>
            </div>
        </React.Fragment>
    );
};

export default SanctionTableAdmin;