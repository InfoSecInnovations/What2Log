export const state = () => ({
  enable: {},
  disable: {},
  view: {},
  check: {}
})

// TODO: track which OS the script is from
export const mutations = {
  setScriptStatus: (state, {os, slug, script_type, status}) => {
    if (!state[script_type][os]) state[script_type][os] = {}
    state[script_type] = {...state[script_type], [`${os}-${slug}`]: status}
  } 
}

export const getters = {
  getScriptStatus: state => (os, slug, script_type) => state[script_type][os] && state[script_type][`${os}-${slug}`]
}