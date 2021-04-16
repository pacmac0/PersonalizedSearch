import {Header} from "../components";
import {useHistory} from "react-router-dom";

function HeaderPresenter(props) {

    const browserHistory = useHistory();
    function redirectToHome() {
        browserHistory.push(`/`);
    }

    return (
        <Header onClickLogo={redirectToHome}/>
    );
}

export default HeaderPresenter;