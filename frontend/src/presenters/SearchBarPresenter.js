import React from "react";
import { SearchBar } from "../components";
import { useHistory } from "react-router-dom";

function SearchBarPresenter(props) {

    const {inputPlaceholder} = props;
    const [input, setInput] = React.useState("");
    const [focus, setFocus] = React.useState(false);
    const browserHistory = useHistory();

    function redirectToSearchResults(searchQuery) {
        browserHistory.push(`/search/${searchQuery}`);
    }

    return (
        <div>
            <SearchBar 
                focus = {focus}
                inputPlaceholder={inputPlaceholder}
                onSearch={(e)=>redirectToSearchResults(input)}
                onChange={(e)=>{setInput(e.target.value)}}
                onFocus={(e)=>setFocus(true)}
                onBlur={(e)=>setFocus(false)}
            />
        </div>
    );
}

export default SearchBarPresenter;