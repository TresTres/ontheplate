//authcheck.js

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

	req.isAuth = false;
	const authHeader = req.get('Authorization');
	if(!authHeader) {

		return next();
	}

	const token = authHeader.split(' ')[1];
	if(!token || token === '') {
		
		return next();
	}
	
	let decodedToken;
	try {
		
		decodedToken = jwt.verify(token, `${process.env.JWT_SECRET}`);
	}
	catch(err) {
		
		console.log(err);
		return next();
	}

	if(!decodedToken) {
		
		return next();
	}

	req.isAuth = true;
	req.userID = decodedToken.userID;
	next();

};
