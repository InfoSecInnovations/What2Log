export const state = () => ({
  logpile: {
    enable: {},
    disable: {},
    view: {},
    check: {}
  }
})

export const mutations = {
  setScriptStatus: (state, {path, script_type, status}) => state.logpile[script_type][path] = status
}

export const getters = {
  getScriptStatus: state => (path, script_type) => state.logpile[script_type][path]
}