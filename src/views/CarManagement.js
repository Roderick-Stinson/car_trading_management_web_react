import {Button, Col, Popconfirm, Space, message, Table} from "antd";
import Layout, {Content, Header} from "antd/es/layout/layout";
import Search from "antd/es/input/Search";


import {CarInfo} from "../components/Info";
import {useEffect, useState} from "react";
import axios from "axios";
import {SearchBar} from "../components/SearchBar";
import {AddCar} from "../components/AddInfo";

const CarManagement = () => {

    //列表删除按钮的确认和取消函数
    function confirm(e) {
        console.log(e);
        message.error('删除成功！');
    }

    function cancel(e) {

    }

    //查看详情对应的弹窗显示关闭
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        setIsModalVisible(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    //添加车辆的弹窗显示关闭
    const [isModalVisibleAdd, setIsModalVisibleAdd] = useState(false);
    const showModalAdd = () => {
        setIsModalVisibleAdd(true);
    };
    const handleOkAdd = () => {
        setIsModalVisibleAdd(false);
        message.success('添加成功！');
    };
    const handleCancelAdd = () => {
        setIsModalVisibleAdd(false);
    };

    const columns = [
        {
            title: '车辆ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '车名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '品牌',
            dataIndex: 'brand',
            key: 'brand',
        },
        {
            title: '卖家',
            dataIndex: 'sellUser',
            key: 'sellUser',
        },
        {
            title: '卖家联系方式',
            dataIndex: 'sellPhone',
            key: 'sellPhone',
        },
        {
            title: '售价',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={showModal}>查看详情</a>
                    <Popconfirm
                        title="您确定要删除该条数据?"
                        onConfirm={confirm}
                        onCancel={cancel}
                        okText="确认"
                        cancelText="取消"
                    >
                        <a href="#">删除</a>
                    </Popconfirm>,
                </Space>
            ),
        },
    ];

    const [data, setData] = useState([]);

    useEffect(() => {
        let loadData = []
        axios.get('/api/car/list', {params: {count: 50}})
            .then(res => {
                res['data'].forEach(item => {
                    loadData.push({
                        key: item['id'],
                        id: item['id'],
                        brand: item['name'],
                        name: item['name'],
                        sellUser: 'unknown',
                        sellPhone: 'unknown',
                        price: item['price']
                    })
                })
                setData(loadData)
            })
    }, [])

    return (
        <Layout style={{background: "white"}}>
            <Header style={{background: "white"}}>
                <SearchBar placeHolder="请输入车辆ID"/>
            </Header>
            <Content style={{background: "rgba(255,255,255,0.2)"}}>
                <Table columns={columns} dataSource={data}/>
            </Content>
            <>
                <CarInfo visible={isModalVisible} handleOk={handleOk} handleCancel={handleCancel} />
            </>
            <>
                <AddCar visible={isModalVisibleAdd} handleOk={handleOkAdd} handleCancel={handleCancelAdd}></AddCar>
            </>
        </Layout>
    )
}

export default CarManagement