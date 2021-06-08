export const state = () => ({
  logpile: {
    enable: {},
    disable: {},
    view: {},
    check: {}
  }
})

// TODO: track which OS the script is from
export const mutations = {
  setScriptStatus: (state, {os, slug, script_type, status}) => {
    if (!state.logpile[script_type][os]) state.logpile[script_type][os] = {}
    state.logpile[script_type][os][slug] = status
  } 
}

export const getters = {
  getScriptStatus: state => (os, slug, script_type) => state.logpile[script_type][os] && state.logpile[script_type][os][slug]
}