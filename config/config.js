const dotenv = require('dotenv');
dotenv.config();

const credentials = {
	accessKeyId: process.env.ACCESS_KEY_ID,
	secretAccessKey: process.env.SECRET_ACCESS_KEY,
};

module.exports = {
	credentials,
};