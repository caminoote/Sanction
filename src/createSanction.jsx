/* JSX - файл для создания санкции (доступно только админу) */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './companyAdmin'
import { Button } from 'antd';
import 'antd/dist/antd.css';
import { Modal, Form, Input, Select } from 'antd';

const uri = "http://localhost:32143/api/Sanction/"; //ссылка на api санкции

const AddSanction = ({ sanction, setSanction }) => { // передается список
    const [isModalVisible, setIsModalVisible] = useState(false); //видимость всплывающего окна
    const [industry, setIndustry] = useState([]);

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

    const [form] = Form.useForm();

    const showModal = () => { //показать всплывающее окно
        setIsModalVisible(true);
    };

    const handleOk = () => { //кнопка подтверждения всплывабщего окн
        setIsModalVisible(false);
    };

    const handleCancel = () => { //кнопка выхода всплыющего окна
        setIsModalVisible(false);
    };

    const addSanction = (sanctions) => setSanction([...sanction, sanctions]); //добавление созданной санкции

    const handleSubmit = (e) => { //отправка новой санкции на сервер и закрытие окна
        const sanctionText = e.sanctionText;
        const dateSanction = e.dateSanction;
        const idIndustry = e.idIndustry;
        handleOk();
        axios.post(uri, {
            sanctionText: sanctionText, dateSanction: dateSanction, idIndustry: idIndustry
        })
            .then((response) => {
                response.status = 201 ? addSanction(response.data) : null;
            })
            .catch(console.error);
    };

    return (
        <React.Fragment>
            <div align="right">
                <br />
                <Button shape="round" type="primary" size="large" color="red" onClick={showModal}>Добавить санкцию</Button>

                <Modal title="Добавить санкцию" visible={isModalVisible} onOk={form.submit} onCancel={handleCancel}>
                    <Form form={form} onFinish={handleSubmit}>
                        <Form.Item
                            
                            label="Описание санкции"
                            name="sanctionText"
                            rules={[
                                {
                                    required: true,
                                    message: 'Введите описание!',
                                },
                            ]}>

                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Дата принятия"
                            name="dateSanction"
                            rules={[
                                {
                                    required: true,
                                    message: 'Введите дату!',
                                },
                            ]}>
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Тип санкции"
                            name="idIndustry"
                            rules={[
                                {
                                    required: false,

                                },
                            ]}>
                            <Select>
                                {industry.map(({ idIndustry, type }) => (
                                    <Option value={idIndustry}>{type}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </React.Fragment>
    );
};

export default AddSanction;