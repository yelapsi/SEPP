import React from 'react';
import VisibilitySensor from 'react-visibility-sensor';

import {log} from '../../../../../utils/Logger';
import {LoggerEventTypes} from '../../../../../utils/LoggerEventTypes';

////

const TextSearchResult = function ({
    searchState,
    serpId,
    index,
    result,
    metadata,
    bookmarkButton,
    excludeButton,
    urlClickHandler,
    hideCollapsedResultsHandler,
    isCollapsible,
    visited
}) {
    let state = {
        name: "",
        source: "",
        text: "",
        btnLabel: 'I\'m aware of the risk of confirmation bias, show item.',
        warningMsg: 'This search result might reinforce your opinion, select another search result if you want to minimize the risk of confirmation bias.'
    }

    let metaInfo = {
        url: result.id,
        index: index,
        query: searchState.query,
        page: searchState.page,
        serpId: serpId,
        session: localStorage.getItem("session-num") || 0,
    };

    let clickUrl = () => {

        var doctext = result.text.split('\n').map((item, key) => {
            return <span key={key}>{item}<br/></span>
        })

        doctext.unshift(<h4> {result.source} <br/></h4>);
        doctext.unshift(<h3> {result.name} <br/></h3>);

        urlClickHandler(result.id, doctext);
        log(LoggerEventTypes.SEARCHRESULT_CLICK_URL, metaInfo);
    };

    let viewUrl = (isVisible) => {
        metaInfo.isVisible = isVisible;
        log(LoggerEventTypes.SEARCHRESULT_VIEW_URL, metaInfo);
    };

    let contextUrl = () => {
        log(LoggerEventTypes.SEARCHRESULT_CONTEXT_URL, metaInfo);
    };

    let hoverEnterSummary = () => {
        log(LoggerEventTypes.SEARCHRESULT_HOVERENTER, metaInfo);
    };

    let hoverLeaveSummary = () => {
        log(LoggerEventTypes.SEARCHRESULT_HOVERLEAVE, metaInfo);
    };

    function createSnippet() {
        return {__html: result.snippet};
    }

    const hideCollapsedResults = function () {
        const collapseMetaInfo = {
            urls: [result.id],
            query: searchState.query,
            page: searchState.page,
            serpId: serpId,
        };
        log(LoggerEventTypes.SEARCHRESULT_HIDE_COLLAPSED, collapseMetaInfo);
        const id = result.id ? result.id : result.url;
        hideCollapsedResultsHandler([id]);
    };

    const toTitleCase = function(str) {
        return str.replace(
            /\w\S*/g,
            function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }

    if (result.name === result.name.toUpperCase()) {
        result.name = toTitleCase(result.name);
    }

    ////
    if(result.viewpoint=="-2"){
        return (<div class="preview">
                    <div style={{color: "red"}}>Caution!</div>
                    <div style={{color: "red"}}>{state.warningMsg}</div>
                    
                    <div class="inner01">{state.name}</div>
                    <div class="inner02">{state.source}</div>
                    <div class="inner03">{state.text}</div>
                    <button class='b01' onClick={()=>{
                        if(state.source==""){
                            state.name = result.name;
                            state.source = result.source;
                            state.text = result.text;
                        }else{
                            state.name = "";
                            state.source = "";
                            state.text = "";
                        }
                    }}>{state.btnLabel}</button>
                </div>)
    }else{
        return (<div class="preview">
                    <div class="inner01">{result.name}</div>
                    <div class="inner02">{result.source}</div>
                    <div class="inner03">{result.text}</div>
                </div>)
    }
};

export default TextSearchResult;
