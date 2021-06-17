import {Button, Form, Input, notification, Popover, Space} from "antd";
import {CheckOutlined, EditOutlined} from "@ant-design/icons";
import {useState} from "react";
import carSvc from "../services/car";
import userSvc from "../services/user";
import orderSvc from "../services/order";
import {carMapper, orderMapper, userMapper} from '../mapper/mapper'

export const EditableField = ({fieldFrom, fieldKey, originObject, value, disableEdit}) => {
    const [visible, setVisible] = useState(false);
    const [holdPopover, setHold] = useState(false)
    const [FieldValue, setFieldValue] = useState(value)
    //设置使用的服务模块
    let svc;
    let mapper;
    switch (fieldFrom) {
        case 'car':
            svc = carSvc
            mapper = carMapper
            break
        case 'user':
            svc = userSvc
            mapper = userMapper
            break
        case 'order':
            svc = orderSvc
            mapper = orderMapper
            break
        default:
            console.log('service case error')
    }
    const handleVisibleChange = visible => {
        if (!holdPopover) {
            setVisible(visible);
        }
    };
    //下面两个函数用于保持修改框不消失
    const handleHold = () => {
        setHold(true)
    }
    const handleNotHold = () => {
        setHold(false)
    }

    const onFinish = (values) => {
        const id = originObject.id
        let newValue = values.input
        let newObject = {}
        newObject[fieldKey] = newValue

        svc.update(id, newObject).then(
            () => {
                setFieldValue(newValue)
                setVisible(!visible)
                notification.open({
                    message: '修改成功',
                    description:
                        `"${mapper[fieldKey]}" 字段已经从 ${originObject[fieldKey]} 修改为 ${newValue}`,
                    icon: <CheckOutlined style={{color: 'green'}}/>,
                });
            }
        ).catch(
            reason => {
                console.log('update fail', reason)
            }
        )
    }
    const popover = () => (
        <Popover
            placement="bottom"
            visible={visible}
            trigger="click"
            destroyTooltipOnHide={true}
            onVisibleChange={handleVisibleChange}
            content={
                <Form
                    onFinish={onFinish}
                    initialValues={{'input': FieldValue}}>
                    <Form.Item
                        name='input'>
                        <Input onFocus={handleHold}
                               onBlur={handleNotHold}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary"
                                htmlType='submit'
                        >
                            修改
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Button onClick={() => setVisible(false)}>
                            取消
                        </Button>
                    </Form.Item>
                </Form>
            } title="修改字段">
            <EditOutlined onClick={() => setVisible(true)}/>
        </Popover>
    )
    return (
        <Space>
            {FieldValue}
            {disableEdit ? (<></>) : popover()}
        </Space>
    )
}