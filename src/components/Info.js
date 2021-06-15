import Modal from "antd/es/modal/Modal";
import {Descriptions} from "antd";
import {EditableField} from "./EditableField";
import {carMapper, userMapper} from "../mapper/mapper";

const genFields = (_fields, disableEditFields, mapper) => {
    const fields = []
    _fields.forEach(item => {
            fields.push({
                label: mapper[item],
                dataIndex: item,
                key: item,
                disableEdit: !!disableEditFields.find(i => i === item)
            })
        }
    )
    return fields
}
export const UserInfo = ({visible, userInfo, handleOk, handleCancel}) => {

    let _fields = ['userid', 'username', 'regDate', 'phone']
    let disableEditFields = ['userid', 'regDate']
    const fields = genFields(_fields, disableEditFields, userMapper)
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
                <Descriptions layout="vertical">
                    {
                        fields.map((item) => {
                            return (
                                <Descriptions.Item label={item.label} key={item.key}>
                                    <EditableField fieldFrom='car'
                                                   fieldKey={item.key}
                                                   value={userInfo[item.dataIndex]}
                                                   originObject={userInfo}
                                                   disableEdit={item.disableEdit}
                                    />
                                </Descriptions.Item>
                            )
                        })
                    }
                </Descriptions>
            </Modal>
        </>
    )
}

export const CarInfo = ({visible, carInfo, handleOk, handleCancel}) => {
    const _fields = ['brand', 'model', 'year', 'version', 'price', 'mileage', 'sellPhone']
    let disableEditFields = ['sellPhone']
    const fields = genFields(_fields, disableEditFields, carMapper)
    return (
        <Modal
            visible={visible}
            title="车辆详情"
            centered
            onCancel={handleCancel}
            onOk={handleOk}
            width={1000}
        >
            <Descriptions layout="vertical">
                {
                    fields.map((item) => {
                        return (
                            <Descriptions.Item label={item.label} key={item.key}>
                                <EditableField fieldFrom='car'
                                               fieldKey={item.key}
                                               value={carInfo[item.dataIndex]}
                                               originObject={carInfo}
                                               disableEdit={item.disableEdit}
                                />
                            </Descriptions.Item>
                        )
                    })
                }
            </Descriptions>
        </Modal>
    )
}

export const OrderInfo = ({visible, handleOk, handleCancel}) => {

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
                <Descriptions layout="vertical">
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

