import React from "react";
import {RecommendationNewsBlock} from "../components";
import { useHistory } from "react-router-dom";

function RecommendationNewsBlockPresenter(props) {

    const {
        id,
        title,
        abstract
    } = props;
    const browserHistory = useHistory();

    function redirectToNewsDetails(newsID) {
        browserHistory.push(`/news/${newsID}`);
    }
    
    return  (
        <RecommendationNewsBlock
            id={id}
            title={title}
            abstract={abstract}       
            onClick={(e)=>{window.location.reload(); redirectToNewsDetails(id);}}
        />
    );

}

export default RecommendationNewsBlockPresenter;