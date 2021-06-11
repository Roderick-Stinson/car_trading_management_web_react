import {Button, Input, Popover, Space} from "antd";
import {EditOutlined} from "@ant-design/icons";

export const EditableField = ({field}) => {
    return (
        <Space>
            {field}
            <Popover
                trigger="click"
                content={
                    <Space>
                        <Input/>
                        <Button
                            type="primary"
                            onClick={
                                ()=>{
                                    console.log('todo')
                                }
                            }>
                            Confirm
                        </Button>
                    </Space>
                } title="修改字段">
                <EditOutlined/>
            </Popover>
        </Space>
    )
}