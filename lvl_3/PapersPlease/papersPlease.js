class Inspector {
	constructor(person) {
		this.person;
		this.bulletin;

		this.receiveBulletin = this.receiveBulletin.bind(this);
		this.inspect = this.inspect.bind(this);
	}

	receiveBulletin(bulletin) {
		this.bulletin = bulletin.split('\n');
		console.log('bulletin:', this.bulletin)
	}

	inspect(person) {
		this.person = person;
		console.log('person:', this.person)
	}
}


// TEST
const inspector = new Inspector();
const bulletin = 'Entrants require passport\nAllow citizens of Arstotzka, Obristan';
inspector.receiveBulletin(bulletin);

const josef = {
	passport:'ID#: GC07D-FU8AR\nNATION: Arstotzka\nNAME: Costanza, Josef\nDOB: 1933.11.28\nSEX: M\nISS: East Grestin\nEXP: 1983.03.15'
};
const guyovich = {
	acces_permit: 'NAME: Guyovich, Russian\nNATION: Obristan\nID#: TE8M1-V3N7R\nPURPOSE: TRANSIT\nDURATION: 14 DAYS\nHEIGHT: 159cm\nWEIGHT: 60kg\nEXP: 1983.07.13'
};
const roman = {
	passport:'ID#: WK9XA-LKM0Q\nNATION: United Federation\nNAME: Dolanski, Roman\nDOB: 1933.01.01\nSEX: M\nISS: Shingleton\nEXP: 1983.05.12',
	grant_of_asylum: 'NAME: Dolanski, Roman\nNATION: United Federation\nID#: Y3MNC-TPWQ2\nDOB: 1933.01.01\nHEIGHT: 176cm\nWEIGHT: 71kg\nEXP: 1983.09.20'
};

console.log('Actual:', inspector.inspect(josef));
console.log('Expected:', 'Glory to Arstotzka.');
console.log('----------------------------------\n');
console.log('Actual:', inspector.inspect(guyovich));
console.log('Expected:', 'Entry denied: missing required passport.');
console.log('----------------------------------\n');
console.log('Actual:', inspector.inspect(roman));
console.log('Expected:', 'Detainment: ID number mismatch.');
console.log('----------------------------------\n');
