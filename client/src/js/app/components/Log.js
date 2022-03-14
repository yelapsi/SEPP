import React from "react";

export default class Log extends React.Component{
    constructor(props){
        super();
    };

    render(){
        const {focus, lose_focuse, change, submission, mouse_click, mouse_movements} = this.props;

        return (
            <li>
                <span>{focus}</span>
            </li>
        );
    }
}