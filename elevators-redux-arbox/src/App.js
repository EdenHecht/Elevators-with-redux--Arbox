import "./App.css";
import { Provider } from "react-redux";
import Building from "./components/building/Building";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Building />
      </div>
    </Provider>
  );
}

export default App;
