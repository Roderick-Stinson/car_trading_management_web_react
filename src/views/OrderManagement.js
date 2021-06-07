import {Button, Col, message, Popconfirm, Space, Table, Tag} from "antd";
import Layout, {Content, Header} from "antd/es/layout/layout";
import Search from "antd/es/input/Search";

import {OrderInfo} from "../components/Info"
import {useState} from "react";

const OrderManagement = () => {

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
            title: '创建时间',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: '订单ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '状态',
            dataIndex: 'state',
            key: 'state',
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
            title: '买家',
            dataIndex: 'buyUser',
            key: 'buyUser',
        },
        {
            title: '买家联系方式',
            dataIndex: 'buyPhone',
            key: 'buyPhone',
        },
        {
            title: '售价',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: '买家报价',
            dataIndex: 'quote',
            key: 'quote',
        },
        {
            title: '成交价',
            dataIndex: 'finalPrice',
            key: 'finalPrice',
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
            time:'2020/06/07-16:37:54',
            id:'001',
            state:'交易中',
            sellUser: '张三',
            buyUser: '李四',
            sellPhone:'18008384132',
            buyPhone: '13888822342',
            price:'2.4万',
            quote:'2.2万',
            finalPrice:'',
        },
        {
            key: '2',
            time:'2020/06/07-16:37:54',
            id:'002',
            state:'已完成',
            sellUser: '张三',
            buyUser: '李四',
            sellPhone:'18008384132',
            buyPhone: '13888822342',
            price:'3.4万',
            quote:'1.4万',
            finalPrice:'1.4万',
        },
    ];

    return (
        <Layout style={{background: "white"}}>
            <Header style={{background: "white"}}>
                <Col>
                </Col>
                <Search  placeholder="请输入订单ID" style={{width: '200px',marginTop : "15px",marginLeft : "1000px"}} allowClear enterButton />
                <Button type="primary" style={{marginLeft : "30px"}}>
                    创建订单
                </Button>
                <Button type="primary" style={{marginLeft : "30px"}}>
                    导出csv
                </Button>
            </Header>
            <Content style={{background: "white"}}>
                <Table columns={columns} dataSource={data} />
            </Content>
            <>
                <OrderInfo visible={isModalVisible} handleOk={handleOk} handleCancel={handleCancel} ></OrderInfo>
            </>
        </Layout>


    )
}

export default OrderManagement