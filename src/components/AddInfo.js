import Modal from "antd/es/modal/Modal";
import {DatePicker, Form, Input, Select} from "antd";
import {Option} from "antd/es/mentions";

import {UploadPicture} from "./UploadPicture"

export const AddUser = ({visible,handleOk, handleCancel}) => {

    const [form] = Form.useForm();
    return (
        <>
            <Modal
                visible={visible}
                title="添加用户"
                centered
                onCancel={handleCancel}
                onOk={() => {
                    form.validateFields()
                        .then(() => {
                            handleOk()
                        })
                }
                }
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="AddUser"
                >
                    <Form.Item
                        label={"用户名："}
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: '用户名不能为空',
                            },
                        ]}
                    >
                        <Input  placeholder="请输入用户名"/>
                    </Form.Item>
                    <Form.Item
                        label={"密码："}
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '密码不能为空',
                            },
                        ]}
                    >
                        <Input  placeholder="请输入密码"/>
                    </Form.Item>
                    <Form.Item
                        label={"手机号："}
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: '手机号不能为空',
                            },
                        ]}
                    >
                        <Input  placeholder="请输入手机号"/>
                    </Form.Item>
                </Form>

            </Modal>
        </>
    )
}

export const AddCar = ({visible,handleOk, handleCancel}) => {

    const [form] = Form.useForm();
    return (
        <>
            <Modal
                visible={visible}
                title="添加车辆"
                centered
                onCancel={handleCancel}
                onOk={() => {
                    form.validateFields()
                        .then(() => {
                            handleOk()
                        })
                }
                }
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="AddCar"
                >
                    <Form.Item
                        label={"车名："}
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: '车名不能为空',
                            },
                        ]}
                    >
                        <Input  placeholder="请输入车名"/>
                    </Form.Item>
                    <Form.Item
                        label={"报价："}
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: '报价不能为空',
                            },
                        ]}
                    >
                        <Input suffix="万"  />
                    </Form.Item>
                    <Form.Item
                        label={"品牌："}
                        name="brand"
                        rules={[
                            {
                                required: true,
                                message: '品牌不能为空',
                            },
                        ]}
                    >
                        <Input  placeholder="请输入车辆品牌"/>
                    </Form.Item>
                    <Form.Item
                        label={"上牌时间："}
                        name="regDate"
                    >
                        <DatePicker />
                    </Form.Item>
                    <Form.Item
                        label={"行驶里程："}
                        name="mileage"
                        rules={[
                            {
                                required: true,
                                message: '行驶里程不能为空',
                            },
                        ]}
                    >
                        <Input  placeholder="请输入车辆行驶里程"/>
                    </Form.Item>
                    <Form.Item
                        label={"变速箱："}
                        name="gearBox"
                    >
                        <Select defaultValue="自动" style={{ width: 120 }}>
                            <Option value="auto">自动</Option>
                            <Option value="manual">手动</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label={"请上传车辆图片："}
                    >
                        <UploadPicture></UploadPicture>
                    </Form.Item>

                </Form>

            </Modal>
        </>
    )
}