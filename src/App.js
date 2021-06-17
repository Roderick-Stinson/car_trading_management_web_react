import './App.css';
import React from 'react'
import NaviMenu from "./components/NaviMenu";

import UserManagement from "./views/UserManagement";
import CarManagement from "./views/CarManagement";
import OrderManagement from "./views/OrderManagement";
import BookingSellManagement from "./views/BookingSellManagement";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"

import {Layout} from 'antd';
import {LoginForm} from "./views/LoginForm";

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
                    <Switch>
                        <Route component={UserManagement} exact path={'/UserManagement'}/>
                        <Route component={CarManagement} exact path={'/CarManagement'}/>
                        <Route component={OrderManagement} exact path={'/OrderManagement'}/>
                        <Route component={BookingSellManagement} exact path={'/BookingSellManagement'}/>
                        <Route component={LoginForm} exact path={'/login'}/>
                    </Switch>
                </Content>
            </Layout>
        </Router>
    );
}

export default App;
