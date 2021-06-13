import {Button, Input, Popover, Space} from "antd";
import {EditOutlined} from "@ant-design/icons";
import {useState} from "react";

export const EditableField = ({key, value}) => {
    const [visible, setVisible] = useState(false);
    const [holdPopover, setHold] = useState(false)
    const handleVisibleChange = visible => {
        console.log(holdPopover)
        if (!holdPopover) {
            setVisible(visible);
        }
    };
    const handleHold = () => {
        setHold(true)
    }
    const handleNotHole = () => {
        setHold(false)
    }
    return (
        <Space>
            {value}
            <Popover
                placement="bottom"
                visible={visible}
                trigger="click"
                onVisibleChange={handleVisibleChange}
                content={
                    <Space>
                        <Input defaultValue={value}
                               onFocus={handleHold}
                               onBlur={handleNotHole}/>
                        <Space>
                            <Button
                                type="primary"
                                onClick={
                                    () => {
                                    }
                                }>
                                修改
                            </Button>
                            <Button onClick={() => setVisible(false)}>
                                取消
                            </Button>
                        </Space>
                    </Space>
                } title="修改字段">
                <EditOutlined onClick={() => setVisible(true)}/>
            </Popover>
        </Space>
    )
}