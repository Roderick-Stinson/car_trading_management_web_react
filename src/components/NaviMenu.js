import {Link} from 'react-router-dom'
import {Col,Menu, Row} from 'antd';
import {WalletOutlined, TransactionOutlined, AppstoreOutlined} from '@ant-design/icons';
import {useState} from "react";

const NaviMenu = () => {
    const [current, setCurrent] = useState('')

    const handleClick = (e) => {
        setCurrent(e.key)
    }

    return (
        <Row style={{background: "white"}} justify="space-around" align="middle">
            <Col span={23} >
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