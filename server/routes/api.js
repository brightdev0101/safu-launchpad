const express = require('express');
const router = express.Router();
const Address = require('../models/Address.js');
const compiler = require('../scripts/compile.js');
const fs = require('fs');

router.get('/getAll', (req, res) => {
	Address.find({})
		.then((data) => {
			res.json(data);
		})
		.catch((err) => console.log(err));
});

router.get('/getTokenContract', (req, res) => {
	let data = compiler('token');
	res.json(data);
});

router.get('/getTokenContractAbi', (req, res) => {
	let bufferData = fs.readFileSync(__dirname + '/tokenAbi.json');
	let stData = bufferData.toString();
	let data = JSON.parse(stData);
	res.json(data);
});

router.get('/getTokenContractBytecode', (req, res) => {
	console.log('tset');
	let bufferData = fs.readFileSync(__dirname + '/tokenBytecode.json');
	let stData = bufferData.toString();
	let data = JSON.parse(stData);
	res.json(data);
});

router.post('/addTokenAddress', (req, res) => {
	const newAddress = new Address({
		userAddress: req.body.userAddress,
		tokenAddress: req.body.tokenAddress,
		tokenName: req.body.tokenName,
		tokenSymbol: req.body.tokenSymbol,
		tokenDecimal: req.body.tokenDecimal,
		tokenSupply: req.body.tokenSupply,
		chainID: req.body.chainID
	});

	newAddress.save().then((data) => res.json(data)).catch((err) => console.log(err));
});

router.get('/getPresaleContract', (req, res) => {
	data = compiler('presale');
	res.json(data);
});

router.get('/getPresaleContractAbi', (req, res) => {
	let bufferData = fs.readFileSync(__dirname + '/presaleAbi.json');
	let stData = bufferData.toString();
	let data = JSON.parse(stData);
	res.json(data);
});

router.get('/getPresaleContractBytecode', (req, res) => {
	let bufferData = fs.readFileSync(__dirname + '/presaleBytecode.json');
	let stData = bufferData.toString();
	let data = JSON.parse(stData);
	res.json(data);
});

router.post('/addPresaleAddress', (req, res) => {
	updateAddress = {};
	updateAddress.launchpadAddress = req.body.presaleAddress;
	updateAddress.presaleRate = req.body.presaleRate;
	(updateAddress.minBuy = req.body.minBuy),
		(updateAddress.maxBuy = req.body.maxBuy),
		(updateAddress.softCap = req.body.softCap),
		(updateAddress.hardCap = req.body.hardCap),
		(updateAddress.from = req.body.from),
		(updateAddress.to = req.body.to),
		(updateAddress.logoUrl = req.body.logoUrl);
	updateAddress.website = req.body.website;
	updateAddress.facebook = req.body.facebook;
	updateAddress.twitter = req.body.twitter;
	updateAddress.github = req.body.github;
	updateAddress.telegram = req.body.telegram;
	updateAddress.instagram = req.body.instagram;
	updateAddress.discord = req.body.discord;
	updateAddress.reddit = req.body.reddit;
	updateAddress.description = req.body.description;
	updateAddress.whiteListState = req.body.whiteliststat;

	Address.findOneAndUpdate(
		{ tokenAddress: req.body.tokenAddress },
		{ $set: updateAddress },
		{ new: true }
	).then((profile) => res.json(profile));
});

router.post('/addWhitelist', (req, res) => {
	const updateAddress = {};
	updateAddress.whiteListAddress = req.body.val;

	Address.findOne({ launchpadAddress: req.body.launchpadAddress })
		.then((dat) => {
			dat.whiteList.push(updateAddress);
			dat.save().catch((err) => console.log(err));
			res.json(dat);
		})
		.catch((err) => res.status(404).json(err));
});

router.get('/addWhitelist/:id', (req, res) => {
	Address.findOne({ launchpadAddress: req.params.id })
		.then((dat) => {
			res.json(dat);
		})
		.catch((err) => res.status(404).json(err));
});

module.exports = router;
