/* JSX - файл для создания(доступно только админу) */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './companyAdmin'
import { Button } from 'antd';
import 'antd/dist/antd.css';
import {PlusOutlined } from '@ant-design/icons';
import { Modal, Form, Input, Select } from 'antd';

const uri = "http://localhost:32143/api/Company/"; //ссылка на api 

const AddCompany = ({ company, setCompany }) => { // передается список
    const [isModalVisible, setIsModalVisible] = useState(false); //видимость всплывающего окна
    const [sanction, setSanction] = useState([]);

    useEffect(() => {
        axios({
            "method": "GET",
            "url": "http://localhost:32143/api/Sanction/",
            "mode": 'no-cors',
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
    }, [sanction]);

    const [form] = Form.useForm();

    const showModal = () => { //показать всплывающее окно
        setIsModalVisible(true);
    };

    const handleOk = () => { //кнопка подтверждения всплывабщего окна
        setIsModalVisible(false);
    };

    const handleCancel = () => { //кнопка выхода всплыющего окна
        setIsModalVisible(false);
    };

    const addCompany = (companies) => setCompany([...company, companies]); //добавление созданной компании

    const handleSubmit = (e) => { //отправка новой компании на сервер и закрытие окна
        const nameCompany = e.nameCompany;
        const businessArea = e.businessArea;
        const photo = e.photo;
        const idSanction = e.idSanction;
        handleOk();
        axios.post(uri, {
            nameCompany: nameCompany, businessArea: businessArea, photo: photo,
            idSanction: idSanction
        })
            .then((response) => {
                response.status = 201 ? addCompany(response.data) : null;
            })
            .catch(console.error);
    };

    return (
        <React.Fragment>
            <div align="right">
                <br />
                <Button shape="circle" type="primary" size="large" icon={<PlusOutlined />} onClick={showModal}></Button>

                <Modal title="Добавить санкцию компании" visible={isModalVisible} onOk={form.submit} onCancel={handleCancel}>
                    <Form form={form} onFinish={handleSubmit}>
                        <Form.Item
                            label="Название компании"
                            name="nameCompany"
                            rules={[
                                {
                                    required: true,
                                    message: 'Введите название!',
                                },
                            ]}>
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            name="businessArea"
                            label="Бизнес сфера"
                            rules={[
                                {
                                    required: true,
                                    message: 'Введите описание!',
                                },
                            ]}>
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Фото"
                            name="photo"
                            rules={[
                                {
                                    required: false,
                                },
                            ]}>
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Санкция"
                            name="idSanction"
                            rules={[
                                {
                                    required: false,  
                                },
                            ]}>
                            <Select>
                                {sanction.map(({ idSanction, sanctionText }) => (
                                    <Option value={idSanction}>{sanctionText}</Option>
                                ))}
                            </Select>
                        </Form.Item>

                    </Form>
                </Modal>
            </div>


        </React.Fragment>
        
    );
};

export default AddCompany;