import userInfo from './userInfo'
import potting from './potting'
import pottingDetail from './pottingDetail'

const backStage = Object.assign(
    {},
    userInfo,
    potting,
    pottingDetail
)

module.exports = {
    backStage: backStage
}
