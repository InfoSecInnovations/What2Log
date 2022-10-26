export const state = () => ({
  scriptStatus: {}
})

export const mutations = {
  setScriptStatus: (state, {platform, category, slug, script_type, status}) => {
    // if we don't do it like this, reactivity won't work and components won't update directly
    state.scriptStatus = {...state.scriptStatus, [`${platform}-${category}-${slug}-${script_type}`]: status}
  },
  reset: state => Object.assign(state, {scriptStatus: {}})
}

export const getters = {
  getScriptStatus: state => ({platform, category, slug, script_type}) => state.scriptStatus[`${platform}-${category}-${slug}-${script_type}`]
}