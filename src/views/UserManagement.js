import {Button, Col, message, Popconfirm, Space, Table, Tag} from "antd";
import Layout, {Content, Header} from "antd/es/layout/layout";
import Search from "antd/es/input/Search";

import {OrderInfo, UserInfo} from "../components/Info";
import {useState} from "react";

const UserManagement = () => {

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


    const columns = [
        {
            title: '用户ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '用户名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '注册时间',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: '手机号',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: '订单数',
            dataIndex: 'order',
            key: 'order',
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
            name: 'John Brown',
            time:'2020/06/07-16:37:54',
            phone: 18008384132,
            order: '0',
        },
        {
            key: '2',
            id:'002',
            name: 'Jim Green',
            time:'2020/06/07-16:37:54',
            phone: 13888822342,
            order: '5',
        },
    ];

    return (
        <Layout style={{background: "white"}}>
            <Header style={{background: "white"}}>
                <Col>
                </Col>
                <Search  placeholder="请输入用户名" style={{width: '200px',marginTop : "15px",marginLeft : "1000px"}} allowClear enterButton />
                <Button type="primary" style={{marginLeft : "30px"}}>
                    添加用户
                </Button>
                <Button type="primary" style={{marginLeft : "30px"}}>
                    导出csv
                </Button>
            </Header>
            <Content style={{background: "white"}}>
                <Table columns={columns} dataSource={data} />
                <></>
            </Content>
            <>
                <UserInfo visible={isModalVisible} handleOk={handleOk} handleCancel={handleCancel} ></UserInfo>
            </>
        </Layout>


    )
}

export default UserManagement