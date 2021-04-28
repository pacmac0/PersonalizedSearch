import React, {Fragment} from "react";
import { NewsSource } from "../model";
import { usePromise } from "./customHooks";
import { promiseNoData } from "../components";
import {History} from "../components";
import {useModelProperty} from "../model";

function HistoryPresenter(props) {
    const { model } = props;
    const currentUser = useModelProperty(model,"currentUser");
    const [promise, setPromise] = React.useState(null);

    React.useEffect(()=>{
        setPromise(NewsSource.gethistory(currentUser));
    }, []);
    const [data, setData, error, setError] = usePromise(promise);

    return (
        <Fragment>
            { promiseNoData(promise,data,error) || (
                <History 
                    currentUser={currentUser}
                    data={data}
                />
            )}
        </Fragment>
    );
}

export default HistoryPresenter;