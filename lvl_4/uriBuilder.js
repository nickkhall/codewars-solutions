class UriBuilder {
  constructor(url) {
    this.url = url;
    this.params = this.url.split('?').filter((_,i) => i !== 0).reduce((a, c) => {
      const items = c.split('=');
		  return Object.assign({ [items[0]]: (
        !Number.isNaN(parseInt(items[1], 10)) ? parseInt(items[1], 10) : items[1]
      ) }, a);
	  }, {});
  }

  build() {
    const Object.keys(this.params);

    for (let i = 0; i < paramKeys.length; i++) {
      const changedParam = Object.entries(this.params)[i][0];
      if (paramKeys[i] === changedParam) {
        const newVal = Object.entries(this.params)[i][1];
        const newValRegEx = new RegExp(`?${changedParam}=`, 'g');
        this.url.replace(newValRegEx, newVal);
      }
    }

    return this.url;
  }
}
