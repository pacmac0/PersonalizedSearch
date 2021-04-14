import {
    StyledDetailsView,
    ContentWrapper,
    RecommendationWrapper,
    StyledNewsTitle,
    StyledContent,
    StyledReturnWrapper,
} from "./style";
import {
    ArrowLeftCircle
} from "react-bootstrap-icons";

function DetailsView(props) {

    const {
        url,
        news_id,
        category,
        sub_category,
        title,
        abstract,
        content,
        onClickReturn
    } = props;
    return (
        <div className="DetailsView">
            <StyledDetailsView>
                <StyledReturnWrapper
                    onClick={onClickReturn}
                >
                    <ArrowLeftCircle />
                </StyledReturnWrapper>
                <ContentWrapper>
                    <StyledNewsTitle>
                        {title}
                    </StyledNewsTitle>
                    <StyledContent>
                        {content}
                    </StyledContent>
                </ContentWrapper>
                <RecommendationWrapper>

                </RecommendationWrapper>
            </StyledDetailsView>
        </div>
    );
}

export default DetailsView;