import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import {
    HomePresenter,
    SearchResultPresenter,
    DetailsPresenter,
    UserPresenter
} from "./presenters";

function App(props) {
    const {
        model
    } = props;

  return (
    <div className="App">
        
        <Router>
            <Switch>
                <Route path="/" exact>
                    <HomePresenter model={model} />
                    <UserPresenter model={model} />
                </Route>

                <Route path="/search/:query">
                    <SearchResultPresenter model={model} />
                    <UserPresenter model={model} />
                </Route>

                <Route path="/news/:newsID">
                    <DetailsPresenter model={model} />
                    <UserPresenter model={model} />
                </Route>
            </Switch>
        </Router>

    </div>
  );
}

export default App;
