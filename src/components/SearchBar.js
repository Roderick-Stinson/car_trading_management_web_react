import {Button, Col, Form, Input, Row, Space} from "antd";
import Search from "antd/es/input/Search";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {removeToken, setToken} from "../reducer/TokenReducer";
import {removeUsername, setUsername} from "../reducer/UsernameReducer";
import storage from "sweet-storage";
import Modal from "antd/es/modal/Modal";
import {LoginToServer} from "../services/login";

export const SearchBar = ({placeHolder, btnAddOnClick, btnAddStr}) => {
    let btnGroup;
    if (btnAddStr !== undefined) {
        btnGroup = (
            <Space>
                <Button type="primary" onClick={btnAddOnClick}>
                    {btnAddStr}
                </Button>
                <Button type="primary">
                    导出csv
                </Button>
            </Space>
        )
    } else {
        btnGroup = (
            <Button type="primary">
                导出csv
            </Button>
        )
    }
    useEffect(() => {
        if (storage.get('Username')) {
            _setLoginStatus(true)
        }
    }, []);

    const [loginStatus, _setLoginStatus] = useState(false)
    const [showLoginDialog, _setShowLoginDialog] = useState(false);
    const toggleDialog = () => {
        _setShowLoginDialog(!showLoginDialog)
    }
    const toggleLoginStatus = () => {
        _setLoginStatus(!loginStatus)
    }
    const onSignOut = () => {
        dispatch(removeToken())
        dispatch(removeUsername())
        toggleLoginStatus()
    }
    const loginBtn = () => (
        <Col>
            <Button onClick={toggleDialog}>
                login
            </Button>
        </Col>
    )
    const userBtnGroup = () => (
        <>
            <Col>
                {storage.get('Username')} logged in
            </Col>
            <Col>
                <Button onClick={onSignOut}>sign out</Button>
            </Col>
        </>
    )
    const [formLogin] = Form.useForm();

    const dispatch = useDispatch()
    const onFinishLogin = (values) => {
        LoginToServer(values['username'], values['password']).then(
            res => {
                if (res.data['code'] === 200) {

                    dispatch(setToken(res.data.token))
                    dispatch(setUsername(values.username))
                    toggleLoginStatus()
                    toggleDialog()
                } else {
                    console.log('login error')
                }
            })
    };

    return (
        <>
            <Row justify="end" gutter={[16, 16]}>
                <Col>
                    <Search placeholder={placeHolder} style={{width: '200px', marginTop: "15px", marginLeft: "1000px"}}
                            allowClear enterButton/>
                </Col>
                <Col>
                    {btnGroup}
                </Col>
                {loginStatus ? userBtnGroup() : loginBtn()}
            </Row>
            <Modal
                visible={showLoginDialog}
                title="登录"
                onCancel={toggleDialog}
                onOk={
                    () => {
                        formLogin.validateFields()
                            .then(() => {
                                formLogin.submit()
                                toggleDialog()
                            })
                    }
                }>
                <Form
                    form={formLogin}
                    name="ManageSystemLoginForm"
                    onFinish={onFinishLogin}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
