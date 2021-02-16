const express = require('express');
const cors = require('cors');
const app = express();
const config = require('./package.json');
const httpProxy = require('express-http-proxy');
const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORT;
const host = process.env.HOST;

app.use(cors());
app.use(httpProxy(`${host}`, {
  https: true,
  proxyReqOptDecorator: function(proxyReqOpts) {
    proxyReqOpts.rejectUnauthorized = false;
    return proxyReqOpts;
  },
  userResHeaderDecorator(headers, userReq, userRes, proxyReq, proxyRes) {
    headers['access-control-allow-origin'] = '*';
    return headers;
  }
}));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
