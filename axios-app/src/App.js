import { Switch } from 'react-router';
import { QueryClient, QueryClientProvider } from 'react-query';
import React from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import PrivateRoute from './privateRoute/PrivateRoute';
import { Suspense } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = React.lazy(() => import('./pages/login/Login'));
const Register = React.lazy(() => import('./pages/register/Register'));
const Home = React.lazy(() => import('./pages/home/Home'));
const Movies = React.lazy(() => import('./pages/movies/Movies'));
const MovieEdit = React.lazy(() => import('./pages/movies/MovieEdit'));
const Books = React.lazy(() => import('./pages/books/Books'));
const BookEdit = React.lazy(() => import('./pages/books/BookEdit'));
const PersonEdit = React.lazy(() => import('./pages/persons/PersonEdit'));
const Persons = React.lazy(() => import('./pages/persons/Persons'));

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />

			<div className="App">
				{/* <NavbarTop /> */}
				<Switch>
					<PrivateRoute
						path={'/login'}
						component={() => (
							<Suspense fallback={<div>Loading...</div>}>
								<Login />
							</Suspense>
						)}
					/>
					<PrivateRoute
						path={'/register'}
						component={() => (
							<Suspense fallback={<div>Loading...</div>}>
								<Register />
							</Suspense>
						)}
					/>
					<PrivateRoute
						path={'/movies/:id'}
						exact
						component={() => (
							<Suspense fallback={<div>Loading...</div>}>
								<MovieEdit />
							</Suspense>
						)}
						isPrivate
					/>
					<PrivateRoute
						path={'/movies'}
						exact
						component={() => (
							<Suspense fallback={<div>Loading...</div>}>
								<Movies />
							</Suspense>
						)}
						isPrivate
					/>
					<PrivateRoute
						path={'/books/:id'}
						exact
						component={() => (
							<Suspense fallback={<div>Loading...</div>}>
								<BookEdit />
							</Suspense>
						)}
						isPrivate
					/>
					<PrivateRoute
						path={'/books'}
						exact
						component={() => (
							<Suspense fallback={<div>Loading...</div>}>
								<Books />
							</Suspense>
						)}
						isPrivate
					/>
					<PrivateRoute
						path={'/people/:id'}
						exact
						component={() => (
							<Suspense fallback={<div>Loading...</div>}>
								<PersonEdit />
							</Suspense>
						)}
						isPrivate
					/>
					<PrivateRoute
						path={'/people'}
						exact
						component={() => (
							<Suspense fallback={<div>Loading...</div>}>
								<Persons />
							</Suspense>
						)}
						isPrivate
					/>
					<PrivateRoute
						path={'/'}
						exact
						component={() => (
							<Suspense fallback={<div>Loading...</div>}>
								<Home />
							</Suspense>
						)}
						isPrivate
					/>
				</Switch>
			</div>
		</QueryClientProvider>
	);
}

export default App;
