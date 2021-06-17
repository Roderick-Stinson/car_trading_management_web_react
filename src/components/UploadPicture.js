import {Upload} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import {useState} from "react";
import Modal from "antd/es/modal/Modal";

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export const UploadPicture = () => {
    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    const [previewTitle, setPreviewTitle] = useState('')
    const [fileList, setFileList] = useState([])

    const handleCancel = () => setPreviewVisible(false)

    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
    };

    const handleChange = ({fileList}) => {
        let updatedFileList = fileList
        setFileList(updatedFileList)
    };

    const uploadButton = (
        <div>
            <PlusOutlined/>
            <div style={{marginTop: 8}}>Upload</div>
        </div>
    );
    return (
        <>
            <Upload
                action="/api/image/create"
                listType="picture-card"
                fileList={fileList}
                data={
                    {
                        'index': 1,
                        'carId': 65536
                    }
                }
                onPreview={handlePreview}
                onChange={handleChange}
            >
                {fileList.length >= 6 ? null : uploadButton}
            </Upload>
            <Modal
                visible={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
            >
                <img alt="example" style={{width: '100%'}} src={previewImage}/>
            </Modal>
        </>
    );

};