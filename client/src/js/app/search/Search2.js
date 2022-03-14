import './Search.pcss';
import React from 'react';

import {log} from '../../utils/Logger';
import {LoggerEventTypes} from '../../utils/LoggerEventTypes';
import PropTypes from "prop-types";
import SearchHeaderContainer from './header/SearchHeaderContainer';
import SearchResultsContainer from "./results/SearchResultsContainer";
import QueryHistoryContainer from "./features/queryhistory/QueryHistoryContainer";
import BookmarkContainer from "./features/bookmark/BookmarkContainer";
import NotepadContainer from "./features/notepad/NotepadContainer";
import Chat from "./features/chat/Chat";
import config from "../../config";
import LoginStore from "../../stores/LoginStore";
import "../static/logui.bundle.js"
import "../static/driver.js"


class Search2 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isManager: LoginStore.getAuth(),
        };

        this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    }

    componentDidMount() {
        document.addEventListener('visibilitychange', this.handleVisibilityChange);
    }

    // componentWillUnmount() {
    //     if (this.props.lastSession && config.interface.chat && this.props.collaborative) {
    //         const messages = document.querySelector(".chat-content").innerHTML;
    //         log(LoggerEventTypes.CHAT_ARCHIVE, {
    //             messages: messages
    //         });

    //         const element = document.querySelector("#conversejs");
    //         element.parentElement.removeChild(element);
    //     };
    //     document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    // }

    componentWillMount(){
        LoginStore.on("change", () => {
            this.setState({
                isManager: LoginStore.isManager,
            });
        })
    }

    render() {
        return (
            <div className="Search">
                <SearchHeaderContainer timer={this.props.timer} statusbar={this.props.statusbar} showAccountInfo={this.props.showAccountInfo} isManager={this.state.isManager}/>

                <div className="Content">
                    <div className="Main">
                        <div className="SearchResultsContainer">
                            <SearchResultsContainer/>
                        </div>
                    </div>

                    <div className="Side">
                        <QueryHistoryContainer collaborative={this.props.collaborative}/>
                        <BookmarkContainer collaborative={this.props.collaborative}/>
                    </div>
                    {config.interface.notepad && (                    
                    <div>
                        <NotepadContainer collaborative={this.props.collaborative} />
                    </div>
                    ) }

                    {this.props.taskDescription && (
                        <div className="Side">
                            {this.props.taskDescription}
                        </div>
                    )}
                </div>
                <div className="text-center">
                    <p className="Footer">
                        About <a href="/about" target="_blank">SearchX2</a>.
                    </p>
                </div>

            <script src="http://localhost:8080/home/yan/Desktop/RA/searchx-frontend/src/js/app/static/logui.bundle.js"></script>
            <script src="../static/driver.js"></script>
            </div>
        )
    }
    
    handleVisibilityChange() {
        if (document.hidden) {
        
            
            this.props.onSwitchPage();
        }
    }
}
Search2.propTypes = {
    onSwitchPage: PropTypes.func
};


Search2.defaultProps = {
    collaborative: true,
    showAccountInfo: true,
    firstSession: true,
    lastSession: true,
    onSwitchPage: () => {},
};

export default Search2;