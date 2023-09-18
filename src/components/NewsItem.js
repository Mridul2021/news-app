import React, { Component } from "react";

export default class NewsItem extends Component {
    // constructor(){
    //     super();
    //     console.log("Hello Constructor");
    // }
  render() {
    let { title, description,imageurl,newsurl } = this.props;
    return (
      <div className="my-3">
        <div className="card" style={{width: "18rem"}}>
        <img src={imageurl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <a rel="noreferrer" href={newsurl} target="_black" className="btn btn-sm btn-primary">
          {/* _blank is used to open the url in new tab */}
          {/* rel="noreferrer is just used to avoid the error" */}
            Read More
          </a>
        </div>
        </div>
      </div>
    );
  }
}
