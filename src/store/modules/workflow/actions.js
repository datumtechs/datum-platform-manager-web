// @ts-ignore
import { projectApi } from 'apis'

const actions = {
  async saveOrgs ({ commit }, params) {
    const res = await projectApi
      .getAllAuthOrganization({
        projectId: params
      })
    const { data, code } = res
    if (code === 10000) {
      commit('SET_ORGS', data)
    }
    // .then(res => {

    // })
  }
}

export default actions
