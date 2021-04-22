import React, {Component} from 'react';
import { CSSTransition } from 'react-transition-group';
import {
    Logo,
    HomeContent,
    SearchBox,
    SearchWrapper
} from './style';
import Search from '../../components/search';

class Home extends Component { 
    
    constructor() {
        super();
        this.state = {
            focused: false
        }
        this.handleInputBlur = this.handleInputBlur.bind(this);
        this.handleInputFocus = this.handleInputFocus.bind(this);
    }

    handleInputFocus() {
        this.setState({focused: true});
    }

    handleInputBlur() {
        this.setState({focused: false});
    }

    render() {
        return (
            <HomeContent>
                <Logo>Personalized News Search</Logo>
                <Search />
            </HomeContent>
        );
        
    }
}

export default Home;