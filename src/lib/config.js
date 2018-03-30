import store from 'store'

/**
 * This config helps to get and set - network
 */
export default {
  set(key, value, expires = 86400) {
    store.set(key, {
      value,
      expired_at: +new Date + expires * 1000
    })
  },
  get(key, defaultValue) {
    let temp = store.get(key)
    try {
      let value = temp.value
      if (value === undefined || temp.expired_at < +new Date) {
        return defaultValue
      }
      return value
    } catch (e) {
      return defaultValue
    }
  },
  getNetwork() {
    return this.get('network', 'testnet')
  },
  setNetwork(value) {
    return this.set('network', value);
  }
}
