import React from 'react'

const AuthContext = React.createContext({
	token: null,
	userId: null,
	login: (userId, token, tokenExpiration) => { },
	logout: () => { },
	signedUser: null
});


export { AuthContext };