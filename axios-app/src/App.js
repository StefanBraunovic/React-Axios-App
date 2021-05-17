import { Switch, Route } from 'react-router';
import './App.css';
import Login from './pages/login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/home/Home';
import Movies from './pages/movies/Movies';
import NavbarTop from './components/navbar/Navbar';
import MovieEdit from './pages/movies/MovieEdit';
import Books from './pages/books/Books';
import BookEdit from './pages/books/BookEdit';

function App() {
	return (
		<div className="App">
			<NavbarTop />
			<Switch>
				<Route path={'/login'} component={Login}></Route>
				<Route path={'/movies/:id'} component={MovieEdit}></Route>
				<Route path={'/movies'} component={Movies}></Route>
				<Route path={'/books/:id'} component={BookEdit}></Route>
				<Route path={'/books'} component={Books}></Route>
				<Route path={'/'} exact component={Home}></Route>
			</Switch>
		</div>
	);
}

export default App;
