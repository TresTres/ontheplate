// helper.js


const validateInput = (args) => {

	if (Array.isArray(args)) {
		
		return args.every((val) => val.trim().length > 0);
	} 
	
	return args.trim().length > 0;
};

const fetchRequest = (requestBody) => {
	return fetch('http://localhost:4000/api', {
		method: 'POST',
		body: JSON.stringify(requestBody),
		headers: {
			'Content-Type': 'application/json'
		}
	})
};

exports.validateInput = validateInput;
exports.fetchRequest = fetchRequest;