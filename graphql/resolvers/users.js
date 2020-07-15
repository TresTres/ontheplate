//resolvers/users.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { handle } = require('../../errorMaster');

const User = require('../../models/user');
const { repackUserDoc } = require('./merge');

const createUser = async (args) => {

	const userArgs = args.userInput;
	try {
    
		const hashedPass = await bcrypt.hash(userArgs.password, 12);
		const newUser = new User({
    
			userName: userArgs.userName,
			password: hashedPass,
			email: userArgs.email,
			creationDate: new Date(),
			lists: []
		});
		const userResult = await newUser.save();
		return repackUserDoc(userResult);
	}
	catch (err) {
    
		console.log(err);
		throw handle(err);
	}
}

const getUsersAll = async () => {

	try {

		const users = await User.find();
		return users.map(user => repackUserDoc(user));
	}
	catch(err) {

		console.log(err);
		throw handle(err);
	}
}

const login = async ({ str, password }, res) => {
  
	try {
		const user = await User.findOne({$or: [{email: str}, {userName: str}] });
		if (!user) {
      
			throw new Error('User does not exist!');
		}
		const passwordFound = await bcrypt.compare(password, user.password);
		if(!passwordFound) {

			throw new Error('Incorrect password!');
		}
		const token = jwt.sign(
			{  userID: user._id, email: user.email }, 
			`${process.env.JWT_SECRET}`,
			{ expiresIn: '1h' }
		);
		res.cookie("id", token, {
			httpOnly: true,
			sameSite: true,
			maxAge: 1000 * 60 * 60 // one hour
		});
		//todo: cookie should be secure when this is hosted.  

		return { 
			userID: user._id, 
			userName: user.userName, 
			token: token, 
			tokenExpiration: 1 
		};

	} 
	catch(err) {

		console.log(err);
		throw handle(err);
	}
}

const resumeID = async (userID) => (
	await User.findById(userID) ? userID : ''
);

module.exports = {

	users:() => {
		return getUsersAll();
	},

	createUser: (args) => {
		return createUser(args);
	},

	login: (args, { res }) => {
		return login(args, res);
	},

	resumeID: (_, { userID }) => {
		return resumeID(userID)
	}
};
