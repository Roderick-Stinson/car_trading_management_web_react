import {useEffect, useState} from "react";
import {Button, message, Popconfirm, Space, Table} from "antd";
import Layout, {Content, Header} from "antd/es/layout/layout";

import {AddCar} from "../components/AddInfo";
import {SearchBar} from "../components/SearchBar";
import {BookingSellMapper, sellCarMapper} from "../mapper/mapper";
import $http from "../services/http_util";

const BookingSellManagement = () => {
    const [lists, setLists] = useState([]);
    const [currentRowKey, setCurrentRowKey] = useState(0)

    //列表终止按钮的确认和取消函数
    function confirmStop() {
        $http.patch('/api/car/'+currentRowKey, {"status": 3})
            .then(()=>{})
            .catch(err => {
                console.log(err)})
        message.error('流程已终止！');
    }

    //列表删除按钮的确认和取消函数
    const confirmDelete = (id) => () => {
        $http.delete('/api/car/'+ id)
            .then(()=>{})
            .catch(err => {
                console.log(err)})
    }

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
            title: '操作',
            key: 'action',
            render: (record) => {
                return (
                    <Space size="middle">
                        <Button type="link" onClick={showModalAdd} disabled={record.state === '进行中'}>添加车辆</Button>
                        <Popconfirm
                            title="您确定要终止该预约?"
                            onConfirm={confirmStop}
                            okText="确认"
                            cancelText="取消"
                        >
                            <Button type="link">终止</Button>
                        </Popconfirm>
                        <Popconfirm
                            title="您确定要删除该条数据?"
                            onConfirm={confirmDelete(record.id)}
                            okText="确认"
                            cancelText="取消"
                        >
                            <Button type="link">删除</Button>
                        </Popconfirm>
                    </Space>
                )
            },
        },
    ];
    let colIndexes = ['id', 'createTime', 'state', 'username', 'phone'].reverse()
    colIndexes.forEach(item => {
        //往数组头部添加元素
        columns.unshift({dataIndex: item})
    })
    columns.forEach(item => {
        if (item.key !== 'action') {
            item.key = item.dataIndex
            item.title = BookingSellMapper[item.dataIndex]
        }
    })

    useEffect(
        () => {
            let testLists =[]
            $http.get('/api/car/list?count=20000',)
                .then(res => {
                    res.data.forEach(item => {
                        testLists.push({
                            key: item['id'],
                            // createTime: item['regDate']['year']+'-'+item['regDate']['monthValue']+'-'+item['regDate']['dayOfMonth'],
                            id: item['id'],
                            state: sellCarMapper(item['status']),
                            username: item['username'],
                            phone: item['phoneNumber'],
                        })
                    })
                    console.log(testLists)
                    setLists(testLists)
            })
            // eslint-disable-next-line
        }, [])

    return (
        <Layout style={{background: "white"}}>
            <Header style={{background: "white"}}>
                <SearchBar placeHolder="请输入预约单号" />
            </Header>
            <Content style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                paddingTop: 0,
            }}>
                <Table columns={columns} dataSource={lists} onRow={(record) => {
                    return {
                        onClick: () => {
                            setCurrentRowKey(record['id'])
                        }
                    }
                }} pagination={false}/>
            </Content>
            <AddCar visible={isModalVisibleAdd} handleOk={handleOkAdd} handleCancel={handleCancelAdd} carId={currentRowKey}/>
        </Layout>
    )
}

export default BookingSellManagement