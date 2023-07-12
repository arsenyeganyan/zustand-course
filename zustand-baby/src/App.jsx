import "./App.css";
import Column from "./components/Column";

function App() {
  return (
    <div className="App">
      <Column state="planned"/>
      <Column state="ONGOING"/>
      <Column state="DONE"/>
    </div>
  )
}

export default App;