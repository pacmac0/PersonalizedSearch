import React from "react";
import { useHistory } from "react-router-dom";
import { NewsBlock } from "../components";

function NewsBlockPresenter(props) {
    const {
        id,
        url,
        title,
        category,
        sub_category,
        abstract,
    } = props;

    const browserHistory = useHistory();

    function redirectToNewsDetails(newsID) {
        browserHistory.push(`/news/${newsID}`);
    }

    return (
        <NewsBlock 
            id={id}
            url={url}
            title={title}
            category={category}
            sub_category={sub_category}
            abstract={abstract}       
            onClickNews={(e)=>redirectToNewsDetails(id)}
        />
    );
}

export default NewsBlockPresenter;