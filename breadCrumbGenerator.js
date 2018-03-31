const ignoreArr = ['the', 'of', 'in', 'from', 'by', 'with', 'and', 'or', 'for', 'to', 'at', 'a'];

function produceSpan(content) {
	return `<span class="active">${formatTitle(content)}</span>`
}

function formatTitle(content) {
	if (content.length > 30) {
		return content.split('-').map(c => ignoreArr.indexOf(c) === -1 ? c.charAt(0).toUpperCase() : false).filter(v => !!v).join('');
	}
	return content.replace(/\-/g, ' ').toUpperCase();
}

function produceAnchor(filePath, content) {
	return `<a href="${filePath}">${formatTitle(content)}</a>`;
}

function generateBC(url, separator) {
	let returnString = '';
	separator = ` ${`${separator}`.trim()} `;
	const splitArr = url.replace(/\D{0,6}:/, '').split('/').filter(u => u && u !== '' && u.indexOf('index.') < 0).map(url => {
		if (url.match(/[?#]/)) {
			return url.split(/[#?]/g)[0];
		}
		return url;
	});

	return splitArr.reduce((acc, cur, index, arr) => {
		const isLast = index === arr.length - 1;

		if (index == 0) {
			if (isLast) {
				acc += produceSpan('HOME');
				return acc;
			}

			acc += produceAnchor('/', 'HOME') + `${separator}`;
			return acc;
		}

		if (isLast) {
			acc += produceSpan(cur.replace(/\..+/g, ''));
			return acc;
		}

		const url = arr.slice(1, index + 1).join('/'); // Define path to your link

 		acc += produceAnchor(`/${url}/`, cur) + `${separator}`;

		return acc;
	}, '');
}


const Test = { assertValue: (actual, expected) => { if (expected !== actual) throw new Error(`Expected: ${expected}\nGot: ${actual}`); console.info('SUCCESS!') } };

Test.assertValue(generateBC("www.microsoft.com/important/confidential/docs/index.htm#top", " * "), '<a href="/">HOME</a> * <a href="/important/">IMPORTANT</a> * <a href="/important/confidential/">CONFIDENTIAL</a> * <span class="active">DOCS</span>');
Test.assertValue(generateBC("mysite.com/very-long-url-to-make-a-silly-yet-meaningful-example/example.asp", " > "), '<a href="/">HOME</a> > <a href="/very-long-url-to-make-a-silly-yet-meaningful-example/">VLUMSYME</a> > <span class="active">EXAMPLE</span>');
Test.assertValue(generateBC("www.very-long-site_name-to-make-a-silly-yet-meaningful-example.com/users/giacomo-sorbi", " + "), '<a href="/">HOME</a> + <a href="/users/">USERS</a> + <span class="active">GIACOMO SORBI</span>');

Test.assertValue(generateBC('www.codewars.com/users/GiacomoSorbi?ref=CodeWars', ' / '), '<a href="/">HOME</a> / <a href="/users/">USERS</a> / <span class="active">GIACOMOSORBI</span>');
Test.assertValue(generateBC('https://www.linkedin.com/in/giacomosorbi', ' * '), '<a href="/">HOME</a> * <a href="/in/">IN</a> * <span class="active">GIACOMOSORBI</span>');
Test.assertValue(generateBC('www.agcpartners.co.uk/', ' * '), '<span class="active">HOME</span>');
Test.assertValue(generateBC('www.agcpartners.co.uk', ' # '), '<span class="active">HOME</span>');
Test.assertValue(generateBC('https://www.agcpartners.co.uk/index.html', ' >>> '), '<span class="active">HOME</span>');
Test.assertValue(generateBC('facebook.fr/insider-a-or-with-the-immunity-skin-biotechnology/images/biotechnology-at-diplomatic-insider-bed-paper/web?order=desc&filter=adult', ' # '), '<a href="/">HOME</a> # <a href="/insider-a-or-with-the-immunity-skin-biotechnology/">IISB</a> # <a href="/insider-a-or-with-the-immunity-skin-biotechnology/images/">IMAGES</a> # <a href="/insider-a-or-with-the-immunity-skin-biotechnology/images/biotechnology-at-diplomatic-insider-bed-paper/">BDIBP</a> # <span class="active">WEB</span>');

Test.assertValue(generateBC('http://www.codewars.com/images/in-skin-bed-immunity-for-paper-biotechnology/giacomo-sorbi.htm', ' ; '), '<a href="/">HOME</a> ; <a href="/images/">IMAGES</a> ; <a href="/images/in-skin-bed-immunity-for-paper-biotechnology/">SBIPB</a> ; <span class="active">GIACOMO SORBI</span>');
Test.assertValue(generateBC('https://www.twitter.de/to-uber-immunity-surfer-a-research-biotechnology-meningitis/profiles', ' >>> '), '<a href="/">HOME</a> > <a href="/to-uber-immunity-surfer-a-research-biotechnology-meningitis/">UISRBM</a> > <span class="active">PROFILES</span>');
Test.assertValue(generateBC('google.ca/a-paper-bioengineering-transmutation-pippi-kamehameha/games/games/users/test.php', ' >>> '), '<a href="/">HOME</a> > <a href="/a-paper-bioengineering-transmutation-pippi-kamehameha/">PBTPK</a> > <a href="/a-paper-bioengineering-transmutation-pippi-kamehameha/games/">GAMES</a> > <a href="/a-paper-bioengineering-transmutation-pippi-kamehameha/games/games/">GAMES</a> > <a href="/a-paper-bioengineering-transmutation-pippi-kamehameha/games/games/users/">USERS</a> > <span class="active">TEST</span>');

Test.assertValue(generateBC('linkedin.it/immunity-a-uber-transmutation-bioengineering#team', ' ; '), '<a href="/">HOME</a> ; <span class="active">IUTB</span>');
Test.assertValue(generateBC('http://agcpartners.co.uk/most-downloaded/pictures-you-wished-you-never-saw-but-you-cannot-unsee-now/files/app', ' . '), '<a href="/">HOME</a> . <a href="/most-downloaded/">MOST DOWNLOADED</a> . <a href="/most-downloaded/pictures-you-wished-you-never-saw-but-you-cannot-unsee-now/">PYWYNSBYCUN</a> . <a href="/most-downloaded/pictures-you-wished-you-never-saw-but-you-cannot-unsee-now/files/">FILES</a> . <span class="active">APP</span>');


Test.assertValue(generateBC('google.ca/or-with-pippi-a-biotechnology/web/transmutation-at-surfer-in-surfer-uber-bladder/app#info?rank=recent_first&hide=sold', ' ; '), '<a href="/">HOME</a> ; <a href="/or-with-pippi-a-biotechnology/">OR WITH PIPPI A BIOTECHNOLOGY</a> ; <a href="/or-with-pippi-a-biotechnology/web/">WEB</a> ; <a href="/or-with-pippi-a-biotechnology/web/transmutation-at-surfer-in-surfer-uber-bladder/">TSSUB</a> ; <span class="active">APP</span>');

Test.assertValue(generateBC('pippi.pi/images/app?hack=off', ' # '), '<a href="/">HOME</a> # <a href="/images/">IMAGES</a> # <span class="active">APP</span>');
