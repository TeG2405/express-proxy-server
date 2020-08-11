const express = require('express');
const cors = require('cors');
const app = express();
const config = require('./package.json');
const httpProxy = require('express-http-proxy');

const port = process.env.PORT || config.prot;
const proxy = process.env.PROXY || config.proxy;
const login = process.env.LOGIN || config.login;
const password = process.env.PASSWORD || config.password;

app.use(cors());
app.use(httpProxy(`${proxy}`, {
  https: true,
  proxyReqOptDecorator: function(proxyReqOpts) {
    proxyReqOpts['auth'] = `${login}:${password}`;
    proxyReqOpts['Authorization'] = `Basic ${Buffer.from(`${login}:${password}`).toString('base64')}`;
    proxyReqOpts['Proxy-Authorization'] = `Basic ${Buffer.from(`${login}:${password}`).toString('base64')}`;
    return proxyReqOpts;
  }
}));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});