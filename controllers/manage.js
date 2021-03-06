/*
 * @Author: beyondouyuan
 * @Date:   2019-01-24 12:40:15
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2019-03-01 17:50:52
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
  saveData,
  transferApiToName,
} from '../utils/tools'

export default {
  /**
   * [create 创建api接口]
   * @method    create
   * @Author    beyondouyuan
   * @date      2019-03-01
   * @DateTime  2019-03-01T17:46:52+0800
   * @copyright All                  Rights Reserved      beyondouyuan
   * @version   1.0.0
   * @param     {object}                 req    [请求上下文]
   * @param     {object}                 res    [响应参数]
   * @param     {Function}               next   [路由控制]
   * @return    {object}                        [请求响应]
   */
  async create(req, res, next) {
    const apiName = req.body.name.replace(/\s/g, ""),
      apiUrl = transferApiToName(req.body.url.replace(/\s/g, "")),
      data = req.body.data,
      dataPath = './public/data/' + apiUrl.fileName + '.json';
    if (apiName && apiUrl) {
      // 将json文件写入本地
      const read = new Promise(function(resolve, reject) {
        resolve(fs.writeFileSync(dataPath, data))
      });
      //把新的关系表保存到apilist.json
      saveData({
        name: apiName,
        url: apiUrl.url,
        multi: apiUrl.multi
      })
      read.then(response => {
        return res.send(renderApiData(req, res, 200, '接口创建成功', {}))
      }).catch(err => {
        return res.send(renderApiError(req, res, 500, err))
      })
    } else {
      return res.send(renderApiError(req, res, 500, err, {
        message: '参数出错'
      }))
    }
  },
  /**
   * [get 根据关键词搜索api]
   * @method    get
   * @Author    beyondouyuan
   * @date      2019-03-01
   * @DateTime  2019-03-01T17:47:24+0800
   * @copyright All                  Rights Reserved      beyondouyuan
   * @version   1.0.0
   * @param     {object}                 req    [请求上下文]
   * @param     {object}                 res    [响应参数]
   * @param     {Function}               next   [路由控制]
   * @return    {object}                        [请求响应]
   */
  async get(req, res, next) {
    const keyword = req.params.keyword.replace(/\s/g, ""),
      jsonName = './public/data/apilist.json';
    const read = new Promise(function(resolve, reject) {
      resolve(fs.readFileSync(jsonName))
    });
    read.then(response => {
      response = JSON.parse(response);
      if (response.dataList) {
        const list = response.dataList,
          new_arr = [];
        for (let i = 0; i < list.length; i++) {
          if (list[i].name.match(keyword) || list[i].url.match(keyword)) {
            new_arr.push(list[i])
          }
        }
        if (new_arr.length) {
          const result = {
            list: new_arr
          }
          return res.send(renderApiData(req, res, 200, '接口获取成功', result))
        } else {
          const result = {
            list: []
          }
          return res.send(renderApiData(req, res, 200, '接口获取成功', result))
        }
      } else {
        const result = {
          list: []
        }
        return res.send(renderApiData(req, res, 200, '接口获取失败', result))
      }
    }).catch(err => {
      return res.send(renderApiError(req, res, 500, err))
    })
  },
  /**
   * [list 获取已创建的api列表]
   * @method    list
   * @Author    beyondouyuan
   * @date      2019-03-01
   * @DateTime  2019-03-01T17:47:59+0800
   * @copyright All                  Rights Reserved      beyondouyuan
   * @version   1.0.0
   * @param     {object}                 req    [请求上下文]
   * @param     {object}                 res    [响应参数]
   * @param     {Function}               next   [路由控制]
   * @return    {object}                        [请求响应]
   */
  async list(req, res, next) {
    try {
      const dataPath = './public/data/apilist.json',
        read = new Promise(function(resolve, reject) {
          resolve(fs.readFileSync(dataPath))
        });
      read.then(function(response) {
        response = JSON.parse(response);
        if (response.dataList) {
          const result = {
            hasApi: true,
            list: response.dataList
          }
          return res.send(renderApiData(req, res, 200, '接口列表获取成功', result))
        } else {
          const result = {
            hasApi: false,
            list: []
          }
          return res.send(renderApiData(req, res, 200, '接口列表获取成功', result))
        }
      })
    } catch (err) {
      return res.send(renderApiError(req, res, 500, err))
    }
  },
  /**
   * [delete 删除api]
   * @method    delete
   * @Author    beyondouyuan
   * @date      2019-03-01
   * @DateTime  2019-03-01T17:48:25+0800
   * @copyright All                  Rights Reserved      beyondouyuan
   * @version   1.0.0
   * @param     {object}                 req    [请求上下文]
   * @param     {object}                 res    [响应参数]
   * @param     {Function}               next   [路由控制]
   * @return    {object}                        [请求响应]
   */
  async delete(req, res, next) {
    const jsonUrl = transferApiToName(req.body.url.replace(/\s/g, ""))
    const jsonName = './public/data/' + jsonUrl.fileName + '.json'
    const del = new Promise(function(resolve, reject) {
      resolve(fs.unlinkSync(jsonName))
    })
    saveData({
      name: jsonName,
      url: jsonUrl.url,
      multi: jsonUrl.multi,
      del: true
    })
    del.then(response => {
      return res.send(renderApiData(req, res, 200, '接口删除成功', {}))
    }).catch(err => {
      return res.send(renderApiError(req, res, 500, err))
    })
  },
  /**
   * [repeat 查询接口名是否重复]
   * @method    repeat
   * @Author    beyondouyuan
   * @date      2019-03-01
   * @DateTime  2019-03-01T17:48:45+0800
   * @copyright All                  Rights Reserved      beyondouyuan
   * @version   1.0.0
   * @param     {object}                 req    [请求上下文]
   * @param     {object}                 res    [响应参数]
   * @param     {Function}               next   [路由控制]
   * @return    {object}                        [请求响应]
   */
  async repeat(req, res, next) {
    const apiurl = req.query.apiurl.replace(/\s/g, ""),
      jsonName = './public/data/apilist.json',
      read = new Promise(function(resolve, reject) {
        resolve(fs.readFileSync(jsonName))
      });
    read.then(response => {
      response = JSON.parse(response);
      if (response.dataList) {
        const list = response.dataList;
        for (let i = 0; i < list.length; i++) {
          if (list[i].url == apiurl) {
            return res.send(renderApiData(req, res, 200, '接口查询成功', {
              repeat: true
            }))
          }
        }
        return res.send(renderApiData(req, res, 200, '接口查询成功', {
          repeat: false
        }))
      } else {
        return res.send(renderApiData(req, res, 200, '接口查询成功', {
          repeat: false
        }))
      }
    }).catch(err => {
      return res.send(renderApiError(req, res, 500, err))
    })
  },
  /**
   * [update 更新接口]
   * @method    update
   * @Author    beyondouyuan
   * @date      2019-03-01
   * @DateTime  2019-03-01T17:49:05+0800
   * @copyright All                  Rights Reserved      beyondouyuan
   * @version   1.0.0
   * @param     {object}                 req    [请求上下文]
   * @param     {object}                 res    [响应参数]
   * @param     {Function}               next   [路由控制]
   * @return    {object}                        [请求响应]
   */
  async update(req, res, next) {
    const apiName = req.body.name.replace(/\s/g, ""),
      apiUrl = transferApiToName(req.body.url.replace(/\s/g, "")),
      data = req.body.data,
      dataPath = './public/data/' + apiUrl.fileName + '.json';
    if (apiName && apiUrl) {
      // 将json文件写入本地
      const read = new Promise(function(resolve, reject) {
        resolve(fs.writeFileSync(dataPath, data))
      });
      //把新的关系表保存到apilist.json
      saveData({
        name: apiName,
        url: apiUrl.url,
        multi: apiUrl.multi
      })
      read.then(response => {
        return res.send(renderApiData(req, res, 200, '接口更新成功', {}))
      }).catch(err => {
        return res.send(renderApiError(req, res, 500, err))
      })
    } else {
      return res.send(renderApiError(req, res, 500, err, {
        message: '参数出错'
      }))
    }
  }
}
