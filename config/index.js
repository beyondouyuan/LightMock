/*
* @Author: beyondouyuan
* @Date:   2019-01-24 13:42:02
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2019-03-01 15:33:34
* @E-mail: beyondouyuan@gmail.com
* @Github: https://beyondouyuan.github.io/
* @description: 写代码就像写诗一样
* @version: 1.0.0
*/



export default {
  /**
   * 站点基本信息
   */
  // 站点环境
  dev: (process.env.NODE_ENV !== 'production'),
  // 站点域名
  host: '0.0.0.0',
  // 站点端口
  port: 3000,
  // api版本
  APIVersionURL: '/v1',
  // api路径
  baseAPIURL: '',

  /**
   * 后台设置信息
   */

  // 日志路径
  logDir: '/',

  /**
   * 数据库配置
   */
  TEST_DB_URL: 'mongodb://127.0.0.1:27017/light-creater-test',
  PROD_DB_URL: 'mongodb://127.0.0.1:27017/light-creater-prod',
  DB_NAME: 'light-creater',
  DB_HOST: '127.0.0.1',
  DB_PORT: 27017,
  DB_USERNAME: 'ouyuan',
  DB_PASSWORD: 'ouyuan',

  /**
   * cookie配置
   */

  secret: 'light-creater',
  resave: false,
  saveUninitialized: false,
  maxAge: 1000 * 60 * 60 * 24
}
