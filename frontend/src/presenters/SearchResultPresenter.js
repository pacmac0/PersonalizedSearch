import React, {Fragment} from 'react';
import { useParams, useHistory } from "react-router-dom";
import { NewsSource } from "../model";
import { usePromise } from "./customHooks";
import { SearchResultView } from "../views";
import { promiseNoData } from "../components";
import SearchBarPresenter from './SearchBarPresenter';
import HeaderPresenter from "./HeaderPresenter";

function SearchResultPresenter(props) {

    const { model } = props;
    const { query } = useParams();
    const [promise, setPromise] = React.useState(null);

    React.useEffect(()=> {
        console.log(query);
        setPromise(NewsSource.getSearchedResults(query));
    }, []);

    const [data, setData, error, setError] = usePromise(promise);

    return (
        <Fragment>
        <HeaderPresenter />
        <SearchBarPresenter inputPlaceholder={query}/>
        { promiseNoData(promise,data,error) || (
            <SearchResultView 
                data={data}
            />
        )}
        </Fragment>
    );
};

export default SearchResultPresenter;