import './App.css';

function Search() {
  return (
    <div className="App">
      <header className="App-header">
      <form>
        <label>
          <input type="text" />
        </label>
        <input type="submit" value="Search news" />
      </form>
      </header>
    </div>
  );
}

export default Search;
