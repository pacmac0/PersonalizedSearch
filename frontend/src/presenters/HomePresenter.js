import React from "react";
import { HomeView } from "../views";
import { useHistory } from "react-router-dom";

function HomePresenter(props) {

    const {
        model
    } = props;
    const [input, setInput] = React.useState("");
    const [focus, setFocus] = React.useState(false);
    const browserHistory = useHistory();

    function redirectToSearchResults(searchQuery) {
        browserHistory.push(`/search/${searchQuery}`);
    }

    return (
        <div>
            <HomeView 
                focus = {focus}
                onSearch={(e)=>redirectToSearchResults(input)}
                onChange={(e)=>{setInput(e.target.value)}}
                onFocus={(e)=>setFocus(true)}
                onBlur={(e)=>setFocus(false)}
            />
        </div>
    );
}

export default HomePresenter;