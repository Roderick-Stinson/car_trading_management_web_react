import {Button, message, Popconfirm, Space, Table} from "antd";
import Layout, {Content, Header} from "antd/es/layout/layout";


import {CarInfo} from "../components/Info";
import {useEffect, useState} from "react";
import {SearchBar} from "../components/SearchBar";
import {AddCar} from "../components/AddInfo";
import CarSvc from "../services/car"

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
            title: '型号',
            dataIndex: 'type',
            key: 'type'
        },
        {
            title: '款式',
            dataIndex: 'year',
            key: 'year'
        },
        {
            title: '其他参数',
            dataIndex: 'args',
            key: 'args'
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
            render: () => (
                <Space size="middle">
                    <Button type="link" onClick={showModal}>查看详情</Button>
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

    const [data, setData] = useState([]);

    useEffect(() => {
        let loadData = []
        CarSvc.getAll().then(initCars => {
            console.log(initCars)
            initCars.forEach(item => {
                const name = item.name.replaceAll('_', ' ').replaceAll('-', ' ')
                const parts = item.name.split('-')
                const brand = parts[0]
                const subParts = parts[1].split('_')
                const type = subParts[0]
                const year = subParts[1]
                const args = subParts.slice(2).join(' ')
                loadData.push({
                    key: item['id'],
                    id: item['id'],
                    brand: brand,
                    type: type,
                    year: year,
                    args: args,
                    name: name,
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
                <SearchBar placeHolder="请输入车辆ID" btnAddOnClick={showModalAdd} btnAddStr="添加车辆"/>
            </Header>
            <Content style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                paddingTop: 0,
            }}>
                <Table columns={columns} dataSource={data}/>
            </Content>
            <CarInfo visible={isModalVisible} handleOk={handleOk} handleCancel={handleCancel}/>
            <AddCar visible={isModalVisibleAdd} handleOk={handleOkAdd} handleCancel={handleCancelAdd}/>
        </Layout>
    )
}

export default CarManagement