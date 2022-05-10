const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
	userAddress: {
		type: String,
		required: true
	},
	tokenAddress: {
		type: String
	},
	tokenName: {
		type: String
	},
	tokenSymbol: {
		type: String
	},
	tokenDecimal: {
		type: Number
	},
	tokenSupply: {
		type: Number
	},
	chainID: {
		type: Number
	},
	launchpadAddress: {
		type: String
	},
	logoUrl: {
		type: String
	},
	website: {
		type: String
	},
	facebook: {
		type: String
	},
	twitter: {
		type: String
	},
	github: {
		type: String
	},
	telegram: {
		type: String
	},
	instagram: {
		type: String
	},
	discord: {
		type: String
	},
	reddit: {
		type: String
	},
	description: {
		type: String
	},
	whiteListState: {
		type: String
	},
	whiteList: [
		{
			whiteListAddress: {
				type: String
			}
		}
	],
	presaleRate: {
		type: String
	},
	minBuy: {
		type: String
	},
	maxBuy: {
		type: String
	},
	softCap: {
		type: String
	},
	hardCap: {
		type: String
	},
	from: {
		type: String
	},
	to: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = Address = mongoose.model('launchpad', AddressSchema);
