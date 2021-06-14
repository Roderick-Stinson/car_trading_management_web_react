import {useEffect, useState} from "react";
import {Button, message, Popconfirm, Space, Table} from "antd";
import Layout, {Content, Header} from "antd/es/layout/layout";

import {AddUser} from "../components/AddInfo";
import {UserInfo} from "../components/Info";
import {SearchBar} from "../components/SearchBar";
import UserSvc from "../services/user"

const UserManagement = () => {
    const [users, setUsers] = useState([]);


    //列表删除按钮的确认和取消函数
    const confirmDelete = (id) => () => {
        UserSvc.delete(id).then(data => {
                console.log(data)
                const usersAfterDelete = users.filter(user => user.id !== id)
                setUsers(usersAfterDelete)
            }
        ).catch(reason => {
            console.log(reason)
        })
        console.log(id)
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
    //添加用户的弹窗显示关闭
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
            render: (record) => {
                console.log(record)
                return (
                    <Space size="middle">
                        <Button type="link" onClick={showModal}>查看详情</Button>
                        <Popconfirm
                            title="您确定要删除该条数据?"
                            onConfirm={confirmDelete(record.id)}
                            onCancel={cancel}
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

    const data = [
        {
            key: '1',
            id: '001',
            name: 'John Brown',
            time: '2020/06/07-16:37:54',
            phone: 18008384132,
            order: '0',
        },
        {
            key: '2',
            id: '002',
            name: 'Jim Green',
            time: '2020/06/07-16:37:54',
            phone: 13888822342,
            order: '5',
        },
    ];
    useEffect(
        () => {
            // let loadData = []
            UserSvc.getAll().then(initUsers => {
                console.log(initUsers)
            })
            // setUsers(loadData)
            setUsers(data)
        }, [])

    return (
        <Layout style={{background: "white"}}>
            <Header style={{background: "white"}}>
                <SearchBar placeHolder="请输入用户名" btnAddOnClick={showModalAdd} btnAddStr="添加用户"/>
            </Header>
            <Content style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                paddingTop: 0,
            }}>
                <Table columns={columns} dataSource={users}/>
            </Content>
            <UserInfo visible={isModalVisible} handleOk={handleOk} handleCancel={handleCancel}/>
            <AddUser visible={isModalVisibleAdd} handleOk={handleOkAdd} handleCancel={handleCancelAdd}/>

        </Layout>


    )
}

export default UserManagement