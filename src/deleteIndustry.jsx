/* JSX - файл для удаления типов санкций (доступно только админу) */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './sanctionAdmin'
import { Button } from 'antd';
import 'antd/dist/antd.css';
import { Modal, Table } from 'antd';

const uri = "http://localhost:32143/api/Industry/"; //ссылка на api места проведения

const DelIndustry = ({ industry, setIndustry }) => { // всплывающее окно удаления типов санкций
    const [isModalVisible, setIsModalVisible] = useState(false); //видимость всплывающего окна

    const removeIndustry = (removeId) => setIndustry(industry.filter(item => item.idIndustry !== removeId));  //удаление типов санкций

    useEffect(() => { // получение списка типов санкций
        axios({
            "method": "GET",
            "url": uri,
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
    }, [setIndustry]);

    const showModal = () => { //показать всплывающее окно
        setIsModalVisible(true);
    };

    const handleCancel = () => { //кнопка выхода всплыющего окна
        setIsModalVisible(false);
    };

    
    const deleteIndustry = (idIndustry) => { // отправка delete запроса, получает id элемента для удаления
        axios.delete(uri + idIndustry)
            .then((response) => {
                response.status = 204 ? removeIndustry(idIndustry) : null;
            })
    };


    const columns = [ //столбцы для таблицы типов санкций

        {
            title: 'Тип санкции',
            dataIndex: 'type',
            key: 'type',

        },
        {
            title: 'Удаление',
            key: 'action',
            render: (text, record) => (
                <Button shape="round" danger onClick={(e) => deleteIndustry(record.idIndustry)}> Удалить </Button>
            ),
        },



    ];


    return (
        <React.Fragment>
            <div align="right">
                <br />
                <Button shape="round" type="primary" size="large" onClick={showModal}>Удаление типов санкций</Button>

                <Modal title="Удаление типов санкций" visible={isModalVisible} onCancel={handleCancel}>
                    <br/>
                    <Table dataSource={industry} columns={columns} />
                </Modal>
            </div>


        </React.Fragment>
    );
};

export default DelIndustry;