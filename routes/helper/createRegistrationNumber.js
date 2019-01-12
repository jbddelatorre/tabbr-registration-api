const createRegistrationNumber = () => {
	const REGISTRATION_NUMBER_LENGTH = 6;
	const pool = [];
	let registrationNumber = "";

	for(let i = 65; i <= 90; i++) {
		pool.push(String.fromCharCode(i))
	}
	for(let i = 1; i <= 9; i++) {
		pool.push(i.toString())
	}
	
	while(registrationNumber.length < REGISTRATION_NUMBER_LENGTH) {
		let random = Math.floor(Math.random() * pool.length);
		registrationNumber += pool[random]
	}

	return registrationNumber;
}

module.exports = createRegistrationNumber;

