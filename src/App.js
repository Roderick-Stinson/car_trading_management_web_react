import './App.css';
import React from 'react'
import NaviMenu from "./components/NaviMenu";

import UserManagement from "./views/UserManagement";
import CarManagement from "./views/CarManagement";
import OrderManagement from "./views/OrderManagement";

import {BrowserRouter as Router, Route,} from "react-router-dom"

import {Layout} from 'antd';

const {Sider, Content} = Layout;


function App() {
    return (
        <Router>
            <Layout style={{minHeight: '100vh'}}>
                <Sider>
                    <div className="logo" style={{
                        textAlign: "center",
                        fontSize: "24px",
                        color: "white",
                        height: "32px",
                        margin: "16px"
                    }}>二手车管理后台
                    </div>
                    <NaviMenu/>
                </Sider>
                <Content>
                    <Route component={UserManagement} exact={true} path={'/'}/>
                    <Route component={CarManagement} exact={true} path={'/CarManagement'}/>
                    <Route component={OrderManagement} exact={true} path={'/OrderManagement'}/>
                </Content>
            </Layout>
        </Router>
    );
}

export default App;
