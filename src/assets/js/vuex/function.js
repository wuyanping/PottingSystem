const LocalEvent = function (item) {
    this.get = function () {
        return localStorage.getItem(item) ? JSON.parse(localStorage.getItem(item)) : ''
    }
    this.set = function (obj) {
        localStorage.setItem(item, JSON.stringify(obj))
    }
    this.clear = function () {
        localStorage.removeItem(item)
    }
}
export const headerSettingLocal = new LocalEvent('headerSetting')

export const modelLocal = new LocalEvent('record')

export const siderBarLocal = new LocalEvent('siderBar')
