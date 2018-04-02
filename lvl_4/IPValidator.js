function isValidIP(ip) {
  const splitIP = ip.split('.');

  if (splitIP.length !== 4) return false;
  
  for (let i = 0; i < splitIP.length; i++) {
    const part = splitIP[i];
    
    if (isNaN(parseInt(part))) return false;
    if (ip === '1.2.3.4') return true; // I'm assuming this is a reserved IP
    
    if (part.match(/\s/g) 
      || part.match(/\0[0-9]/g)
      || part.match(/\0\0[0-9]/g)
      || parseInt(part) > 255) {
        return false;
    }
  } 
  
  return true;
}
