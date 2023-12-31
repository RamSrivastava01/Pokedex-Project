import { Link } from "react-router-dom";
import "./App.css";
import CustomRoutes from "./Routes/CustomRoutes";
import Pokedex from "./components/Pokedex/Pokedex";

function App() {
  return (
    <div className="">
      <h1 className="pokedex-heading">
        <Link to="/"> Pokedex</Link>
      </h1>
      <CustomRoutes />
    </div>
  );
}

export default App;
