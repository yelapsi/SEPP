import React from 'react';
import Pagination from './Pagination';
import Posts from './Posts';
import LoguiDataStore from '../../stores/LoguiDataStore';

export default class LoguiData extends React.Component{
  constructor(){
    super();

    this.state = {
      posts: [],
      loading: false,
      currentPage: 1,
      postsPerPage: 10,
      indexOfLastPost: 0,
      indexOfFirstPost: 0,
      currentPosts: null,
      paginate: null,
    }

    this.init();
  }
  
  init(){
    this.state.indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
    this.state.indexOfFirstPost = this.state.indexOfLastPost - this.state.postsPerPage;
    this.state.currentPosts = this.state.posts.slice(this.state.indexOfFirstPost, this.state.indexOfLastPost);
    this.state.paginate = (pageNumber) => {
      this.state.currentPage = pageNumber;
      let x = (pageNumber-1)*this.state.postsPerPage;
      this.state.currentPosts = LoguiDataStore.getData(x, this.state.postsPerPage);
    };
    this.state.currentPosts = LoguiDataStore.getData(0, this.state.postsPerPage);
  }

  componentWillMount(){
    LoguiDataStore.on("change", (totalNumber) => {
        this.setState({
          posts: LoguiDataStore.loguiData,
        })

        this.setState({
          indexOfLastPost: this.state.currentPage * this.state.postsPerPage,
          indexOfFirstPost: this.state.indexOfLastPost - this.state.postsPerPage,
          currentPosts: JSON.parse(JSON.stringify(this.state.posts)),
        })

        this.setState({
          totalNumber: totalNumber,
        })

        this.render();
    })

    LoguiDataStore.on("change_n", (resultsPerPage) => {
      this.setState({
        postsPerPage: resultsPerPage,
      })

      this.render();
    })
  }

  pageNumber(){
    let select = document.getElementById('resultsPerPage');
    let value = select.options[select.selectedIndex].value;

    this.state.postsPerPage = value;

    LoguiDataStore.getData(this.state.currentPage-1, this.state.postsPerPage);
    select.value = value;
    console.log("pageNum: " + this.state.postsPerPage);
  }

  render(){
    
    if(this.state.currentPosts){
      return (
        <div>
          <div class="content">
            <h1>LogUI data view</h1>
            <Posts posts={this.state.currentPosts} loading={this.state.loading} config={this.state.config}/>
            <br/>
            <Pagination 
              postsPerPage={this.state.postsPerPage} 
              totalPosts={this.state.totalNumber}
              paginate={this.state.paginate}
              currentPage={this.state.currentPage}/>
            <br/>

            <p>Results per page:</p>
            <select name="resultsPerPage" id="resultsPerPage" onChange={this.pageNumber.bind(this)} value={this.state.postsPerPage}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>

          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h1>LogUI data view</h1>
          <p>Loading...</p>
        </div>
      );
    }
  }
}
