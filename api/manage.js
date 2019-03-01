/*
* @Author: beyondouyuan
* @Date:   2019-01-24 13:31:47
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2019-03-01 17:45:31
* @E-mail: beyondouyuan@gmail.com
* @Github: https://beyondouyuan.github.io/
* @description: 写代码就像写诗一样
* @version: 1.0.0
*/

import { Router } from 'express'

import ManageController from '../controllers/manage'

const router = Router()

router.get('/manage',  ManageController.list)
router.get('/manage/:keyword',  ManageController.get)
router.get('/repeat',  ManageController.repeat)
router.post('/manage',  ManageController.create)
router.delete('/manage',  ManageController.delete)
router.put('/manage',  ManageController.update)

export default router
