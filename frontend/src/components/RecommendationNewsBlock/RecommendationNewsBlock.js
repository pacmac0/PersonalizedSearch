import {
    RecommendationWrapper,
    RecommendationTitleWrapper,
    RecommendationAbstractWrapper
} from "./style";

function RecommendationNewsBlock(props) {
    const {
        id,
        title,
        abstract,
        onClick
    } = props;
    return (
        <div className="Recommendation">
            <RecommendationWrapper>
                <RecommendationTitleWrapper
                    onClick={onClick}
                >
                    {title}
                </RecommendationTitleWrapper>
                <br/>
                <RecommendationAbstractWrapper>
                    {abstract}
                </RecommendationAbstractWrapper>
            </RecommendationWrapper>
        </div>
    );
}

export default RecommendationNewsBlock;