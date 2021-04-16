import React, {Fragment} from "react";
import { useParams, useHistory } from "react-router-dom";
import { NewsSource } from "../model";
import { usePromise } from "./customHooks";
import { promiseNoData } from "../components";
import { DetailsView } from "../views";

function DetailsPresenter(props) {
    
    const {
        model
    } = props;

    const { newsID } = useParams();
    const [promise, setPromise] = React.useState(null);

    React.useEffect(()=> {
        setPromise(NewsSource.getNewsById(newsID));
    }, []);

    const [data, setData, error, setError] = usePromise(promise);

    const browserHistory = useHistory();
    function redirectToSearchView() {
        browserHistory.goBack();
    }
    return (
        <Fragment>
            { promiseNoData(promise,data,error) || (
                <DetailsView
                    url={data[0]._source.url}
                    news_id={data[0]._source.news_id}
                    category={data[0]._source.category}
                    sub_category={data[0]._source.sub_category}
                    title={data[0]._source.title}
                    abstract={data[0]._source.abstract}
                    content={data[0]._source.body}
                    onClickReturn={redirectToSearchView}
                />
            )}
        </Fragment>
    );
}

export default DetailsPresenter;