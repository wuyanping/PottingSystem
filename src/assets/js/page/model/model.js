/*
	盆栽信息提供管理
	/
系统 -后台管理
	\
	系统管理
*/
import backStage from '../backStage/index.js'
import system from '../system/index.js'
import potInfo from '../potInfo/index.js'

const model = Object.assign(
    {},
    backStage,
    system,
    potInfo
)

module.exports = model
