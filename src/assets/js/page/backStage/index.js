/*
		用户信息管理（user）
		/
后台管理
		\
		盆栽管理 （pot） --> 盆栽详情（pottingDetail）
*/
import user from './user'
import pot from './pot'
import potDetail from './potDetail'

const backStage = Object.assign(
    {},
    user,
    pot,
    potDetail
)

module.exports = {
    backStage: backStage
}
