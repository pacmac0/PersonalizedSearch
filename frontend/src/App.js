import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import {
    HomePresenter,
    SearchResultPresenter,
    DetailsPresenter
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
                </Route>

                <Route path="/search/:query">
                    <SearchResultPresenter model={model} />
                </Route>

                <Route path="/news/:newsID">
                    <DetailsPresenter model={model} />
                </Route>
            </Switch>
        </Router>

    </div>
  );
}

export default App;
