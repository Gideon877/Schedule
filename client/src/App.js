import React, { useState } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
} from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';

import { AuthContext } from './context/auth-context';
import UserMainLayout from './component/user/UserMainLayout';


const App = () => {
	const [state, setState] = useState({
		userId: '5f7af41ca475fe09c412dd9c',
		token: null,
		signedUser: null
	});
	const login = (userId, token, tokenExpiration) => {
		setState({ token, userId });
		localStorage.clear();
		localStorage.setItem('token', token);
	};

	const logout = () => {
		setState({ token: null, userId: null, currentUser: null });
	};

	return <Router>
		<AuthContext.Provider value={{
			token: state.token,
			userId: state.userId,
			signedUser: state.signedUser,
			login,
			logout,
		}}>
			<ToastProvider>
				<Switch>
					<Route path='' render={() => <UserMainLayout userId={state.userId} />} />
				</Switch>
			</ToastProvider>
		</AuthContext.Provider>
	</Router>
}
export default App;
