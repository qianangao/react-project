import React, { Component } from 'react';
import { Card, Upload } from 'antd'
import {connect} from 'react-redux'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import {changeAvatar} from '../../actions/user'
import './profile.less'

function getBase64(img, callback) {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
}
class Profile extends Component {
    state = {
        isLoading: false,
        imageUrl:''

    }

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ isLoading: true })
            return
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, imageUrl =>{
                this.setState({
                    imageUrl,
                    isLoading: false
                })
                this.props.changeAvatar(this.state.imageUrl)
            })
        
                
        
                
        }
    }
    render() {
        const uploadButton = (
            <div>
                {this.state.isLoading ? <LoadingOutlined /> : <PlusOutlined />}
                <div className="ant-upload-text">Upload</div>
            </div>
        )
        const { imageUrl } = this.state
        return (
            <Card title="个人设置">
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    onChange={this.handleChange}>
                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
            </Card>
        );
    }
}
const mapState=state=>({avatar:state.user.avatar})
export default connect(mapState,{changeAvatar})(Profile)