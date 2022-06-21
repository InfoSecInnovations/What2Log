const defaultState = () => ({
  enable: {},
  disable: {},
  view: {},
  check: {}
})

export const state = defaultState

export const mutations = {
  setScriptStatus: (state, {os, slug, script_type, status}) => {
    if (!state[script_type][os]) state[script_type][os] = {}
    state[script_type] = {...state[script_type], [`${os}-${slug}`]: status}
  },
  reset: state => Object.assign(state, defaultState())
}

export const getters = {
  getScriptStatus: state => (os, slug, script_type) => state[script_type][os] && state[script_type][`${os}-${slug}`]
}