import React, { Component } from 'react'
import {Card,Col,Row} from 'antd'
import echarts from 'echarts'
import './index.less'
import {
    getArticleAmount
} from '../../services'

export default class Dashboard extends Component {
    constructor(props){
        super(props)
        this.myRef=React.createRef()
    }
    getEcharts=()=>{
        getArticleAmount().then(res=>{
            const option = {
                tooltip: {},
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: res.data.amount.map(item => item.month)
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: res.data.amount.map(item => item.mount),
                    type: 'line',
                    areaStyle: {} 
                }]
            };
        // 使用刚指定的配置项和数据显示图表。
        this.myChart.setOption(option);
                     })
    }
    componentDidMount() {
        this.myChart = echarts.init(this.myRef.current);
        this.getEcharts()

        
    }
    
    render() {
        return (
            <>
            <Card title="概览">
                <Row gutter={16}>
                    <Col className="gutter-row" span={6}>
                        <div className="gutter-box" style={{backgroundColor:'skyblue'}}>col-6</div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div className="gutter-box" style={{backgroundColor:'pink'}}>col-6</div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div className="gutter-box" style={{backgroundColor:'#ffddcc'}}>col-6</div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div className="gutter-box" style={{backgroundColor:'#aadd00'}}>col-6</div>
                    </Col>
                </Row>
            </Card>
             <Card title="文章阅读量展示">
                 <div ref={this.myRef} style={{height:'500px'}}></div>
             </Card>
            </>
        )
    }
}
