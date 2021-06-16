import {useEffect, useState} from "react";
import {Button, message, Popconfirm, Space, Table} from "antd";
import Layout, {Content, Header} from "antd/es/layout/layout";

import {AddUser} from "../components/AddInfo";
import {UserInfo} from "../components/Info";
import {SearchBar} from "../components/SearchBar";
import UserSvc from "../services/user"
import {userMapper} from "../mapper/mapper";

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [modelUserInfo, setUserInfo] = useState({})


    //列表删除按钮的确认和取消函数
    const confirmDelete = (id) => () => {
        UserSvc.delete(id).then(data => {
            // if (data.isPrototypeOf(Array))
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
    const showModal = (carId) => () => {
        setIsModalVisible(true);
        const userInfo = users.find(item => item.key === carId)
        setUserInfo(userInfo)
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
            title: '操作',
            key: 'action',
            render: (record) => {
                return (
                    <Space size="middle">
                        <Button type="link" onClick={showModal(record.key)}>查看详情</Button>
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
    let colIndexes = ['id', 'username', 'regDate', 'phone'].reverse()
    colIndexes.forEach(item => {
        //往数组头部添加元素
        columns.unshift({dataIndex: item})
    })
    columns.forEach(item => {
        if (item.key !== 'action') {
            item.key = item.dataIndex
            item.title = userMapper[item.dataIndex]
        }
    })

    useEffect(
        () => {
            UserSvc.getAll().then(res => {
                console.log(res)
                res.sort((a, b) => a['id'] - b['id'])
                res.forEach(u => {
                    u.regDate = `${u.regDate['year']}/${u.regDate['monthValue']}/${u.regDate['dayOfMonth']}`
                    console.log(u.regDate)
                })
                setUsers(res)
            }).catch(err => {
                message.error({content: "请先登录", key: "user service login error"})
                console.log(err)
            })
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
            <UserInfo userInfo={modelUserInfo} visible={isModalVisible} handleOk={handleOk}
                      handleCancel={handleCancel}/>
            <AddUser visible={isModalVisibleAdd} handleOk={handleOkAdd} handleCancel={handleCancelAdd}/>

        </Layout>


    )
}

export default UserManagement