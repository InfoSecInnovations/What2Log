const defaultState = () => ({
  enable: {},
  disable: {},
  view: {},
  check: {}
})

export const state = defaultState

export const mutations = {
  setScriptStatus: (state, {category, slug, script_type, status}) => {
    if (!state[script_type][category]) state[script_type][category] = {}
    state[script_type] = {...state[script_type], [`${category}-${slug}`]: status}
  },
  reset: state => Object.assign(state, defaultState())
}

export const getters = {
  getScriptStatus: state => (category, slug, script_type) => state[script_type][category] && state[script_type][`${category}-${slug}`]
}