import { HomeView } from "../views"

function HomePresenter(props) {

    const {
        model
    } = props;

    return (
        <div>
            <HomeView />
        </div>
    );
}

export default HomePresenter;