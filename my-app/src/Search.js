import './App.css';
import React from 'react';
const axios = require('axios').default;


class Search extends React.Component {

  constructor(){
    super()
    this.state = {
      "results": [] ,
      "searchbar": "",
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getResults = this.getResults.bind(this);
  }

  handleSubmit(event) {
    this.getResults();
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({searchbar: event.target.value});
  }

  getResults(){
    const query = {
      query: {
        match: {
          "Category": this.state.searchbar
        }
      }
    };
    
    axios.get('http://localhost:9200/bank/_search', {
      params: {
        source: JSON.stringify(query),
        source_content_type: 'application/json'
      }
      }).then((res) => {
        console.log(res.data.hits.hits);
        this.setState({"results":res.data.hits.hits});
      });
  }

  render() {
    return (
      <div className="App">
      <header className="App-header">
      <form onSubmit={this.handleSubmit}>
        <label>
          <input type="text" onChange={this.handleChange}/>
        </label>
        <input type="submit" value="Search news"/>
      </form>
      {
        this.state.results.length !== 0?
        <div>
        {this.state.results.map((elem, index) => {
          return <a href={elem._source.URL}> {elem._source.Title}</a>
        })}
        </div>
        :
        <div></div>
      }
      </header>
    </div>
    );
  }
}


export default Search;
