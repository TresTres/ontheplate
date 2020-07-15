// auth-context.js

import React from 'react';

export default React.createContext({
	userID: '',
	authenticate: () => {},
	signout: () => {}
});


