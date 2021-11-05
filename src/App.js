import Addfeature from "./components/AddFeature";
import Home from "./components/Home";
import Editfeature from "./components/EditFeature";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path= "/" component= {Home} />
          <Route path= "/create" component= {Addfeature} />
          <Route path= "/update/:id" component= {Editfeature} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
