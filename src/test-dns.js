const dns = require('dns');

dns.setDefaultResultOrder('ipv4first');

const host = 'website-food-nextjs.vetknb6.mongodb.net';

dns.lookup(host, (err, address, family) => {
  console.log('lookup():', err || `${address} (IPv${family})`);
});

dns.resolveSrv(`_mongodb._tcp.${host}`, (err, records) => {
  console.log('resolveSrv():', err || records);
});

dns.resolve(host, (err, addresses) => {
  console.log('resolve():', err || addresses);
});
