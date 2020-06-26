// auth-context.js

import React from 'react';

export default React.createContext({
	token: null,
	userID: null,
	userName: null,
	startSession: () => {},
	endSession: () => {}
});


