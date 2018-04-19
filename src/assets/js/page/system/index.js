import systemUser from './systemUser'
import log from './log'

const system = Object.assign(
    {},
    systemUser,
    log
)

module.exports = {
    system: system
}
