import React, { Component } from 'react'
import {Button} from 'antd'

const withCopyRight=(WrappedComponent)=>{
    return class withCopy extends Component{
        render(){
            return (
                <div>
                    <WrappedComponent />
                    withCopy
                </div>
            )
        }
    } 
}

@withCopyRight
export default  class App extends Component {
    render() {
        return (
            <div>
                <Button type="primary">aaa</Button>
            </div>
        )
    }
}

