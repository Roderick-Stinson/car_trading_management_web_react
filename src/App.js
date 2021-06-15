import './App.css';
import React from 'react'
import NaviMenu from "./components/NaviMenu";

import UserManagement from "./views/UserManagement";
import CarManagement from "./views/CarManagement";
import OrderManagement from "./views/OrderManagement";
import {history} from './utils/history'
import {BrowserRouter as Router, Route} from "react-router-dom"

import {Layout} from 'antd';
import {LoginForm} from "./views/LoginForm";

const {Sider, Content} = Layout;


function App() {
    return (
        <Router history={history}>
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
                    <Route component={UserManagement} exact path={'/'}/>
                    <Route component={CarManagement} exact path={'/CarManagement'}/>
                    <Route component={OrderManagement} exact path={'/OrderManagement'}/>
                    <Route component={LoginForm} exact path={'/login'}/>
                </Content>
            </Layout>
        </Router>
    );
}

export default App;
