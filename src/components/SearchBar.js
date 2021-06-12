import {Button, Col, Row, Space} from "antd";
import Search from "antd/es/input/Search";

export const SearchBar = ({placeHolder, btnAddOnClick, btnAddStr}) => {
    let btnGroup;
    if (btnAddStr !== undefined) {
        btnGroup = (
            <Space>
                <Button type="primary" onClick={btnAddOnClick}>
                    {btnAddStr}
                </Button>
                <Button type="primary">
                    导出csv
                </Button>
            </Space>
        )
    } else {
        btnGroup = (
            <Button type="primary">
                导出csv
            </Button>
        )
    }
    return (
        <Row justify="end" gutter={[16, 16]}>
            <Col>
                <Search placeholder={placeHolder} style={{width: '200px', marginTop: "15px", marginLeft: "1000px"}}
                        allowClear enterButton/>
            </Col>
            <Col>
                {btnGroup}
            </Col>
        </Row>
    )
}
