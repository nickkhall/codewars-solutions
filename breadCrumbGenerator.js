class BreadCrumbGenerator {
	constructor(url, separator) {
		this.url = url;
		console.log('this.url:', this.url);
		this.file;
		this.separator = ` ${separator.trim().charAt(0)} `;
		this.ignoreArr = ['the','of','in','from','by','with','and', 'or', 'for', 'to', 'at', 'a'];

		this.linksArr;
		this.filesArr;
	}

	removeAnyFromUrl(arr) {
		for (let i = 0; i < arr.length; i++) {
			const item = arr[i];
			console.log({ item })
			const itemRegEx = new RegExp(`${item}`, 'g');

			if (this.url.match(itemRegEx)) {
				this.url = this.url.replace(itemRegEx, ' ');
			}
		}
	}

	removeLinksFromUrl() {
		this.linksArr = this.url.split('/').filter((v, index, arr) => {
			console.log({ v });
			if (v !== '' && !/(http|https)\:?/.test(v) && !/(index)/.test(v) && index !== arr.length - 1) return v;
			return;
		});
		this.home = this.linksArr[0];
		this.linksArr.shift();
		const homeRegEx = new RegExp(`${this.home}`, 'g');

		this.url = this.url.replace(homeRegEx, '').trim();
		this.removeAnyFromUrl(this.linksArr);
		this.url = this.url.replace(/\/{0,}/g, '');

		console.log('this.linksArr after removeLinksFromUrl: ', this.linksArr);
	}

	removeFilesFromUrl() {
		console.log('this.url:', this.url);
		this.filesArr = this.url.split(/\s{1,}/g);
		console.log('this.filesArr:', this.filesArr);

		if (!this.url.match(/index/g)) {
			this.file = this.url
		} else {
			this.file = this.linksArr[this.linksArr.length - 1];
			this.linksArr.pop();
		}

	}

	generateSpan() {
		return `<span class="active">${this.file.toUpperCase()}</span>`;
	}

	generateLinks() {
		let str = '';
		let acc = '';

		for (let i = 0; i < this.linksArr.length; i++) {
			let link = this.linksArr[i];
			const isLongerThanThirty = link.length > 30;
			const abbLink = link.split('-').map(l => {
				if (this.ignoreArr.indexOf(l) > -1 && this.ignoreArr.find(f => f === l)) {
					return null;
				}
				return l.charAt(0).toUpperCase();
			}).join('');
			if (i === 0) {
				console.log({ i });
				str += `<a href="/${link}/">${isLongerThanThirty ? abbLink : link.toUpperCase()}</a>${i + 1 === this.linksArr.length ? '' : this.separator}`;
			} else {
				console.log({ i });
				if (i === this.linksArr.length) {
					str += ` <a href="/${acc}">${isLongerThanThirty ? abbLink : link.toUpperCase()}</a> ${this.separator} `;
				} else {
					acc += `${link}/`;
					str += `<a href="/${acc}">${isLongerThanThirty ? abbLink : link.toUpperCase()}</a>`
				}
			}
			acc += `${link}/`;
		}

		return str;
	}

	generateResult() {
		this.removeLinksFromUrl()
		this.removeFilesFromUrl();

		return `<a href="/">HOME</a>${this.separator}${this.generateLinks()}${this.separator}${this.generateSpan()}`;
	}
}

function generateBC(url, separator) {
	const BCG = new BreadCrumbGenerator(url, separator);

	return BCG.generateResult();
}


// TESTS
console.log('YOURS:', generateBC("www.microsoft.com/important/confidential/docs/index.htm#top", " * "), '\n\nSHOULD BE:', '<a href="/">HOME</a> * <a href="/important/">IMPORTANT</a> * <a href="/important/confidential/">CONFIDENTIAL</a> * <span class="active">DOCS</span>', '\n-------------------------');
console.log('YOURS:', generateBC("mysite.com/very-long-url-to-make-a-silly-yet-meaningful-example/example.asp", " > "), '\n\nSHOULD BE:', '<a href="/">HOME</a> > <a href="/very-long-url-to-make-a-silly-yet-meaningful-example/">VLUMSYME</a> > <span class="active">EXAMPLE</span>', '\n-------------------------');
console.log('YOURS:', generateBC("www.very-long-site_name-to-make-a-silly-yet-meaningful-example.com/users/giacomo-sorbi", " + "), '\n\nSHOULD BE:', '<a href="/">HOME</a> + <a href="/users/">USERS</a> + <span class="active">GIACOMO SORBI</span>', '\n-------------------------');

