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
import PersonEdit from './pages/persons/PersonEdit';
import Persons from './pages/persons/Persons';
import PrivateRoute from './privateRoute/PrivateRoute';

function App() {
	return (
		<div className="App">
			{/* <NavbarTop /> */}
			<Switch>
				<PrivateRoute path={'/login'} component={Login} />
				<PrivateRoute
					path={'/movies/:id'}
					exact
					component={MovieEdit}
					isPrivate
				/>
				<PrivateRoute path={'/movies'} exact component={Movies} isPrivate />
				<PrivateRoute
					path={'/books/:id'}
					exact
					component={BookEdit}
					isPrivate
				/>
				<PrivateRoute path={'/books'} exact component={Books} isPrivate />
				<PrivateRoute
					path={'/people/:id'}
					exact
					component={PersonEdit}
					isPrivate
				/>
				<PrivateRoute path={'/people'} exact component={Persons} isPrivate />
				<PrivateRoute path={'/'} exact component={Home} isPrivate />
			</Switch>
		</div>
	);
}

export default App;
