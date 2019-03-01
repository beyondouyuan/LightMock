/*
* @Author: beyondouyuan
* @Date:   2019-01-24 13:34:10
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2019-03-01 16:02:05
* @E-mail: beyondouyuan@gmail.com
* @Github: https://beyondouyuan.github.io/
* @description: 写代码就像写诗一样
* @version: 1.0.0
*/

import { Router } from 'express'

import RequestController from '../controllers/request'

const router = Router()


router.get('/request/*',  RequestController.get)


export default router
