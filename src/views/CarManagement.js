import {Button, Col, Popconfirm, Space, message, Table} from "antd";
import Layout, {Content, Header} from "antd/es/layout/layout";
import Search from "antd/es/input/Search";

import {CarInfo, OrderInfo} from "../components/Info";
import {useState} from "react";
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

    const data = [
        {
            key: '1',
            id:'001',
            brand:'大众',
            name:'大众-高尔夫_2018款_1.8L_自动舒适型_2018年03月_0',
            sellUser: '张三',
            sellPhone:'18008384132',
            price:'2.4万',
        },

    ];

    return (
        <Layout style={{background: "white"}}>
            <Header style={{background: "white"}}>
                <Col>
                </Col>
                <Search  placeholder="请输入车辆ID" style={{width: '200px',marginTop : "15px",marginLeft : "1000px"}} allowClear enterButton />
                <Button type="primary" style={{marginLeft : "30px"}} onClick={showModalAdd} >
                    添加车辆
                </Button>
                <Button type="primary" style={{marginLeft : "30px"}}>
                    导出csv
                </Button>
            </Header>
            <Content style={{background: "white"}}>
                <Table columns={columns} dataSource={data} />
            </Content>
            <>
                <CarInfo visible={isModalVisible} handleOk={handleOk} handleCancel={handleCancel} ></CarInfo>
            </>
            <>
                <AddCar visible={isModalVisibleAdd} handleOk={handleOkAdd} handleCancel={handleCancelAdd}></AddCar>
            </>
        </Layout>


    )
}

export default CarManagement