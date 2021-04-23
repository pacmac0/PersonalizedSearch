import React, {Fragment} from 'react';
import { useParams, useHistory } from "react-router-dom";
import { NewsSource } from "../model";
import { usePromise } from "./customHooks";
import { SearchResultView } from "../views";
import { promiseNoData, User } from "../components";
import SearchBarPresenter from './SearchBarPresenter';
import HeaderPresenter from "./HeaderPresenter";
import UserPresenter from './UserPresenter';

function SearchResultPresenter(props) {

    const { model } = props;
    const currentUser = model.getCurrentUser();
    console.log(currentUser);
    const { query } = useParams();
    const [promise, setPromise] = React.useState(null);

    React.useEffect(()=> {
        console.log(query);
        //console.log(currentUser==="No");
        //setPromise(NewsSource.getSearchedResults(query));
        if (currentUser==="No") {
            setPromise(NewsSource.getSearchedResults(query));
        } else {
            setPromise(NewsSource.personalizedSearch(currentUser,query));
        }
    }, []);

    const [data, setData, error, setError] = usePromise(promise);

    return (
        <Fragment>
        <HeaderPresenter />
        <UserPresenter model={model}/>
        <SearchBarPresenter inputPlaceholder={query}/>
        { promiseNoData(promise,data,error) || (
            <SearchResultView 
                data={data}
                model={model}
            />
        )}
        </Fragment>
    );
};

export default SearchResultPresenter;