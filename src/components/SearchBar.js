import {Button, Col, Row, Space} from "antd";
import Search from "antd/es/input/Search";
import {useState} from "react";

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
    const [loginStatus, setLoginStatus] = useState(false)
    const loginBtn = () => (
        <Col>
            <Button>
                login
            </Button>
        </Col>
    )
    let username = 'example user'
    const userBtnGroup = () => (
        <>
            <Col>
                {username} logged in
            </Col>
            <Col>
                <Button>sign out</Button>
            </Col>
        </>
    )
    return (
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
    )
}
