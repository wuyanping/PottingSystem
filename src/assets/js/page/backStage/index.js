import userInfo from './userInfo'
import potting from './potting'

const backStage = Object.assign(
    {},
    userInfo,
    potting
)

module.exports = {
    backStage: backStage
}
