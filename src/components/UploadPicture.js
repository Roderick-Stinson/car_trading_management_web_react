import {Button, Upload, message} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import {useState} from "react";
import Modal from "antd/es/modal/Modal";
import $http from "../services/http_util";

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export const UploadPicture = ({carId}) => {
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

    const handleUpload = () => {
        for (let i = 0; i < fileList.length; i++) {
            let formData = new FormData()
            formData.append('imgFile', fileList[i].originFileObj)
            formData.append('index', i)
            formData.append('extName', fileList[i].type.split('/')[1])
            formData.append('carId', carId)
            console.log(formData.get('imgFile'))
            $http.post('/api/picture/create', formData)
                .then(()=>{})
                .catch(err => {
                    console.log(err)})
        }
        setFileList([])
        message('上传成功')
    }
    return (
        <>
            <Upload
                action="/api/image/create"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                beforeUpload={() => false}

            >
                {fileList.length >= 6 ? null : uploadButton}
            </Upload>
            <Button type={'primary'} onClick={handleUpload}>上传图片</Button>
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