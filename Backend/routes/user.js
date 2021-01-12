const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
	var data = req.body;
	await web3.eth.getAccounts().then(async (accounts) => {
		//console.log(accounts);
		await MyContract.methods
			.setUser(data.id, data.name, data.age, data.phone)
			.send({ from: accounts[0], gas: 600000 })
			.on('transactionHash', async (hash) => {
				await MyContract.getPastEvents(
					'notify',
					{
						fromBlock: 0,
						toBlock: 'latest'
					},
					(error, events) => {
						if (error) {
							res.json({
								error: 'Error fetching the events'
							});
						} else {
							console.log(events);
							var eventArray = [];
							events.forEach((event) => {
								eventArray.push({
									id: event.returnValues.id,
									name: event.returnValues.name
								});
							});
							res.json({
								message: 'Registred Successfully',
								data: eventArray
							});
						}
					}
				);
			})
			.on('error', (error) => {
				console.log(error);
			});
	});
});

module.exports = router;
