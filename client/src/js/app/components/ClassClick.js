import React, { Component } from 'react';
import '../App.css';

class ClassClick extends Component {
    constructor(props){
        super(props)

        if(this.props.msg[0] === this.props.msg[4]){
            this.state = {
                viewpoint: this.props.msg[0],
                name: '',
                url: '',
                snippet: '',
                hide: 0, // 0=hide, 1=show
                btnLabel: this.props.msg[5],
                warningMsg: this.props.msg[6]
            }
        } else {
            this.state = {
                viewpoint: this.props.msg[0],
                name: this.props.msg[1],
                url: this.props.msg[2],
                snippet: this.props.msg[3],
                hide: 0, // 0=hide, 1=show
                btnLabel: this.props.msg[5],
                warningMsg: this.props.msg[6]
            }
        }
    }

    clickHandler() {
        if(this.state.hide === 1){
            this.setState({
                viewpoint: this.props.msg[0],
                name: '',
                url: '',
                snippet: '',
                hide: 0,
                btnLabel: this.props.msg[5],
                warningMsg: this.props.msg[6]
            });
        }else{
            this.setState({
                viewpoint: this.props.msg[0],
                name: this.props.msg[1],
                url: this.props.msg[2],
                snippet: this.props.msg[3],
                hide: 1,
                btnLabel: 'Mark',
                warningMsg: this.props.msg[6]
            });
        }
        
    }

    render() {
        // console.log('this.props.msg[0]: ' + this.props.msg[0]);
        // console.log('this.props.msg[1]: ' + this.props.msg[1]);
        // console.log('this.props.msg[2]: ' + this.props.msg[2]);
        // console.log('this.props.msg[3]: ' + this.props.msg[3]);
        // console.log('this.props.msg[4]: ' + this.props.msg[4]);
        // console.log('this.props.msg[5]: ' + this.props.msg[5]);

        // console.log('aaaaaaaaa: ' + this.props.msg[0].toString());
        // console.log('bbbbbbbbb: ' + this.props.msg[4].toString());
        // if(this.props.msg[0] === this.props.msg[4]){
        //     console.log('good');
        // } else {
        //     console.log('shit');
        // }

        if(this.props.msg[0] === this.props.msg[4]){
            return (
                <div class="preview">
                    <div class="inner">
                        <div style={{color: "red"}}>Caution!</div>
                        <div style={{color: "red"}}>{this.state.warningMsg}</div>
                        
                        <div class="inner01">{this.state.name}</div>
                        <div class="inner02">{this.state.url}</div>
                        <div class="inner03">{this.state.snippet}</div>
                        <button className='b01' onClick={this.clickHandler.bind(this)}>{this.state.btnLabel}</button>
                    </div>
                </div>
            )
        } else {
            return (
                <div class="preview">
                    <div class="inner">
                        <div class="inner01">{this.state.name}</div>
                        <div class="inner02">{this.state.url}</div>
                        <div class="inner03">{this.state.snippet}</div>
                    </div>
                </div>
            )
        }
    }
}

export default ClassClick