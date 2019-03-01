/*
* @Author: beyondouyuan
* @Date:   2019-02-15 00:26:24
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2019-03-01 17:57:47
* @E-mail: beyondouyuan@gmail.com
* @Github: https://beyondouyuan.github.io/
* @description: 写代码就像写诗一样
* @version: 1.0.0
*/

import config from '../config'
/**
 * [格式化请求响应数据]
 * @method    renderApiData
 * @Author    beyondouyuan
 * @date      2019-03-01
 * @DateTime  2019-03-01T17:53:34+0800
 * @copyright All                  Rights          Reserved      beyondouyuan
 * @version   1.0.0
 * @param     {object}                 req             [请求上下文]
 * @param     {object}                 res             [响应上下文]
 * @param     {number}                 responseCode    [响应码]
 * @param     {string}                 responseMessage [响应信息]
 * @param     {Object}                 data            [响应数据]
 * @return    {object}                                 [格式化响应数据]
 */
export const renderApiData = (req, res, responseCode, responseMessage, data = {}) => {
  const responseData = {
    status: responseCode,
    code: responseCode,
    success: true,
    message: responseMessage,
    request_time: (new Date()).getTime(),
    data
  }
  return responseData
}

/**
 * [格式化请求错误数据]
 * @method    renderApiError
 * @Author    beyondouyuan
 * @date      2019-03-01
 * @DateTime  2019-03-01T17:53:46+0800
 * @copyright All                  Rights          Reserved      beyondouyuan
 * @version   1.0.0
 * @param     {object}                 req             [请求上下文]
 * @param     {object}                 res             [响应上下文]
 * @param     {number}                 responseCode    [响应码]
 * @param     {string}                 responseMessage [响应信息]
 * @return    {object}                                 [响应参数]
 */
export const renderApiError = (req, res, responseCode, responseMessage ) => {
  if (typeof responseMessage == 'object') {
    responseMessage = config.dev ? responseMessage : '发生未知错误！'
  }
  const responseData = {
    status: responseCode,
    code: responseCode,
    success: false,
    message: responseMessage,
    request_time: (new Date()).getTime(),
    data: {}

  }
  return responseData
}
/**
 * [获取api地址]
 * @method    getClientIP
 * @Author    beyondouyuan
 * @date      2019-03-01
 * @DateTime  2019-03-01T17:53:56+0800
 * @copyright All                  Rights Reserved      beyondouyuan
 * @version   1.0.0
 * @param     {object}                 req    [请求上下文]
 * @return    {string}                        [返回请求api]
 */
export const getClientIP = req => {
  return req.headers['x-forwarded-for'] ||
   req.connection.remoteAddress ||
   req.socket.remoteAddress ||
   req.connection.socket.remoteAddress ||
   ''
}