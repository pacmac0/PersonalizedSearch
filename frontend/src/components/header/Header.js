import {
    HeaderWrapper,
    Logo
} from "./style";

function Header(props) {
    const {
        onClickLogo 
    } = props;

    return (
        <HeaderWrapper>
            <Logo
                onClick={onClickLogo}
            >
            P-News
            </Logo>
        </HeaderWrapper>
    );
}

export default Header;