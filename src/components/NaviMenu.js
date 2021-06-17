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
    const menuUrls = ['car', 'user', 'order', 'booking']
    const menuTexts = ['车辆管理', '用户管理', '订单管理', '预约卖车管理']
    const icons = [(<WalletOutlined/>), (<AppstoreOutlined/>), (<TransactionOutlined/>), (<SnippetsOutlined/>)]
    const menuItems =
        menuUrls.map((url, idx) => (
            {
                url: "/" + url,
                icon: icons[idx],
                key: "/" + url,
                text: menuTexts[idx]
            }
        ))

    useEffect(() => {
        menuItems.map((menuItem) => {
            if (route === menuItem.url) {
                setCurrent(menuItem.key)
            }
        })
    }, [route])

    history.listen(route => {
        setRoute(route.pathname)
    })
    const linkOrLogin = (url) => {
        if (isLogin() && !onLoginPage()) {
            return (<Link to={url}/>)
        } else {
            message.error({content: "请先登录", key: 'not-login'})
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

                    {menuItems.map(item =>
                        (
                            <Menu.Item key={item.key} icon={item.icon}>
                                {linkOrLogin(item.url)}
                                {item.text}
                            </Menu.Item>
                        )
                    )}
                    <Menu.Item key="login" icon={<KeyOutlined/>}>
                        <Link to={'/login'}/>
                        登录
                    </Menu.Item>
                </Menu>
            </Col>
        </Row>
    )
}

export default NaviMenu