import { EventEmitter } from "events";
import request from "superagent";
import AccountStore from "./AccountStore";
const CHANGE_EVENT = 'change';
const CHANGE_EVENT_N = 'change_n';

class LoguiDataStore extends EventEmitter {
    constructor(){
        super();
        this.loguiData = [];
        this.totalNumber = 0;
        this.resultsPerPage = 0;
    }

    getData(offset, topN){
        let url = process.env.REACT_APP_SERVER_URL + '/v1/logui/text/'
            + '?userId=' + AccountStore.getUserId()
            + '&sessionId=' + AccountStore.getSessionId()
            + '&offset=' + offset
            + '&topN=' + topN;
        console.log('url: ' + url);
        request.get(url)
        .end((err, res) => {
            if (err || !res.body || res.body.error) {
                this.loguiData = [];
                this.totalNumber = 0;
                // console.log('1 loguiData: ' + res.body.results);
            } else {
                this.loguiData = JSON.parse(res.body.results);
                this.totalNumber = JSON.parse(res.body.totalNumber);
                console.log('this.totalNumber: ' + this.totalNumber);
            }

            this.emit(CHANGE_EVENT, this.totalNumber);
        });
    }

    getResultsPerPage(){
        let url = process.env.REACT_APP_SERVER_URL + '/v1/logui/text/'
            + '?userId=' + AccountStore.getUserId()
            + '&sessionId=' + AccountStore.getSessionId();
        console.log('url: ' + url);
        request.get(url)
        .end((err, res) => {
            if (err || !res.body || res.body.error) {
                this.resultsPerPage = 10;
            } else {
                this.resultsPerPage = JSON.parse(res.body.result);
                console.log('this.resultsPerPage: ' + this.resultsPerPage);
            }

            this.emit(CHANGE_EVENT_N, this.resultsPerPage);
        });
    }

    setResultsPerPage(n){
        let url = process.env.REACT_APP_SERVER_URL + '/v1/logui/text/'
            + '?userId=' + AccountStore.getUserId()
            + '&sessionId=' + AccountStore.getSessionId()
            + '&n=' + n;
        console.log('url: ' + url);
        request.get(url)
        .end((err, res) => {
            if (err || !res.body || res.body.error) {
                this.resultsPerPage = 10;
            } else {
                this.resultsPerPage = JSON.parse(res.body.result);
                console.log('this.resultsPerPage: ' + this.resultsPerPage);
            }

            this.emit(CHANGE_EVENT_N, this.resultsPerPage);
        });
    }
}

const loguiDataStore = new LoguiDataStore();
export default loguiDataStore;