console.log('YOURS:', generateBC('www.codewars.com/users/GiacomoSorbi?ref=CodeWars', ' / '), '\nSHOULD BE: ', '<a href="/">HOME</a> / <a href="/users/">USERS</a> / <span class="active">GIACOMOSORBI</span>', '\n-------------------------');
console.log('YOURS:', generateBC('https://www.linkedin.com/in/giacomosorbi', ' * '), '\nSHOULD BE: ', '<a href="/">HOME</a> * <a href="/in/">IN</a> * <span class="active">GIACOMOSORBI</span>', '\n-------------------------');
console.log('YOURS:', generateBC('www.agcpartners.co.uk/', ' * '), '\nSHOULD BE: ', '<span class="active">HOME</span>', '\n-------------------------');
console.log('YOURS:', generateBC('www.agcpartners.co.uk', ' # '), '\nSHOULD BE: ', '<span class="active">HOME</span>', '\n-------------------------');
console.log('YOURS:', generateBC('https://www.agcpartners.co.uk/index.html', ' >>> '), '\nSHOULD BE:', '<span class="active">HOME</span>', '\n-------------------------');
console.log('YOURS:', generateBC('facebook.fr/insider-a-or-with-the-immunity-skin-biotechnology/images/biotechnology-at-diplomatic-insider-bed-paper/web?order=desc&filter=adult', ' # '), '\nSHOULD BE: ', '<a href="/">HOME</a> # <a href="/insider-a-or-with-the-immunity-skin-biotechnology/">IISB</a> # <a href="/insider-a-or-with-the-immunity-skin-biotechnology/images/">IMAGES</a> # <a href="/insider-a-or-with-the-immunity-skin-biotechnology/images/biotechnology-at-diplomatic-insider-bed-paper/">BDIBP</a> # <span class="active">WEB</span>', '\n-------------------------');

console.log('YOURS:', generateBC('http://www.codewars.com/images/in-skin-bed-immunity-for-paper-biotechnology/giacomo-sorbi.htm', ' ; '), '\nSHOULD BE: ', '<a href="/">HOME</a> ; <a href="/images/">IMAGES</a> ; <a href="/images/in-skin-bed-immunity-for-paper-biotechnology/">SBIPB</a> ; <span class="active">GIACOMO SORBI</span>', '\n-------------------------');
console.log('YOURS:', generateBC('https://www.twitter.de/to-uber-immunity-surfer-a-research-biotechnology-meningitis/profiles', ' >>> '), '\nSHOULD BE: ', '<a href="/">HOME</a> > <a href="/to-uber-immunity-surfer-a-research-biotechnology-meningitis/">UISRBM</a> > <span class="active">PROFILES</span>', '\n-------------------------');
console.log('YOURS:', generateBC('google.ca/a-paper-bioengineering-transmutation-pippi-kamehameha/games/games/users/test.php', ' >>> '), '\nSHOULD BE: ', '<a href="/">HOME</a> > <a href="/a-paper-bioengineering-transmutation-pippi-kamehameha/">PBTPK</a> > <a href="/a-paper-bioengineering-transmutation-pippi-kamehameha/games/">GAMES</a> > <a href="/a-paper-bioengineering-transmutation-pippi-kamehameha/games/games/">GAMES</a> > <a href="/a-paper-bioengineering-transmutation-pippi-kamehameha/games/games/users/">USERS</a> > <span class="active">TEST</span>', '\n-------------------------');

console.log('YOURS:', generateBC('linkedin.it/immunity-a-uber-transmutation-bioengineering#team', ' ; '), '\nSHOULD BE: ', '<a href="/">HOME</a> ; <span class="active">IUTB</span>', '\n-------------------------');
console.log('YOURS:', generateBC('http://agcpartners.co.uk/most-downloaded/pictures-you-wished-you-never-saw-but-you-cannot-unsee-now/files/app', ' . '), '\nSHOULD BE: ', '<a href="/">HOME</a> . <a href="/most-downloaded/">MOST DOWNLOADED</a> . <a href="/most-downloaded/pictures-you-wished-you-never-saw-but-you-cannot-unsee-now/">PYWYNSBYCUN</a> . <a href="/most-downloaded/pictures-you-wished-you-never-saw-but-you-cannot-unsee-now/files/">FILES</a> . <span class="active">APP</span>', '\n-------------------------');
