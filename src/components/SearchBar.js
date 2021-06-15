import {Button, Col, Row, Space} from "antd";
import Search from "antd/es/input/Search";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {removeToken} from "../reducer/TokenReducer";
import {removeUsername} from "../reducer/UsernameReducer";
import storage from "sweet-storage";
import {useHistory} from 'react-router-dom'

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
    const toggleLoginStatus = () => {
        _setLoginStatus(!loginStatus)
    }
    const onSignOut = () => {
        dispatch(removeToken())
        dispatch(removeUsername())
        toggleLoginStatus()
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
                {storage.get('Username')} logged in
            </Col>
            <Col>
                <Button onClick={onSignOut}>sign out</Button>
            </Col>
        </>
    )
    const dispatch = useDispatch()
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
        </>
    )
}
