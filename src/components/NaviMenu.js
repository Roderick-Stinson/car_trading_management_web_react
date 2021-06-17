import {Link, Redirect, useHistory} from 'react-router-dom'
import {Col, Menu, message, Row} from 'antd';
import {AppstoreOutlined, KeyOutlined, SnippetsOutlined, TransactionOutlined, WalletOutlined} from '@ant-design/icons';
import {useEffect, useState} from "react";
import {isLogin, onLoginPage} from "../services/login";

const NaviMenu = () => {
    const [current, setCurrent] = useState('')
    const history = useHistory()
    const [route, setRoute] = useState(history.location.pathname);

    const handleClick = (e) => {
        setCurrent(e.key)
    }

    useEffect(() => {
        switch (route) {
            case '/CarManagement':
                setCurrent('sell')
                break;
            case '/OrderManagement':
                setCurrent('order')
                break
            case '':
                setCurrent('')
                break
            default:
                setCurrent('')
                break
        }
    }, [route])

    history.listen(route => {
        setRoute(route.pathname)
    })
    const linkOrLogin = (url) => {
        if (isLogin() && !onLoginPage()) {
            return (<Link to={url}/>)
        } else {
            message.error({content: "请先登陆", key: 'not-login'})
            return (<Redirect to={'/login'}/>)
        }
    }
    return (
        <Row justify="space-around" align="middle">
            <Col span={23}>
                <Menu
                    onClick={handleClick}
                    selectedKeys={[current]}
                    theme="dark"
                    mode={"vertical"}>

                    <Menu.Item key="" icon={<WalletOutlined/>}>
                        {linkOrLogin('/')}
                        {/*<Link to={'/'}/>*/}
                        用户管理
                    </Menu.Item>
                    <Menu.Item key="sell" icon={<AppstoreOutlined/>}>
                        {linkOrLogin('/CarManagement')}
                        {/*<Link to={'/CarManagement'}/>*/}
                        车辆管理
                    </Menu.Item>
                    <Menu.Item key="order" icon={<TransactionOutlined/>}>
                        {linkOrLogin('/OrderManagement')}
                        {/*<Link to={'/orderManagement'}/>*/}
                        订单管理
                    </Menu.Item>
                    <Menu.Item key="booking" icon={<SnippetsOutlined />}>
                        {linkOrLogin('/BookingSellManagement')}
                        {/*<Link to={'/orderManagement'}/>*/}
                        预约卖车管理
                    </Menu.Item>
                    <Menu.Item key="login" icon={<KeyOutlined/>}>
                        <Link to={'/login'}/>
                        登陆
                    </Menu.Item>
                </Menu>
            </Col>
        </Row>
    )
}

export default NaviMenu