import Modal from "antd/es/modal/Modal";
import {Descriptions} from "antd";

export const UserInfo = ({visible,handleOk, handleCancel}) => {

    return (
        <>
            <Modal
                visible={visible}
                title="用户详情"
                centered
                onCancel={handleCancel}
                onOk={handleOk}
                width={1000}
            >
                <Descriptions  layout="vertical">
                    <Descriptions.Item label="用户ID">001</Descriptions.Item>
                    <Descriptions.Item label="用户名">Zhou Maomao</Descriptions.Item>
                    <Descriptions.Item label="手机号">1810000000</Descriptions.Item>
                    <Descriptions.Item label="注册时间">2020/06/07-16:37:54</Descriptions.Item>
                    <Descriptions.Item label="Address" span={2}>
                        No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
                    </Descriptions.Item>
                    <Descriptions.Item label="Remark">empty</Descriptions.Item>
                </Descriptions>,
            </Modal>
        </>
    )
}

export const CarInfo = ({visible,handleOk, handleCancel}) => {

    return (
        <>
            <Modal
                visible={visible}
                title="车辆详情"
                centered
                onCancel={handleCancel}
                onOk={handleOk}
                width={1000}
            >
                <Descriptions  layout="vertical">
                    <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
                    <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
                    <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
                    <Descriptions.Item label="Address" span={2}>
                        No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
                    </Descriptions.Item>
                    <Descriptions.Item label="Remark">empty</Descriptions.Item>
                </Descriptions>,
            </Modal>
        </>
    )
}

export const OrderInfo = ({visible,handleOk, handleCancel}) => {

    return (
        <>
            <Modal
                visible={visible}
                title="订单详情"
                centered
                onCancel={handleCancel}
                onOk={handleOk}
                width={1000}
            >
                <Descriptions  layout="vertical">
                    <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
                    <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
                    <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
                    <Descriptions.Item label="Address" span={2}>
                        No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
                    </Descriptions.Item>
                    <Descriptions.Item label="Remark">empty</Descriptions.Item>
                </Descriptions>,
            </Modal>
        </>
    )
}

