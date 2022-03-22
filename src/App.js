import { Component } from "react/cjs/react.production.min";
import logo from "./logo.svg";
import "./App.css";
import CardList from "./components/card-list/card-list-component";
import SearchBox from "./components/search-box/search-box-component"

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: "",
    };
    //console.log("constructor");
  }

  //get the list of users
  componentDidMount() {
   // console.log("ComponentDidMount");
    fetch("https://jsonplaceholder.typicode.com/users").then((response) =>
      response.json().then((users) =>
        this.setState(
          () => {
            return { monsters: users };
          },
          () => {
            console.log(this.state);
          }
        )
      )
    );
  }

  onSearchChange = (event) => {
    const searchField = event.target.value.toLocaleLowerCase();

    this.setState(() => {
      return { searchField };
    });
  };

  render() {
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;

   // console.log("render");
    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    return (
      <div className="App">
        <h1 className="app-title">Monsters Cards</h1>
       <SearchBox className="monsters-search-box"
       onChangeHandler={onSearchChange} placeholder='search monsters'/>
      
        <CardList monsters={filteredMonsters}/>
      </div>
    );
  }
}

export default App;
