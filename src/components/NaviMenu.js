import {Link, useHistory} from 'react-router-dom'
import {Col, Menu, Row} from 'antd';
import {WalletOutlined, TransactionOutlined, AppstoreOutlined} from '@ant-design/icons';
import {useEffect, useState} from "react";

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
            case '/orderManagement':
                setCurrent('order')
                break
            case '':
                setCurrent('')
                break
        }
    }, [route])

    history.listen(route => {
        setRoute(route.pathname)
    })

    return (
        <Row style={{background: "white"}} justify="space-around" align="middle">
            <Col span={23}>
                <Menu
                    onClick={handleClick}
                    selectedKeys={[current]}
                    mode={"vertical"}>

                    <Menu.Item key="" icon={<WalletOutlined/>}>
                        <Link to={'/'}/>
                        用户管理
                    </Menu.Item>
                    <Menu.Item key="sell" icon={<AppstoreOutlined/>}>
                        <Link to={'/CarManagement'}/>
                        车辆管理
                    </Menu.Item>
                    <Menu.Item key="order" icon={<TransactionOutlined/>}>
                        <Link to={'/orderManagement'}/>
                        订单管理
                    </Menu.Item>
                </Menu>
            </Col>
        </Row>
    )
}

export default NaviMenu