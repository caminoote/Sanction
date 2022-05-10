/* JSX - файл для создания типов (доступно только админу) */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './companyAdmin'
import { Button } from 'antd';
import 'antd/dist/antd.css';
import { Modal, Form, Input, Select } from 'antd';

const uri = "http://localhost:32143/api/Industry/"; //ссылка на api тип

const AddIndustry = ({ industry, setIndustry }) => { // передается список
    const [isModalVisible, setIsModalVisible] = useState(false); //видимость всплывающего окна

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

    const addIndustry = (industries) => setIndustry([...industry, industries]); //добавление созданного типа

    const handleSubmit = (e) => { //отправка нового типа на сервер и закрытие окна
        const Type = e.Type;
        handleOk();
        axios.post(uri, {
            Type: Type
        })
            .then((response) => {
                response.status = 201 ? addIndustry(response.data) : null;
            })
            .catch(console.error);
    };

    return (
        <React.Fragment>
            <div align="right">
                <br />
                <Button shape="round" type="primary" size="large" onClick={showModal}>Добавить тип санкций</Button>

                <Modal title="Добавить тип санкций" visible={isModalVisible} onOk={form.submit} onCancel={handleCancel}>
                    <Form form={form} onFinish={handleSubmit}>
                        <Form.Item
                            label="Тип"
                            name="Type"
                            rules={[
                                {
                                    required: true,
                                    message: 'Введите Тип!',
                                },
                            ]}>
                            <Input />
                        </Form.Item>
                      
                    </Form>
                </Modal>
            </div>


        </React.Fragment>
    );
};

export default AddIndustry;