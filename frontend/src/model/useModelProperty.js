import React from "react";
function useModelProperty(model, propertyName) {
    const [value, setValue] = React.useState(model[propertyName]);
    React.useEffect(function() {
      const obs = () => setValue(model[propertyName]);
      model.addObserver(obs);
      return () => {model.removeObserver(obs);}
    }, [model]);
    return value;
}
export default useModelProperty;