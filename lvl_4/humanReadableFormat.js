class HumanReadable {
	constructor(seconds) {
		this.tempSeconds = seconds;
		this.secPerMin = 60;
		this.secPerHour = this.secPerMin * 60;
		this.secPerDay = this.secPerHour * 24;
		this.secPerYear = this.secPerDay * 365;

		this.numYears = Math.floor(this.tempSeconds / this.secPerYear);
		this.tempSeconds -= this.numYears * this.secPerYear;

		this.numDays = Math.floor(this.tempSeconds / this.secPerDay);
		this.tempSeconds -= this.numDays * this.secPerDay;

		this.numHours = Math.floor(this.tempSeconds / this.secPerHour);
		this.tempSeconds -= this.numHours * this.secPerHour;

		this.numMins = Math.floor(this.tempSeconds / this.secPerMin);
		this.numSecs = this.tempSeconds - this.numMins * this.secPerMin;

		this.formattedString;
		this.index;
	}

	buildString(value, unit) {
		if (value > 0) {
			return `${value} ${unit}${value > 1 ? 's' : ''}, `;
		}
		return '';
	}

	assembleString() {
		this.formattedString = this.buildString(this.numYears, 'year');
		this.formattedString += this.buildString(this.numDays, 'day');
		this.formattedString += this.buildString(this.numHours, 'hour');
		this.formattedString += this.buildString(this.numMins, 'minute');
		this.formattedString += this.buildString(this.numSecs, 'second');
		this.index = this.formattedString.lastIndexOf(', ');
		this.formattedString = this.formattedString.substring(0, this.index);
		this.index = this.formattedString.lastIndexOf(', ');

		if (this.index > 0) {
			this.formattedString = this.formattedString.substring(0, this.index) + ' and ' + this.formattedString.substring(this.index + 2);
		}

		return this.formattedString;
	}
};


function formatDuration (seconds) {
	if (seconds === 0) return 'now';

	const HT = new HumanReadable(seconds);

	return HT.assembleString();
};
