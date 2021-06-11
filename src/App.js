import './App.css';
import React from 'react'
import NaviMenu from "./components/NaviMenu";

import UserManagement from "./views/UserManagement";
import CarManagement from "./views/CarManagement";
import OrderManagement from "./views/OrderManagement";

import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom"

import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;


function App() {
  return (
    <Router>
    <Layout style={{background: "white"}} >
        <Header style={{background: "white"}}><h2>二手车管理后台</h2></Header>
        <Layout>
            <Sider style={{background: "white"}} ><NaviMenu /></Sider>
            <Content>
                <Route component={UserManagement}  exact={true} path={'/'}/>
                <Route component={CarManagement} exact={true} path={'/CarManagement'}/>
                <Route component={OrderManagement} exact={true} path={'/OrderManagement'}/>
            </Content>
        </Layout>
    </Layout>
    </Router>
  );
}

export default App;
