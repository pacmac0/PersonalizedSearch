import {
    StyledHomeWrapper,
    StyledHomeContainer,
    StyledTitleWrapper,
    StyledSearchWrapper,
    StyledSearchInputBox
} from "./style";
import {
    Search
} from "react-bootstrap-icons";

function HomeView(props) {

    const {
        model,
    } = props;

    return (
        <div className="HomeView">
            <StyledHomeWrapper>
                <StyledHomeContainer>
                    <StyledTitleWrapper>
                        Personalized News Search
                    </StyledTitleWrapper>
                    <StyledSearchWrapper>
                        <StyledSearchInputBox />
                        <Search />
                    </StyledSearchWrapper>
                </StyledHomeContainer>
            </StyledHomeWrapper>
        </div>
    );
};

export default HomeView;