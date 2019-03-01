/*
 * @Author: beyondouyuan
 * @Date:   2019-01-24 12:40:09
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2019-03-01 17:51:15
 * @E-mail: beyondouyuan@gmail.com
 * @Github: https://beyondouyuan.github.io/
 * @description: 写代码就像写诗一样
 * @version: 1.0.0
 */

import fs from 'fs'
import {
  renderApiData,
  renderApiError,
  getClientIP
} from '../utils'

import {
  transferApiToName,
} from '../utils/tools'

export default {
  /**
   * [get 获取api数据]
   * @method    get
   * @Author    beyondouyuan
   * @date      2019-03-01
   * @DateTime  2019-03-01T17:51:01+0800
   * @copyright All                  Rights Reserved      beyondouyuan
   * @version   1.0.0
   * @param     {object}                 req    [请求上下文]
   * @param     {object}                 res    [响应参数]
   * @param     {Function}               next   [路由控制]
   * @return    {object}                        [请求响应]
   */
  async get(req, res, next) {
    //文件名称
    const jsonUrl = transferApiToName(req.params[0]),
      jsonName = './public/data/' + jsonUrl.fileName + 'json';
    const read = new Promise(function(resolve, reject) {
      resolve(fs.readFileSync(jsonName))
    });
    read.then(response => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
      res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
      const result = JSON.parse(response)
      return res.send(renderApiData(req, res, 200, '数据请求成功', result))
    }).catch(err => {
      return res.send(renderApiError(req, res, 500, err))
    })
  }
}
