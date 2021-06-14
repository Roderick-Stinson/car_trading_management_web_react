import {Upload} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import {useEffect, useState} from "react";

// function getBase64(file) {
//     return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = () => resolve(reader.result);
//         reader.onerror = error => reject(error);
//     });
// }

export const UploadPicture = () => {

    // const [previewVisible, setPreviewVisible] = useState(false)
    // const [previewImage, setPreviewImage] = useState('')
    // const [previewTitle, setPreviewTitle] = useState('')
    const [fileList, setFileList] = useState([])

    // setPreviewVisible(true)

    // setPreviewImage(file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    //
    // setPreviewTitle()

    let testFileList = [
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
            uid: '-2',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
            uid: '-3',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
            uid: '-4',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
            uid: '-xxx',
            percent: 50,
            name: 'image.png',
            status: 'uploading',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
            uid: '-5',
            name: 'image.png',
            status: 'error',
        },
    ]

    useEffect(() => {
        setFileList(testFileList)
    }, [])


    // state = {
    //     previewVisible: false,
    //     previewImage: '',
    //     previewTitle: '',
    //     fileList: [
    //         {
    //             uid: '-1',
    //             name: 'image.png',
    //             status: 'done',
    //             url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    //         },
    //         {
    //             uid: '-2',
    //             name: 'image.png',
    //             status: 'done',
    //             url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    //         },
    //         {
    //             uid: '-3',
    //             name: 'image.png',
    //             status: 'done',
    //             url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    //         },
    //         {
    //             uid: '-4',
    //             name: 'image.png',
    //             status: 'done',
    //             url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    //         },
    //         {
    //             uid: '-xxx',
    //             percent: 50,
    //             name: 'image.png',
    //             status: 'uploading',
    //             url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    //         },
    //         {
    //             uid: '-5',
    //             name: 'image.png',
    //             status: 'error',
    //         },
    //     ],
    // };

    // const handleCancel = () => this.setState({previewVisible: false});

    // const handlePreview = async file => {
    //     if (!file.url && !file.preview) {
    //         file.preview = await getBase64(file.originFileObj);
    //     }
    //
    //     this.setState({
    //         previewImage: file.url || file.preview,
    //         previewVisible: true,
    //         previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    //     });
    // };

    const handleChange = (

        // console.log('onchange')
        {fileList}) => setFileList({fileList}

    );

    const uploadButton = (
        <div>
            <PlusOutlined/>
            <div style={{marginTop: 8}}>Upload</div>
        </div>
    );
    return (
        <>
            <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={testFileList}
                // onPreview={this.handlePreview}
                onChange={handleChange}
            >
                {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            {/*<Modal*/}
            {/*    visible={previewVisible}*/}
            {/*    title={previewTitle}*/}
            {/*    footer={null}*/}
            {/*    onCancel={this.handleCancel}*/}
            {/*>*/}
            {/*    <img alt="example" style={{width: '100%'}} src={previewImage}/>*/}
            {/*</Modal>*/}
        </>
    );

}
//
// ReactDOM.render(<PicturesWall/>, mountNode);