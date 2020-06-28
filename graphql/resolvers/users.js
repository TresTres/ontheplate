//resolvers/users.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { handle } = require('../../errorMaster');

const User = require('../../models/user');
const { getLists } = require('./merge');

async function createUser(args) {

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
		return { 
			...userResult._doc, 
			password: null,
			creationDate: userResult._doc.creationDate.toISOString()
		};
	}
	catch (err) {
    
		console.log(err);
		throw handle(err);
	}
}

async function getUsersAll() {

	try {

		const users = await User.find();
		return users.map(user => {
			return { 
				...user._doc,
				creationDate: user._doc.creationDate.toISOString(),
				lists: getLists.bind(this, user._doc.lists)
			};
		});
	}
	catch(err) {

		console.log(err);
		throw handle(err);
	}
}

async function login({ str, password }) {
  
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
		return { userID: user._id, userName: user.userName, token: token, tokenExpiration: 1 };

	} 
	catch(err) {

		console.log(err);
		throw handle(err);
	}
}

module.exports = {

	users:() => {
		return getUsersAll();
	},

	createUser: (args) => {
		return createUser(args);
	},

	login: (args) => {
		return login(args);
	}
};
