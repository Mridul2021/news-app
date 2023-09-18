import React, { Component } from "react";
import NewsItem from "./NewsItem.js";
import Spinner from "./Spinner.js";
export default class News extends Component {
  constructor() {
    super();
    console.log("Hello");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
      nextdisabled: false,
    };
  }
  async componentDidMount() {
    this.setState({loading:true});
    // console.log("cdm");
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=de205ce587c141d784b52e6117c18d4c&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
        loading:false
    });
  }
  handleprevclick = async () => {
    this.setState({loading:true});
    console.log("next");
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=de205ce587c141d784b52e6117c18d4c&page=${this.state.page - 1}&pagesize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    // this.setState({loading:true});
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      nextdisabled: false,
      loading: false
    });
  };
  handlenextclick = async () => {
    this.setState({loading:true});
    var x = Math.ceil(this.state.totalResults / this.props.pageSize);
    if (this.state.page < x) {
      if (this.state.page + 1 >= x) 
      {
        this.setState({ nextdisabled: true });
      }
      console.log("Hello");
      console.log(x);
      console.log("next");
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=de205ce587c141d784b52e6117c18d4c&page=${
        this.state.page + 1
      }&pagesize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      // this.setState({articles:parsedData.articles});
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false
      });
    } else {
    }
  };
  render() {
    return (
      <div className="container my-3">
      <h1 className="text-center">Hello News</h1>
        <div className="row">
          {!this.state.loading&&this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                {/* key is used to itentify each element uniquely, otherwise it will ask in in console to give a unique key to each element */}
                <NewsItem
                  title={element.title ? element.title : ""}
                  description={element.description ? element.description : ""}
                  imageurl={
                    element.urlToImage
                      ? element.urlToImage
                      : "https://static.vecteezy.com/system/resources/previews/007/479/014/original/sticker-line-cut-news-paper-suitable-for-education-symbol-simple-design-editable-design-template-simple-symbol-illustration-vector.jpg"
                  }
                  newsurl={element.url}
                />
              </div>
            );
          })}
          {this.state.loading&&<Spinner/>}
          <div className="container d-flex justify-content-between">
            <button
              disabled={this.state.page <= 1}
              type="button"
              className="btn btn-dark"
              onClick={this.handleprevclick}>&larr; Previous</button>
            <button type="button" disabled={this.state.nextdisabled === true} className="btn btn-dark" onClick={this.handlenextclick}> Next &rarr;
            </button>
            {/* larr and rarr is used for left and right arrow */}
          </div>
        </div>
      </div>
    );
  }
}
