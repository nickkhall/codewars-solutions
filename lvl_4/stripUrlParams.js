function stripUrlParams(url, paramsToStrip){
  const hasQuery = url.indexOf('?') > -1;
  const queries = hasQuery ? url.substring(url.indexOf('?') + 1, url.length).split('&') : null;
	const urlHome = url.substring(0, url.indexOf('?'));
	let filteredQueries;
	let finalQueryString = '';

	if (queries) {
		// Remove duplicate queries
		const smallArr = queries.map(q => q.substring(0, q.indexOf('=')));
		filteredQueries = queries.filter((q, index) => {
			return smallArr.indexOf(q.substring(0, q.indexOf('='))) === index;
		});
	}

	// If paramsToStrip, remove params from url
	if (paramsToStrip && filteredQueries) {
		filteredQueries = filteredQueries.filter((fQ) => {
			const query = fQ.substring(0, fQ.indexOf('='));
			return !paramsToStrip.find(p => p === query);
		});
	}

	console.log({ filteredQueries })

	// If we had filters, generate query part of URL
	if (filteredQueries) {
		for (let q = 0; q < filteredQueries.length; q++) {
			const query = filteredQueries[q]
			finalQueryString += `${q === 0 ? '?' : ''}${query}${q !== filteredQueries.length -1 ? '&' : ''}`;
		}
	}

	// Return final url
  return `${urlHome}${finalQueryString}`;
};


// PROCESS
// 1. Take URL and determine if has params to strip and queries
//   1.5. If params:
//      - If queries:
//        - Iterate through queries, and on each query, iterate through params array to find a match, if so, remove from url.
// 2. Return url

// TESTS
console.log(stripUrlParams('www.codewars.com?a=1&b=2&a=2'));
console.log('SHOULD BE:',  'www.codewars.com?a=1&b=2');
console.log(stripUrlParams('www.codewars.com?a=1&b=2&a=2', ['b']));
console.log('SHOULD BE:',  'www.codewars.com?a=1');
console.log(stripUrlParams('www.codewars.com', ['b']));
console.log('SHOULD BE:',  'www.codewars.com');
console.log(stripUrlParams('www.codewars.com?ass=1&baby=2&ass=2', ['boobies']));
console.log('SHOULD BE:',  'www.codewars.com?ass=1&baby=2');
console.log(stripUrlParams('www.codewars.com?ass=1&baby=2&ass=2'));
console.log('SHOULD BE:',  'www.codewars.com?ass=1&baby=2');
console.log(stripUrlParams('http://www.example.com/catalog.asp?itemid=232&template=fresh&crcat=ppc&crsource=google&crkw=buy-a-lot&template=fresh', ['itemid', 'crsource=google']));
console.log('SHOULD BE:',  'http://www.example.com/catalog.asp?template=fresh&crcat=ppc&crkw=buy-a-lot');


// www.codewars.com ?a=1&b=2&a=2
// www.codewars.com ?a=1&b=2&a=2
// www.codewars.com
