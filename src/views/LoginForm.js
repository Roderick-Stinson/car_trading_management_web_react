import {Button, Card, Checkbox, Col, Form, Input, message, Row} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {useHistory} from 'react-router'
import "./LoginForm.css"
import {useDispatch} from "react-redux";
import {isLogin, LoginToServer} from "../services/login";
import {setToken} from "../reducer/TokenReducer";
import {setUsername} from "../reducer/UsernameReducer";
import {useEffect} from "react";

export const LoginForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    useEffect(() => {
        if (isLogin()) {
            message.success({content: '已登录', key: 'logged in'})
            history.push('/')
        }
    }, [history])
    const onFinishLogin = (values) => {
        LoginToServer(values['username'], values['password']).then(
            res => {
                if (res.data['code'] === 200) {

                    dispatch(setToken(res.data.token))
                    dispatch(setUsername(values.username))
                    history.push('/car')
                } else {
                    console.log('login error')
                }
            })
    };

    return (
        <Row justify={"center"} style={{height: '100vh'}} align={"middle"}>
            <Col span={6}>
                <Card>
                    <Row justify={'center'}>
                        <Col>
                            <h2>登录到二手车管理后台</h2>
                            <Form
                                name="normal_login"
                                className="login-form"
                                initialValues={{remember: true}}
                                onFinish={onFinishLogin}
                            >
                                <Form.Item
                                    name="username"
                                    rules={[{required: true, message: 'Please input your Username!'}]}
                                >
                                    <Input prefix={<UserOutlined className="site-form-item-icon"/>}
                                           placeholder="Username"/>
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[{required: true, message: 'Please input your Password!'}]}>
                                    <Input
                                        prefix={<LockOutlined className="site-form-item-icon"/>}
                                        type="password"
                                        placeholder="Password"
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Form.Item name="remember" valuePropName="checked" noStyle>
                                        <Checkbox>Remember me</Checkbox>
                                    </Form.Item>
                                </Form.Item>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                        登录
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    );
};
