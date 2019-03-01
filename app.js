/*
* @Author: beyondouyuan
* @Date:   2019-02-15 00:26:06
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2019-03-01 16:02:47
* @E-mail: beyondouyuan@gmail.com
* @Github: https://beyondouyuan.github.io/
* @description: 写代码就像写诗一样
* @version: 1.0.0
*/

import express from 'express'
import bodyParser from 'body-parser'
import config from './config'
import path from 'path'
import api from './api'

const app = express()

const host = process.env.HOST || config.host
const port = process.env.PORT || config.port




app.use(express.static(path.join(__dirname, 'public')))
app.set('port', port)


config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  // CORS解决跨域问题
  app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With ');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if (req.method == 'OPTIONS') {
      res.sendStatus(200);
      /让options请求快速返回/
    } else {
      next();
    }
  })
  app.use(`/api${config.APIVersionURL}`, api)

  app.listen(port, host)
  console.log(`Server listening on ===>>>> http://${host}:${port}`)
}
start()
