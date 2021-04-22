import React, {Fragment} from "react";
import { useParams, useHistory } from "react-router-dom";
import { NewsSource } from "../model";
import { usePromise } from "./customHooks";
import { promiseNoData } from "../components";
import { DetailsView } from "../views";
import RecommendationPresenter from "./RecommendationPresenter";

function DetailsPresenter(props) {
    
    const {
        model
    } = props;

    const { newsID } = useParams();
    const [promise, setPromise] = React.useState(null);
    const [promise2, setPromise2] = React.useState(null);

    React.useEffect(()=> {
        setPromise(NewsSource.getNewsById(newsID));
    }, []);

    React.useEffect(()=> {
        setPromise2(NewsSource.getRecommendation(newsID));
    }, []);

    const [data, setData, error, setError] = usePromise(promise);
    const [data2, setData2, error2, setError2] = usePromise(promise2);

    const browserHistory = useHistory();
    function redirectToSearchView() {
        browserHistory.goBack();
    }
    return (
        <Fragment>
            { promiseNoData(promise,data,error) || (
                <DetailsView
                    url={data._source.url}
                    news_id={data._source.news_id}
                    category={data._source.category}
                    sub_category={data._source.sub_category}
                    title={data._source.title}
                    abstract={data._source.abstract}
                    content={data._source.body}
                    onClickReturn={redirectToSearchView}
                />
            )}
            { promiseNoData(promise2,data2,error2) || (
                <RecommendationPresenter
                    data = {data2}
                />
            )}
        </Fragment>
    );
}

export default DetailsPresenter;