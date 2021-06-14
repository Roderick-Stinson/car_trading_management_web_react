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

    //表格数据
    const [data, setData] = useState([]);
    const [modelCarInfo, setCarInfo] = useState({})
    //查看详情对应的弹窗显示关闭
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = (carId) => () => {
        setIsModalVisible(true);
        const carInfo = data.find(item => item.key === carId)
        setCarInfo(carInfo)
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
            title: '标题',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: '品牌',
            dataIndex: 'brand',
            key: 'brand',
        },
        {
            title: '型号',
            dataIndex: 'model',
            key: 'model'
        },
        {
            title: '款式',
            dataIndex: 'year',
            key: 'year'
        },
        {
            title: '版本',
            dataIndex: 'version',
            key: 'version'
        },
        {
            title: '里程数（万公里）',
            dataIndex: 'mileage',
            key: 'mileage'
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
            title: '售价（万元）',
            dataIndex: 'price',
            key: 'price',
        },
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


    useEffect(() => {
        let loadData = []
        CarSvc.getAll().then(initCars => {
            initCars.sort((a, b) => a.id - b.id)
            initCars.forEach(item => {
                const title = [item.brand, item.model, item.year, item.version].join(" ")
                loadData.push({
                    key: item.id,
                    id: item.id,
                    brand: item.brand,
                    model: item.model,
                    year: item.year,
                    version: item.version,
                    title: title,
                    sellUser: 'unknown',
                    sellPhone: 'unknown',
                    price: item.price,
                    mileage: item.mileage
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
            <CarInfo carInfo={modelCarInfo} visible={isModalVisible} handleOk={handleOk} handleCancel={handleCancel}/>
            <AddCar visible={isModalVisibleAdd} handleOk={handleOkAdd} handleCancel={handleCancelAdd}/>
        </Layout>
    )
}

export default CarManagement