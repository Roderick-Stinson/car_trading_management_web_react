import {Button, Input, Popover, Space} from "antd";
import {EditOutlined} from "@ant-design/icons";
import {useState} from "react";

export const EditableField = ({key, value}) => {
    const [visible, setVisible] = useState(false);
    return (
        <Space>
            {value}
            <Popover
                placement="bottom"
                visible={visible}
                trigger="click"
                content={
                    <Space>
                        <Input defaultValue={value}/>
                        <Space>
                            <Button
                                type="primary"
                                onClick={
                                    () => {
                                    }
                                }>
                                Confirm
                            </Button>
                            <Button onClick={() => setVisible(false)}>
                                取消
                            </Button>
                        </Space>
                    </Space>
                } title="修改字段">
                <EditOutlined/>
            </Popover>
        </Space>
    )
}