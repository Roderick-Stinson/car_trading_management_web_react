import Modal from "antd/es/modal/Modal";
import {Descriptions} from "antd";
import {EditableField} from "./EditableField";
import {carMapper, orderMapper, userMapper} from "../mapper/mapper";

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

    let _fields = ['id', 'username', 'regDateStr', 'phone']
    let disableEditFields = ['id', 'regDateStr']
    const fields = genFields(_fields, disableEditFields, userMapper)
    return (
        <Modal
            visible={visible}
            title="用户详情"
            centered
            destroyOnClose
            onCancel={handleCancel}
            onOk={handleOk}
            width={1000}
        >
            <Descriptions layout="vertical">
                {
                    fields.map((item) => {
                        return (
                            <Descriptions.Item label={item.label} key={item.key}>
                                <EditableField key={item.key}
                                               fieldFrom='user'
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
            destroyOnClose
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

export const OrderInfo = ({orderInfo, visible, handleOk, handleCancel}) => {
    const _fields = ['id', 'carId', 'buyerId', 'sellerId', 'price']
    let disableEditFields = ['id', 'carId', 'buyerId', 'sellerId']
    const fields = genFields(_fields, disableEditFields, orderMapper)
    return (
        <Modal
            visible={visible}
            title="订单详情"
            centered
            destroyOnClose
            onCancel={handleCancel}
            onOk={handleOk}
            width={1000}
        >
            <Descriptions layout="vertical">
                {
                    fields.map((item) => {
                        return (
                            <Descriptions.Item label={item.label} key={item.key}>
                                <EditableField fieldFrom='order'
                                               fieldKey={item.key}
                                               value={orderInfo[item.dataIndex]}
                                               originObject={orderInfo}
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

