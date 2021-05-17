import { Switch, Route } from 'react-router';
import './App.css';
import Login from './pages/login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/home/Home';
import Movies from './pages/movies/Movies';
import NavbarTop from './components/navbar/Navbar';

function App() {
  return (
    <div className="App">
      <NavbarTop/>
     <Switch>
    <Route path={"/login"} component={Login}></Route>
    <Route path={"/movies"} component={Movies}></Route>
    <Route path={"/"} component={Home}></Route>
     </Switch>
    </div>
  );
}

export default App;
