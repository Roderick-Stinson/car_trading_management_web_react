import {useEffect, useState} from "react";
import {Button, message, Popconfirm, Space, Table} from "antd";
import Layout, {Content, Header} from "antd/es/layout/layout";

import {AddCar} from "../components/AddInfo";
import {SearchBar} from "../components/SearchBar";
import ListsSvc from "../services/user"
import {BookingSellMapper, sellCarMapper} from "../mapper/mapper";
import $http from "../services/http_util";

const BookingSellManagement = () => {
    const [lists, setLists] = useState([]);

    //列表终止按钮的确认和取消函数
    function confirmStop(e) {
        console.log(e);
        /*TODO
         *这里将预约订单状态变为已终止
         */
        message.error('流程已终止！');
    }
    function cancelStop(e) {

    }
    //列表删除按钮的确认和取消函数
    const confirmDelete = (id) => () => {
        ListsSvc.delete(id).then(data => {
                // if (data.isPrototypeOf(Array))
                console.log(data)
                const listsAfterDelete = lists.filter(user => user.id !== id)
                setLists(listsAfterDelete)
            }
        ).catch(reason => {
            console.log(reason)
        })
        console.log(id)
    }
    function cancelDelete(e) {

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
                        <Button type="link" onClick={showModalAdd}>添加车辆</Button>
                        <Popconfirm
                            title="您确定要终止该预约?"
                            onConfirm={confirmStop}
                            onCancel={cancelStop}
                            okText="确认"
                            cancelText="取消"
                        >
                            <Button type="link">终止</Button>
                        </Popconfirm>
                        <Popconfirm
                            title="您确定要删除该条数据?"
                            onConfirm={confirmDelete(record.id)}
                            onCancel={cancelDelete}
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

            $http.get('/api/car/list',{params: {status: 0}})
                .then(res => {
                    console.log(res.data)
                    res.data.forEach(item => {
                        testLists.push({
                            key: item['id'],
                            createTime: '2020/06/07-16:37:54',
                            id: item['id'],
                            state: sellCarMapper(item['status']),
                            username: item['username'],
                            phone: '18008384601',
                        })
                    })
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
                <Table columns={columns} dataSource={lists}/>
            </Content>
            <AddCar visible={isModalVisibleAdd} handleOk={handleOkAdd} handleCancel={handleCancelAdd}/>
        </Layout>
    )
}

export default BookingSellManagement