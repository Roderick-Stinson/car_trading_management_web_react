import {Button, message, Popconfirm, Space, Table} from "antd";
import Layout, {Content, Header} from "antd/es/layout/layout";

import {OrderInfo} from "../components/Info"
import {useEffect, useState} from "react";
import {SearchBar} from "../components/SearchBar";
import {AddOrder} from "../components/AddInfo";
import OrderSvc from "../services/order"
import {orderMapper, orderStatusMapper} from "../mapper/mapper";

const OrderManagement = () => {
    const [trades, setTrade] = useState([]);
    const [modelTradeInfo, setTradeInfo] = useState({})

    useEffect(
        () => {
            OrderSvc.getAll().then(res => {
                console.log(res)
                res.sort((a, b) => a['id'] - b['id'])
                res.forEach(u => {
                    u.tradeDateStr = `${u.tradeDate['year']}/${u.tradeDate['monthValue']}/${u.tradeDate['dayOfMonth']}`
                    u.key = u.id
                    u.statusStr = orderStatusMapper(u.status)
                    console.log(u.statusStr)
                })
                setTrade(res)
            }).catch(err => {
                console.log('err', err)
            })
        }, [])

    //列表删除按钮的确认和取消函数
    function confirm(e) {
        console.log(e);
        message.error('删除成功！');
    }

    function cancel(e) {

    }

    //查看详情对应的弹窗显示关闭
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = (id) => () => {
        console.log(id)
        setIsModalVisible(true);
        const tradeInfo = trades.find(item => item.key === id)
        setTradeInfo(tradeInfo)
    };
    const handleOk = () => {
        setIsModalVisible(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    //添加订单的弹窗显示关闭
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
            title: '操作',
            key: 'action',
            render: (record) => (
                <Space size="middle">
                    <Button type="link" onClick={showModal(record.key)}>查看详情</Button>
                    <Popconfirm
                        title="您确定要删除该条数据?"
                        onConfirm={confirm}
                        onCancel={cancel}
                        okText="确认"
                        cancelText="取消"
                    >
                        <Button type="link" href="#">删除</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    let colIndexes = ['id', 'buyerId', 'carId', 'sellerId', 'tradeDateStr', 'price', 'statusStr'].reverse()
    colIndexes.forEach(item => {
        //往数组头部添加元素
        columns.unshift({dataIndex: item})
    })
    columns.forEach(item => {
        if (item.key !== 'action') {
            item.key = item.dataIndex
            item.title = orderMapper[item.dataIndex]
        }
    })


    return (
        <Layout style={{background: "white"}}>
            <Header style={{background: "white"}}>
                <SearchBar placeHolder="请输入订单ID" btnAddOnClick={showModalAdd} btnAddStr="添加订单"/>
            </Header>
            <Content style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                paddingTop: 0,

            }}>
                <Table columns={columns} dataSource={trades}/>
            </Content>
            <OrderInfo orderInfo={modelTradeInfo} visible={isModalVisible} handleOk={handleOk}
                       handleCancel={handleCancel}/>
            <AddOrder visible={isModalVisibleAdd} handleOk={handleOkAdd} handleCancel={handleCancelAdd}/>
        </Layout>


    )
}

export default OrderManagement