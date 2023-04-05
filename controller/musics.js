const {credentials} = require('../config/config');
const {DynamoDBClient, QueryCommand, ScanCommand, GetItemCommand} = require("@aws-sdk/client-dynamodb");
const {unmarshall} = require("@aws-sdk/util-dynamodb");

const client = new DynamoDBClient({
	region: "us-east-1",
	credentials,
});

exports.query = async (req, res) => {
	const {title, artist, year} = req.body;
	const ExpressionAttributeNames = {};
	const ExpressionAttributeValues = {};
	let FilterExpression = '';

	if (title) {
		ExpressionAttributeNames['#title'] = 'title';
		ExpressionAttributeValues[':title'] = {S: title};
		FilterExpression += ' #title = :title';
	}

	if (artist) {
		ExpressionAttributeNames['#artist'] = 'artist';
		ExpressionAttributeValues[':artist'] = {S: artist};
		if (FilterExpression) FilterExpression += ' AND';
		FilterExpression += ' #artist = :artist';
	}

	if (year) {
		ExpressionAttributeNames['#year'] = 'year';
		ExpressionAttributeValues[':year'] = {N: year.toString()};
		if (FilterExpression) FilterExpression += ' AND';
		FilterExpression += ' #year = :year';
	}

	try {
		const params = {
			TableName: "music",
			FilterExpression,
			ExpressionAttributeNames,
			ExpressionAttributeValues,
		};

		const command = new ScanCommand(params);
		const response = await client.send(command);
		if (response.Items.length === 0) {
			res.status(404).json("not found");
			return;
		}
		res.status(200).json(response.Items.map((item) => unmarshall(item)));
	} catch (error) {
		res.status(400).json(error.message);
	}
}