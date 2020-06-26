// helper.js


const validateInput = (args) => {

	if (Array.isArray(args)) {
		
		return args.every((val) => val.trim().length > 0);
	} 
	
	return args.trim().length > 0;
};

exports.validateInput = validateInput;
