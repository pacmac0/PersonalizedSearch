import {
    StyledHomeWrapper,
    StyledHomeContainer,
    StyledTitleWrapper,
    StyledSearchWrapper,
    StyledSearchInputBox
} from "./style";
import { Search } from "react-bootstrap-icons";
import { CSSTransition } from 'react-transition-group';

function HomeView(props) {

    const {
        focus,
        onSearch,
        onChange,
        onFocus,
        onBlur
    } = props;

    return (
        <div className="HomeView">
            <StyledHomeWrapper>
                <StyledHomeContainer>
                    <StyledTitleWrapper>
                        Personalized News Search
                    </StyledTitleWrapper>
                    
                    <StyledSearchWrapper>
                        <form onSubmit={onSearch}>
                            <CSSTransition
                                in = {focus}
                                timeout = {200}
                                classNames = 'slide'
                            >
                                <StyledSearchInputBox 
                                    className = {focus ? "focused" : ''}
                                    onFocus = {onFocus}
                                    onBlur = {onBlur}
                                    onChange = {onChange}
                                />
                            </CSSTransition>
                        </form>
                        <Search />
                    </StyledSearchWrapper>
                </StyledHomeContainer>
            </StyledHomeWrapper>
        </div>
    );
};

export default HomeView;