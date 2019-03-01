/*
 * @Author: beyondouyuan
 * @Date:   2019-01-24 13:36:45
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2019-02-28 17:44:24
 * @E-mail: beyondouyuan@gmail.com
 * @Github: https://beyondouyuan.github.io/
 * @description: 写代码就像写诗一样
 * @version: 1.0.0
 */

import {
  Router
} from 'express'


import manage from './manage'
import request from './request'

const router = Router()


router.use(manage)
router.use(request)

export default router
