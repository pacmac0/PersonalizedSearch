import {RecommendationNewsBlockPresenter} from "../../presenters";
import {
    RecommendationWrapper
} from "./style";

function RecommendationView(props) {
    const {
        data
    } = props;
    return (
        <div className="Recommendation">
            <h3>Recommendations for Related News</h3>
                {
                    data.length !==0 ? 
                    <RecommendationWrapper>
                        {data.map((elem, index) => (
                                <RecommendationNewsBlockPresenter
                                    key={index}
                                    id={elem._id}
                                    title={elem._source.title}
                                    abstract={elem._source.abstract}
                                />
                            )
                        )}
                    </RecommendationWrapper>
                : ""}
            
        </div>
    );
}

export default RecommendationView;