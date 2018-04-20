/*
	后台管理
	/
系统
	\
	系统管理
*/
import backStage from '../backStage/index.js'
import system from '../system/index.js'

const model = Object.assign(
    {},
    backStage,
    system
)

module.exports = model
