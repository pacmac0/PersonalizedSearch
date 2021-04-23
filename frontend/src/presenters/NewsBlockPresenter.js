import React from "react";
import { useHistory } from "react-router-dom";
import { NewsBlock } from "../components";
import { NewsSource } from "../model";

function NewsBlockPresenter(props) {
    const {
        id,
        url,
        title,
        category,
        sub_category,
        abstract,
        model
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
            onClickNews={(e)=>{redirectToNewsDetails(id); NewsSource.updateUser(model.getCurrentUser(),id);}}
        />
    );
}

export default NewsBlockPresenter;