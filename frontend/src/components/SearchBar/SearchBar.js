import React from 'react';
import { CSSTransition } from 'react-transition-group';
import {
    SearchBox,
    SearchWrapper,
    StyledSearchIconWrapper
} from './style';
import {
    Search
} from "react-bootstrap-icons";

function SearchBar(props) {
    const {
        inputPlaceholder,
        focus,
        onSearch,
        onChange,
        onFocus,
        onBlur
    } = props;

    return(
        <div className="SearchBar">
            <SearchWrapper> 
                <form onSubmit={onSearch}>
                    <CSSTransition
                        in = {focus}
                        timeout = {200}
                        classNames = 'slide'
                    >
                        <SearchBox 
                            className = {focus ? "focused" : ''}
                            onFocus = {onFocus}
                            onBlur = {onBlur}
                            onChange = {onChange}
                        />
                    </CSSTransition>
                </form>
                <Search className={focus ? 'focused zoom' : 'zoom'} />
            </SearchWrapper>
        </div>
    );
};

export default SearchBar;

