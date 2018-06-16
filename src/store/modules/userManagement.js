import { findAllUser, sevenDaysUserChange, searchUser, addUser, findAllRole, changeRole, findAmount } from '@/api/userManagement'

const userManagement = {
  state: {
    users: [],
    totalPages: 0,
    roleList: [],
    sevenDaysUserChangeArr: []
  },
  mutations: {
    FIND_ALL_USER: (state, users) => {
      state.users = users.filter(user => user.id !== JSON.parse(localStorage.user).id)
    },
    SEVEN_DAYS_USER_CHANGE: (state, sevenDaysUserChangeArr) => {
      state.sevenDaysUserChangeArr = sevenDaysUserChangeArr
    },
    SEARCH_USER: (state, data) => {
      state.users = data.content
      state.totalPages = data.totalPages
    },
    FIND_ALL_ROLE: (state, roleList) => {
      state.roleList = roleList
    },
    CHANGE_ROLE: (state, { userId, roleList }) => {
      state.users.find(user => user.id === userId).roleList = roleList
    }
  },
  actions: {
    FindAllUser ({ commit }) {
      return new Promise((resolve, reject) => {
        findAllUser().then(data => {
          commit('FIND_ALL_USER', data.data)
          resolve(data)
        }).catch(err => reject(err))
      })
    },
    SevenDaysUserChange ({ commit }) {
      return new Promise((resolve, reject) => {
        sevenDaysUserChange().then(data => {
          commit('SEVEN_DAYS_USER_CHANGE', data.data)
          resolve(data)
        }).catch(err => reject(err))
      })
    },
    SearchUser ({ commit }, { username, phone, pageNum }) {
      return new Promise((resolve, reject) => {
        searchUser({ username, phone, pageNum }).then(data => {
          commit('SEARCH_USER', data.data)
          resolve(data)
        }).catch(err => reject(err))
      })
    },
    AddUser ({ commit }, { username, phone }) {
      return new Promise((resolve, reject) => {
        addUser({ username, phone }).then(data => {
          // commit('ADD_USER', data.data)
          resolve(data)
        }).catch(err => reject(err))
      })
    },
    FindAllRole ({ commit }) {
      return new Promise((resolve, reject) => {
        findAllRole().then(data => {
          commit('FIND_ALL_ROLE', data.data)
          resolve(data)
        }).catch(err => reject(err))
      })
    },
    ChangeRole ({ commit }, { userId, roleIds }) {
      return new Promise((resolve, reject) => {
        changeRole({ userId, roleIds }).then(data => {
          commit('CHANGE_ROLE', { userId, roleList: data.data })
          resolve(data)
        }).catch(err => reject(err))
      })
    },
    FindAmount ({ commit }) {
      return new Promise((resolve, reject) => {
        findAmount().then(res => {
          resolve(res)
        }).catch(res => {
          reject(res)
        })
      })
    }
  }
}

export default userManagement
