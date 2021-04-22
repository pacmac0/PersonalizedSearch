import React, {Component} from 'react';
import Search from '../../components/search';
import Header from '../../components/header';

class SearchResultView extends Component {

    render() {
        return(
            <div>
                <Header />
                <Search />
            </div>
        );
    }

}

export default SearchResultView;