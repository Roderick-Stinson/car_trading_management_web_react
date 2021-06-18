import Modal from "antd/es/modal/Modal";
import {Descriptions} from "antd";
import {EditableField} from "./EditableField";
import {carMapper, orderMapper, userMapper} from "../mapper/mapper";
import {number_rule} from "../utils/form_rules";

const genFields = (_fields, disableEditFields, rules, mapper) => {
    const fields = []
    _fields.forEach((item, index) => {
            fields.push({
                label: mapper[item],
                rules: rules[index],
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
    let filed_rules = [[], [], [], []]
    let disableEditFields = ['id', 'regDateStr']
    const fields = genFields(_fields, disableEditFields, filed_rules, userMapper)
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
                        // console.log(item)
                        return (
                            <Descriptions.Item label={item.label} key={item.key}>
                                <EditableField key={item.key}
                                               fieldFrom='user'
                                               fieldKey={item.key}
                                               value={userInfo[item.dataIndex]}
                                               originObject={userInfo}
                                               disableEdit={item.disableEdit}
                                               validation_rules={item.rules}
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
    let filed_rules = [[], [], [], [], [number_rule], [number_rule], []]
    let disableEditFields = ['sellPhone']
    const fields = genFields(_fields, disableEditFields, filed_rules, carMapper)
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
                                               validation_rules={item.rules}
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
    let filed_rules = [[], [], [], [], []]
    const fields = genFields(_fields, disableEditFields, filed_rules, orderMapper)
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
                                               validation_rules={item.rules}
                                />
                            </Descriptions.Item>
                        )
                    })
                }
            </Descriptions>
        </Modal>
    )
}

