import Modal from "antd/es/modal/Modal";
import {Descriptions, Form, Input} from "antd";


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