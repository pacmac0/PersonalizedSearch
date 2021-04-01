import React, { Component } from 'react';
import axios from 'axios';
import { CSSTransition } from 'react-transition-group';
import {
    SearchBox,
    SearchWrapper,
    ResultsWrapper,
    ResultWrapper,
    CiteWrapper,
    NewsTitle,
    NewsAbstract,
    NewsUrl
} from './style';

class Search extends Component {
    constructor() {
        super();
        this.state = {
            "results": [],
            "searchbar": "",
            focused: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getResults = this.getResults.bind(this);
        this.handleInputBlur = this.handleInputBlur.bind(this);
        this.handleInputFocus = this.handleInputFocus.bind(this);
    }

    handleChange(event) {
        this.setState({searchbar:event.target.value});
    }

    handleSubmit(event) {
        this.getResults();
        event.preventDefault();
    }

    handleInputFocus() {
        this.setState({focused: true});
    }

    handleInputBlur() {
        this.setState({focused: false});
    }

    getResults() {
        const query = {
            query: {
                bool: {
                    should: [
                        { match: { "abstract" : this.state.searchbar}},
                        { match: { "title" : this.state.searchbar}},
                        { match: { "category" : this.state.searchbar}},
                        { match: { "sub_category" : this.state.searchbar}},
                        { match: { "body" : this.state.searchbar}}
                    ]
                }
            }
        };
        axios.get("http://localhost:9200/news/_search?", {
            params: {
                source: JSON.stringify(query),
                source_content_type: 'application/json'
            }
        }).then((res)=> {
            console.log(res.data.hits.hits);
            this.setState({"results":res.data.hits.hits});
        })
    }

        
    
    render() {
        return (
            <div>
            <SearchWrapper> 
                <form onSubmit={this.handleSubmit}>
                    <CSSTransition
                        in = {this.state.focused}
                        timeout = {200}
                        classNames = 'slide'
                    >
                        <SearchBox 
                            className = {this.state.focused ? 'focused' : ''}
                            onFocus = {this.handleInputFocus}
                            onBlur = {this.handleInputBlur}
                            onChange = {this.handleChange}
                        />
                    </CSSTransition>
                </form>
                <i className={this.state.focused ? 'focused iconfont zoom' : 'iconfont zoom'}>&#xebde;</i>
            </SearchWrapper>
            <ResultsWrapper>
            {
                this.state.results.length !== 0?
                <div>
                {this.state.results.map((elem, index) => {
                    return (
                        <ResultWrapper key={index}>
                            <CiteWrapper>
                                <NewsUrl>{elem._source.url} {'>'} {elem._source.category} {'>'} {elem._source.sub_category}</NewsUrl>
                            </CiteWrapper>
                            
                            <NewsTitle><a href={elem._source.url}> {elem._source.title}</a></NewsTitle>
                            <NewsAbstract>{elem._source.abstract}</NewsAbstract>
                        </ResultWrapper>
                    )
                })}h
                </div>
                :
                <div></div>
            }
            </ResultsWrapper>
        </div>
        );
    }
}

export default Search;