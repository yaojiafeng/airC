export function getStorageSync(key, defaultValue) {
    try {
        var value = wx.getStorageSync(key)
        if (value) {
            return value
        } else {
            return defaultValue
        }
    } catch (e) {
        return defaultValue
    }
}

export function setStorageSync(key, value) {
    try {
        wx.setStorageSync(key, value)
    } catch (e) { }
}