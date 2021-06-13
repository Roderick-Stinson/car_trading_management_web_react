import {Button, Form, Input, Popover, Space} from "antd";
import {EditOutlined} from "@ant-design/icons";
import {useState} from "react";
import carSvc from "../services/car";
import userSvc from "../services/user";
import orderSvc from "../services/order";

export const EditableField = ({dataSource, fieldKey, originObject, value}) => {
    const [visible, setVisible] = useState(false);
    const [holdPopover, setHold] = useState(false)

    //设置使用的服务模块
    let svc;
    switch (dataSource) {
        case 'car':
            svc = carSvc
            break
        case 'user':
            svc = userSvc
            break
        case 'order':
            svc = orderSvc
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
        let originValue = value
        const id = originObject.id
        const key = fieldKey
        let newObject = {...originObject}
        let wholeField = originObject[key]
        let newValue = values['newValue']
        newObject[key] = wholeField.replace(originValue, newValue)
        console.log(newObject)

        svc.update(id, newObject).then(
            (updatedData) => {
                console.log(updatedData)
            }
        ).catch(
            reason => {
                console.log('update fail', reason)
            }
        )
    }
    return (
        <Space>
            {value}
            <Popover
                placement="bottom"
                visible={visible}
                trigger="click"
                destroyTooltipOnHide={true}
                onVisibleChange={handleVisibleChange}
                content={
                    <Form
                        onFinish={onFinish}
                        initialValues={{'newValue': value}}>
                        <Form.Item
                            name='newValue'>
                            <Input onFocus={handleHold}
                                   onBlur={handleNotHold}/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary"
                                    htmlType='submit'>
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
        </Space>
    )
}