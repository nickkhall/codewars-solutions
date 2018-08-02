class Parser {
  constructor(string) {
    this.string = string;
    this.pos = 0;
    this.char = ' ';
    this.escapee = {
      '"':  '"',
      '\\': '\\',
      '/':  '/',
      b:    '\b',
      f:    '\f',
      n:    '\n',
      r:    '\r',
      t:    '\t'
    };
  }

  next(val) {
    if (val && val !== this.char) {
      console.log('error in this.next()')
    };
    this.char = this.string.charAt(this.pos);
    this.pos += 1;
    return this.char;
  }

  white() {
    while (this.char && this.char <= ' ') this.next();
  }

  handleStringsOnly() {
    return this.string.toString();
  }

  handleSpecialWord() {
    switch (this.char) {
      case 't':
        this.next('t');
        this.next('r');
        this.next('u');
        this.next('e');
        return true;
      case 'f':
        this.next('f');
        this.next('a');
        this.next('l');
        this.next('s');
        this.next('e');
        return false;
      case 'n':
        this.next('n');
        this.next('u');
        this.next('l');
        this.next('l');
        return null;
    }
    throw new SyntaxError('Unexpected character')
  }

  // Handles all numbers
  handleNumber() {
    let num;
    let string = '';

    if (this.char === '-') {
      string += '-';
      this.next('-');
    }
    while (this.char >= '0' && this.char <= '9') {
      string += this.char;
      this.next();
    }
    if (this.char === '.') {
      string += '.';
      while (this.next() && this.char >= '0' && this.char <= '9') {
        string += this.char;
      }
    }
    if (this.char.toLowerCase() === 'e') {
      string += this.char;
      this.next();
      if (this.char === '-' || this.char === '+') {
        string += this.char;
        this.next();
      }
      while (this.char >= '0' && this.char <= '9') {
        string += this.char;
        this.next();
      }
    }
    num = Number(string);
    if (!isFinite(num)) throw new SyntaxError('Bad number');
    return num;
  }

  // Handles all arrays
  handleArray() {
    let arr = [];

    if (this.char === '[') {
      this.next('[');
      this.white();
      if (this.char === ']') {
        this.next(']');
        return arr;
      }
      while (this.char) {
        arr.push(this.determineType());
        this.white();
        if (this.char === ']') {
          this.next(']');
          return arr;
        }
        this.next(',');
        this.white();
      }
    }
    throw new SyntaxError('Bad array');
  }

  handleString() {
    var hex, i, uffff;
    var string = '';

    if (this.char === '"') {
      while (this.next()) {
        if (this.char === '"') {
          this.next();
          return string;
        }
        if (this.char === '\\') {
          this.next();
          if (this.char === 'u') {
            uffff = 0;
            for (i = 0; i < 4; i += 1) {
              hex = parseInt(this.next(), 16);
              if (!isFinite(hex)) break;
              uffff = uffff * 16 + hex;
            }
            string += String.fromCharCode(uffff);
          } else if (typeof escapee[this.char] === 'string') {
            string += escapee[this.char];
          } else {
            break;
          }
        } else {
          string += this.char;
        }
      }
    }
    throw new SyntaxError("Bad string");
  };

  // Handles all objects (JSON)
  handleObject() {
    let key;
    let obj = {};

    if (this.char === '{') {
      this.next('{');
      this.white();
      if (this.char === '}') {
        this.next('}');
        return obj;
      }
      while (this.char) {
        key = this.handleString();
        this.white();
        this.next(':');
        if (Object.hasOwnProperty.call(obj, key)) {
          throw new Error(`Duplicate key: ${key}`);
        }
        obj[key] = this.determineType();
        this.white();
        if (this.char === '}') {
          this.next('}');
          return obj;
        }
        this.next(',');
        this.white();
      }
    }
    throw new Error('Bad object')
  }

  // Determines what kind of data type we are dealing with
  determineType() {
    this.white();
    if (/\D/.test(this.string.charAt(0))) return this.handleStringsOnly();
    switch (this.char.toLowerCase()) {
      case '{':
        return this.handleObject();
      case '[':
        return this.handleArray();
      case '"':
        return this.handleString();
      case '-':
        return this.handleNumber()
      default:
        return this.char >= '0' && this.char <= '9' ? this.handleNumber() : this.handleSpecialWord();
    }
  }
}

