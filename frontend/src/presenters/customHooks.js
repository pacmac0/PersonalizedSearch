import React from "react";

function useModelProperty(model, propertyName) {
    // custom hook
    const [value, setValue] = React.useState(model[propertyName]);
    React.useEffect(
        function () {
            function obs() {
                setValue(model[propertyName]);
            }
            model.addObserver(obs);
            return function () {
                model.removeObserver(obs);
            };
        },
        [model, propertyName]
    ); // though model never changes
    return value;
}
function usePromise(promise) {
    // custom hook
    const [data, setData] = React.useState(null);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        async function fetchData() {
            try {
                const promiseData = await promise;
                setData(promiseData);
            } catch (promiseError) {
                setError(promiseError);
            }
        }
        fetchData();
    }, [promise]);

    return [data, setData, error, setError];
}

export { useModelProperty,usePromise };