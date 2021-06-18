import {Button, Col, Row, Space} from "antd";
import Search from "antd/es/input/Search";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {removeToken} from "../reducer/TokenReducer";
import {removeUsername} from "../reducer/UsernameReducer";
import {useHistory} from 'react-router'
import {getUsername, isLogin} from "../services/login";

export const SearchBar = ({placeHolder}) => {
    let btnGroup = (
        <Space>
            <Button type="primary">
                导出csv
            </Button>
        </Space>
    )
    useEffect(() => {
        if (isLogin()) {
            _setLoginStatus(true)
        }
    }, []);

    const [loginStatus, _setLoginStatus] = useState(false)
    const toggleLoginStatus = () => {
        _setLoginStatus(!loginStatus)
    }
    const onSignOut = () => {
        dispatch(removeToken())
        dispatch(removeUsername())
        toggleLoginStatus()
        history.push('/login')
    }
    const history = useHistory()
    const loginBtn = () => (
        <Col>
            <Button onClick={() => history.push('/login')}>
                login
            </Button>
        </Col>
    )
    const userBtnGroup = () => (
        <>
            <Col>
                {getUsername()}已登录
            </Col>
            <Col>
                <Button onClick={onSignOut}>登出</Button>
            </Col>
        </>
    )
    const dispatch = useDispatch()
    return (
        <>
            <Row justify="end" gutter={[16, 16]}>
                <Col>
                    <Search placeholder={placeHolder} style={{width: '200px', marginTop: "15px", marginLeft: "800px"}}
                            allowClear enterButton/>
                </Col>
                <Col>
                    {btnGroup}
                </Col>
                {loginStatus ? userBtnGroup() : loginBtn()}
            </Row>
        </>
    )
}