function parse(str) {
  // New instance of Parser class
  const newParser = new Parser(str);
  // Return the result of depending on data type
  const ret = newParser.determineType();
  console.log(typeof ret)
}

console.log('YOURS:', parse("123"), '\n', 'SHOULD BE:' ,123, '\n------------------------\n');
console.log('YOURS:', parse('{"a":[1,2]}'), '\n', 'SHOULD BE:' ,{ a: [1, 2] }, '\n------------------------\n');
console.log('YOURS:', parse('[{"a":{"b":3},"c":2},{"a":{"b":99},"c":4}]'), '\n', 'SHOULD BE:' ,[{"a":{"b":3},"c":2},{"a":{"b":99},"c":4}], '\n------------------------\n');
console.log('YOURS:', parse('[ 1  , 3, 2 ]'), '\n', 'SHOULD BE:', [ 1  , 3, 2 ], '\n------------------------\n');
console.log('YOURS:', parse('0'), '\n', 'SHOULD BE:', 0, '\n------------------------\n');
console.log('YOURS:', parse('foo'), '\n', 'SHOULD BE:', 'foo', '\n------------------------\n');
console.log('YOURS:', parse('{"web-app":{"servlet":[{"servlet-name":"cofaxCDS","servlet-class":"org.cofax.cds.CDSServlet","init-param":{"configGlossary:installationAt":"Philadelphia, PA","configGlossary:adminEmail":"ksm@pobox.com","configGlossary:poweredBy":"Cofax","configGlossary:poweredByIcon":"/images/cofax.gif","configGlossary:staticPath":"/content/static","templateProcessorClass":"org.cofax.WysiwygTemplate","templateLoaderClass":"org.cofax.FilesTemplateLoader","templatePath":"templates","templateOverridePath":"","defaultListTemplate":"listTemplate.htm","defaultFileTemplate":"articleTemplate.htm","useJSP":false,"jspListTemplate":"listTemplate.jsp","jspFileTemplate":"articleTemplate.jsp","cachePackageTagsTrack":200,"cachePackageTagsStore":200,"cachePackageTagsRefresh":60,"cacheTemplatesTrack":100,"cacheTemplatesStore":50,"cacheTemplatesRefresh":15,"cachePagesTrack":200,"cachePagesStore":100,"cachePagesRefresh":10,"cachePagesDirtyRead":10,"searchEngineListTemplate":"forSearchEnginesList.htm","searchEngineFileTemplate":"forSearchEngines.htm","searchEngineRobotsDb":"WEB-INF/robots.db","useDataStore":true,"dataStoreClass":"org.cofax.SqlDataStore","redirectionClass":"org.cofax.SqlRedirection","dataStoreName":"cofax","dataStoreDriver":"com.microsoft.jdbc.sqlserver.SQLServerDriver","dataStoreUrl":"jdbc:microsoft:sqlserver://LOCALHOST:1433;DatabaseName=goon","dataStoreUser":"sa","dataStorePassword":"dataStoreTestQuery","dataStoreTestQuery":"SET NOCOUNT ON;select test=\'test\';","dataStoreLogFile":"/usr/local/tomcat/logs/datastore.log","dataStoreInitConns":10,"dataStoreMaxConns":100,"dataStoreConnUsageLimit":100,"dataStoreLogLevel":"debug","maxUrlLength":500}},{"servlet-name":"cofaxEmail","servlet-class":"org.cofax.cds.EmailServlet","init-param":{"mailHost":"mail1","mailHostOverride":"mail2"}},{"servlet-name":"cofaxAdmin","servlet-class":"org.cofax.cds.AdminServlet"},{"servlet-name":"fileServlet","servlet-class":"org.cofax.cds.FileServlet"},{"servlet-name":"cofaxTools","servlet-class":"org.cofax.cms.CofaxToolsServlet","init-param":{"templatePath":"toolstemplates/","log":1,"logLocation":"/usr/local/tomcat/logs/CofaxTools.log","logMaxSize":"","dataLog":1,"dataLogLocation":"/usr/local/tomcat/logs/dataLog.log","dataLogMaxSize":"","removePageCache":"/content/admin/remove?cache=pages&id=","removeTemplateCache":"/content/admin/remove?cache=templates&id=","fileTransferFolder":"/usr/local/tomcat/webapps/content/fileTransferFolder","lookInContext":1,"adminGroupID":4,"betaServer":true}}],"servlet-mapping":{"cofaxCDS":"/","cofaxEmail":"/cofaxutil/aemail/*","cofaxAdmin":"/admin/*","fileServlet":"/static/*","cofaxTools":"/tools/*"},"taglib":{"taglib-uri":"cofax.tld","taglib-location":"/WEB-INF/tlds/cofax.tld"}}}'), '\n\n\n', {"web-app":{"servlet":[{"servlet-name":"cofaxCDS","servlet-class":"org.cofax.cds.CDSServlet","init-param":{"configGlossary:installationAt":"Philadelphia, PA","configGlossary:adminEmail":"ksm@pobox.com","configGlossary:poweredBy":"Cofax","configGlossary:poweredByIcon":"/images/cofax.gif","configGlossary:staticPath":"/content/static","templateProcessorClass":"org.cofax.WysiwygTemplate","templateLoaderClass":"org.cofax.FilesTemplateLoader","templatePath":"templates","templateOverridePath":"","defaultListTemplate":"listTemplate.htm","defaultFileTemplate":"articleTemplate.htm","useJSP":false,"jspListTemplate":"listTemplate.jsp","jspFileTemplate":"articleTemplate.jsp","cachePackageTagsTrack":200,"cachePackageTagsStore":200,"cachePackageTagsRefresh":60,"cacheTemplatesTrack":100,"cacheTemplatesStore":50,"cacheTemplatesRefresh":15,"cachePagesTrack":200,"cachePagesStore":100,"cachePagesRefresh":10,"cachePagesDirtyRead":10,"searchEngineListTemplate":"forSearchEnginesList.htm","searchEngineFileTemplate":"forSearchEngines.htm","searchEngineRobotsDb":"WEB-INF/robots.db","useDataStore":true,"dataStoreClass":"org.cofax.SqlDataStore","redirectionClass":"org.cofax.SqlRedirection","dataStoreName":"cofax","dataStoreDriver":"com.microsoft.jdbc.sqlserver.SQLServerDriver","dataStoreUrl":"jdbc:microsoft:sqlserver://LOCALHOST:1433;DatabaseName=goon","dataStoreUser":"sa","dataStorePassword":"dataStoreTestQuery","dataStoreTestQuery":"SET NOCOUNT ON;select test=\'test\';","dataStoreLogFile":"/usr/local/tomcat/logs/datastore.log","dataStoreInitConns":10,"dataStoreMaxConns":100,"dataStoreConnUsageLimit":100,"dataStoreLogLevel":"debug","maxUrlLength":500}},{"servlet-name":"cofaxEmail","servlet-class":"org.cofax.cds.EmailServlet","init-param":{"mailHost":"mail1","mailHostOverride":"mail2"}},{"servlet-name":"cofaxAdmin","servlet-class":"org.cofax.cds.AdminServlet"},{"servlet-name":"fileServlet","servlet-class":"org.cofax.cds.FileServlet"},{"servlet-name":"cofaxTools","servlet-class":"org.cofax.cms.CofaxToolsServlet","init-param":{"templatePath":"toolstemplates/","log":1,"logLocation":"/usr/local/tomcat/logs/CofaxTools.log","logMaxSize":"","dataLog":1,"dataLogLocation":"/usr/local/tomcat/logs/dataLog.log","dataLogMaxSize":"","removePageCache":"/content/admin/remove?cache=pages&id=","removeTemplateCache":"/content/admin/remove?cache=templates&id=","fileTransferFolder":"/usr/local/tomcat/webapps/content/fileTransferFolder","lookInContext":1,"adminGroupID":4,"betaServer":true}}],"servlet-mapping":{"cofaxCDS":"/","cofaxEmail":"/cofaxutil/aemail/*","cofaxAdmin":"/admin/*","fileServlet":"/static/*","cofaxTools":"/tools/*"},"taglib":{"taglib-uri":"cofax.tld","taglib-location":"/WEB-INF/tlds/cofax.tld"}}});
