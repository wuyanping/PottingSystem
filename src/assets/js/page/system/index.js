/*
		系统管理用户管理（sysman）
		/
系统管理
		\
		系统日志管理 （log）
*/
import sysman from './sysman'
import log from './log'

const system = Object.assign(
    {},
    sysman,
    log
)

module.exports = {
    system: system
}
