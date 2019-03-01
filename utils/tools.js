/*
 * @Author: beyondouyuan
 * @Date:   2019-02-15 00:26:34
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2019-03-01 17:53:21
 * @E-mail: beyondouyuan@gmail.com
 * @Github: https://beyondouyuan.github.io/
 * @description: 写代码就像写诗一样
 * @version: 1.0.0
 */


import fs from 'fs'
import path from 'path'

/**
 * [保存api关系表]
 * @method    saveData
 * @Author    beyondouyuan
 * @date      2019-03-01
 * @DateTime  2019-03-01T17:51:42+0800
 * @copyright All                  Rights Reserved      beyondouyuan
 * @version   1.0.0
 * @param     {object}                 data   [请求参数]
 * @return    {object}                        [响应参数]
 */
export const saveData = data => {
  //存储文件名和url到apilist文件
  const dataPath = './public/data/apilist.json',
    read = new Promise(function(resolve, reject) {
      resolve(fs.readFileSync(dataPath))
    });

  const dataWrite = new Promise(function(resolve, reject) {
    read.then(function(response) {
      let list = JSON.parse(response).dataList,
        new_arr = data.del ? [] : [{
          "name": data.name,
          "url": data.url,
          "multi": data.multi || false
        }]; //如果是删除则不需要这个新的数据
      //合并json
      if (list) {
        for (let i = 0; i < list.length; i++) {
          //比较url，url不能重复
          if (data.url != list[i].url) {
            new_arr.push(list[i])
            continue;
          }
        }
      }
      resolve(fs.writeFileSync(dataPath, JSON.stringify({
        "warn": "存放所有的关系表，建议不要手动修改",
        "dataList": new_arr
      })))
    }).catch(function(response) {
      resolve(fs.writeFileSync(dataPath, JSON.stringify({
        "warn": "存放所有的关系表，建议不要手动修改",
        "dataList": [{
          "name": data.name,
          "url": data.url
        }]
      })))
    })
  })
  dataWrite.then(function() {

  }).catch(function() {

  })
}

/**
 * [处理多级url]
 * @method    transferApiToName
 * @Author    beyondouyuan
 * @date      2019-03-01
 * @DateTime  2019-03-01T17:52:38+0800
 * @copyright All                  Rights Reserved      beyondouyuan
 * @version   1.0.0
 * @param     {string}                 url    [处理的url]
 * @return    {object}                        [响应参数]
 */
export const transferApiToName = url => {
  //multi 代表多级url
  let multi = false
  if (/\//.test(url)) {
    multi = true
  }
  return {
    fileName: url.replace(/\//g, "."),
    url: url,
    multi: multi
  }
}
