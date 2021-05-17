import { Switch, Route } from 'react-router';
import './App.css';
import Login from './pages/login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/home/Home';

function App() {
  return (
    <div className="App">
     <Switch>
    <Route path={"/login"} component={Login}></Route>
    <Route path={"/"} component={Home}></Route>
     </Switch>
    </div>
  );
}

export default App;
