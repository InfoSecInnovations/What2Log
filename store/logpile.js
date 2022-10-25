export const state = () => ({})

export const mutations = {
  setScriptStatus: (state, {platform, category, slug, script_type, status}) => {
    if (!state[platform]) state[platform] = {}
    if (!state[platform][category]) state[platform][category] = {}
    if (!state[platform][category][slug]) state[platform][category][slug] = {}
    state[platform][category][slug][script_type] = status
  },
  reset: state => Object.keys(state).forEach(key => state[key] = undefined)
}

export const getters = {
  getScriptStatus: state => ({platform, category, slug, script_type}) => state[platform] && state[platform][category] && state[platform][category][slug] && state[platform][category][slug][script_type]
}