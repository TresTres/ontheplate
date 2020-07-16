// helper.js


const validateInput = (args) => {

	if (Array.isArray(args)) {
		
		return args.every((val) => val.trim().length > 0);
	} 
	
	return args.trim().length > 0;
};

const fetchRequest = (requestBody) => {
	return fetch('/api', {
		method: 'POST',
		body: JSON.stringify(requestBody),
		headers: {
			'Content-Type': 'application/json'
		}	
	});
};

const signoutRequest = () => {
	return fetch('/signout', {
		method: 'POST'
	});
};

exports.validateInput = validateInput;
exports.fetchRequest = fetchRequest;
exports.signoutRequest = signoutRequest;