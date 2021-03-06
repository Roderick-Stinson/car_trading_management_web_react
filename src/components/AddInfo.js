import Modal from "antd/es/modal/Modal";
import {DatePicker, Form, Input, Select, message} from "antd";
import {Option} from "antd/es/mentions";

import {UploadPicture} from "./UploadPicture"
import $http from "../services/http_util";
import {useEffect, useState} from "react";
import Text from "antd/es/typography/Text";

export const AddUser = ({visible, handleOk, handleCancel}) => {

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
                        <Input placeholder="请输入用户名"/>
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
                        <Input placeholder="请输入密码"/>
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
                        <Input placeholder="请输入手机号"/>
                    </Form.Item>
                </Form>

            </Modal>
        </>
    )
}

export const AddCar = ({visible, handleOk, handleCancel, carId}) => {
    const [form] = Form.useForm();

    const [predictPrice, setPredictPrice] = useState("");
    const onChange = function (value) {

        let originalPrice = form.getFieldValue("originalPrice")
        let regDate = form.getFieldValue("regDate")
        let mileage = form.getFieldValue("mileage")
        if (originalPrice !== undefined && regDate !== undefined && mileage !== undefined) {
            try {
                const req = $http.post('/api/car/predict', {
                        originalPrice: originalPrice,
                        mileage: mileage,
                        regDate: regDate._d
                    }
                );
                req.then(res => {
                    console.log("res", res)
                    setPredictPrice(res.data)
                    // console.log("predict", predictPrice)
                })
            } catch (e) {
                console.log(e)
            }
        }
    }
    const onFinish = (value) => {
        try {
            $http.patch('/api/car/' + carId, {
                'brand': value.brand,
                'mileage': parseInt(value.mileage),
                'name': value.name,
                'price': parseInt(value.price),
                'regDate': value.regDate._d,
            })
        } catch (e) {
            message.error('请输入数字')
        }
    }


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
                            form.submit()
                            handleOk()
                        })
                }
                }
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="AddCar"
                    onFinish={onFinish}
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
                        <Input placeholder="请输入车名"/>
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
                        <Input placeholder="请输入车辆品牌"/>
                    </Form.Item>
                    <Form.Item
                        label={"上牌时间："}
                        name="regDate"
                    >
                        <DatePicker onChange={onChange}/>
                    </Form.Item>
                    <Form.Item
                        label={"行驶里程："}
                        name="mileage"
                        rules={[
                            {
                                required: true,
                                message: '行驶里程不能为空且为正整数',
                                pattern: /^(0|[1-9][0-9]*)(\.\d+)?$/
                            },
                        ]}
                    >
                        <Input onChange={onChange} placeholder="请输入车辆行驶里程"/>
                    </Form.Item>
                    <Form.Item
                        label={"原价："}
                        name="originalPrice"
                        rules={[
                            {
                                required: true,
                                message: '报价不能为空且为数字',
                                pattern: /^(0|[1-9][0-9]*)(\.\d+)?$/
                            },
                        ]}
                    >
                        <Input onChange={onChange} suffix="万"/>
                    </Form.Item>

                    <Form.Item
                        label={"报价："}
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: '报价不能为空且为数字',
                                pattern: /^(0|[1-9][0-9]*)(\.\d+)?$/
                            },
                        ]}
                    >
                        <Input suffix="万"/>
                        <Text style={{color: "green"}}
                              id="hello">{predictPrice ? "建议报价" + predictPrice.toFixed(2) + "万" : ""}</Text>
                    </Form.Item>
                    <Form.Item
                        label={"请上传车辆图片："}
                    >
                        <UploadPicture carId={carId === undefined ? null : carId}></UploadPicture>
                    </Form.Item>

                </Form>

            </Modal>
        </>
    )
}

export const AddOrder = ({visible, handleOk, handleCancel}) => {

    const [form] = Form.useForm();
    return (
        <>
            <Modal
                visible={visible}
                title="添加订单"
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
                        label={"车辆ID："}
                        name="id"
                        rules={[
                            {
                                required: true,
                                message: '车辆ID不能为空',
                            },
                        ]}
                    >
                        <Input placeholder="请输入车辆ID"/>
                    </Form.Item>
                    <Form.Item
                        label={"买家："}
                        name="buyUser"
                        rules={[
                            {
                                required: true,
                                message: '买家不能为空',
                            },
                        ]}
                    >
                        <Input placeholder="请输入买家名称"/>
                    </Form.Item>
                    <Form.Item
                        label={"买家报价："}
                        name="quote"
                        rules={[
                            {
                                required: true,
                                message: '买家报价不能为空',
                            },
                        ]}
                    >
                        <Input placeholder="请输入买家报价"/>
                    </Form.Item>
                    <Form.Item
                        label={"成交价："}
                        name="finalPrice"
                    >
                        <Input placeholder="请输入成交价"/>
                    </Form.Item>
                    <Form.Item
                        label={"状态："}
                        name="state"
                    >
                        <Select defaultValue="交易中" style={{width: 120}}>
                            <Option value="doing">交易中</Option>
                            <Option value="done">已完成</Option>
                        </Select>
                    </Form.Item>
                </Form>

            </Modal>
        </>
    )
}