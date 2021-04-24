import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import Home from "./components/home/Home";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <p className="header">Elevator Exercise</p>

        <Home />
      </div>
    </Provider>
  );
}

export default App;
