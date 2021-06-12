import {Button, Col, Row} from "antd";
import Search from "antd/es/input/Search";

export const SearchBar = ({placeHolder}) => {
    return (
        <Row justify="end">
            <Col>
                <Search placeholder={placeHolder} style={{width: '200px', marginTop: "15px", marginLeft: "1000px"}}
                        allowClear enterButton/>
            </Col>
            <Col>
                <Button type="primary" style={{marginLeft: "30px"}}>
                    添加车辆
                </Button>
                <Button type="primary" style={{marginLeft: "30px"}}>
                    导出csv
                </Button>
            </Col>
        </Row>
    )
}
