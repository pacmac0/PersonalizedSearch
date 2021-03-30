import logo from './logo.svg';
import './App.css';
import SearchResultView from './pages/search';
import Home from './pages/home';
import { BrowserRouter, Route, Router } from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <Home/>
        <BrowserRouter>
            <Route path='/' exact component={Home} />
            <Route path='/search' exact component={SearchResultView} />
        </BrowserRouter>
    </div>
  );
}

export default App;
