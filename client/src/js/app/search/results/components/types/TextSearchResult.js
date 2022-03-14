import React, { Component } from 'react';

////
class TextSearchResult extends Component{
    constructor(props) {
        super(props);
        this.state = {
            result: props.result,
            name: "",
            source: "",
            text: "",
            btnLabel: 'I\'m aware of the risk of confirmation bias, show item.',
            warningMsg: 'This search result might reinforce your opinion, select another search result if you want to minimize the risk of confirmation bias.'
        };
    }

    ////
    render() {
        if(this.state.result.viewpoint==="-2"){
            return (<div class="preview">
                        <div style={{color: "red"}}>Caution!</div>
                        <div style={{color: "red"}}>{this.state.warningMsg}</div>
                        
                        <div class="inner01">{this.state.name}</div>
                        <div class="inner02">{this.state.source}</div>
                        <div class="inner03">{this.state.text}</div>
                        <button class='b01' onClick={()=>{
                            // console.log("0");
                            if(this.state.source===""){
                                // console.log("1");
                                this.state.name = this.state.result.name;
                                this.state.source = this.state.result.source;
                                this.state.text = this.state.result.text;
                            }else{
                                // console.log("2");
                                this.state.name = "";
                                this.state.source = "";
                                this.state.text = "";
                            }
                            this.forceUpdate();
                            // console.log(this.state);
                        }}>{this.state.btnLabel}</button>
                    </div>)
        }else{
            return (<div class="preview">
                        <div class="inner01">{this.state.result.name}</div>
                        <div class="inner02">{this.state.result.source}</div>
                        <div class="inner03">{this.state.result.text}</div>
                    </div>)
        }
    }
}

export default TextSearchResult;
