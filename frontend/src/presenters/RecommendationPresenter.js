import {RecommendationView} from "../views";

function RecommendationPresenter(props) {
    const data = props;

    return (
        <RecommendationView
            data={data.data}
        />
    );
}

export default RecommendationPresenter;