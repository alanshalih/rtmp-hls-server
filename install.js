var dns = require("dns")

var fs = require('fs');
const { exec } = require('child_process');

dns.lookup(require('os').hostname(), function (err, add, fam) {   

    dns.reverse(add,(err,data)=>{

    const domain = data[0];

    exec('certbot --nginx -d '+domain+' --non-interactive --agree-tos  --email bisnis.maulanashalihin@gmail.com', (err, stdout, stderr) => {
        if (err) {
          return;
        }
        console.log(stdout)
      });

    var content = `
    add_header Cache-Control no-cache; # Disable cache
			
    # CORS setup
    add_header 'Access-Control-Allow-Origin' '*' always;
    add_header 'Access-Control-Expose-Headers' 'Content-Length';
`
    fs.writeFile('/etc/nginx/conf.d/cors.conf', content , function (err) {
    if (err) throw err;
    console.log('Saved!');
    exec('service nginx reload', (err, stdout, stderr) => {
        if (err) {
          return;
        }
        console.log(stdout)
      });
    });


    })

 })
