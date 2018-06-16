import {
  findAllTopic,
  findTopicById,
  findAllUnrevierTopic,
  sevenDaysTopicChange,
  updateTopicState } from '@/api/topic'

const topic = {
  state: {
    topic: {},
    topics: [],
    totalPages: 0,
    unRevierTopics: [],
    sevenDaysTopicChangeArr: []
  },
  mutations: {
    FIND_ALL_TOPIC: (state, topics) => {
      state.topics = topics
    },
    FIND_TOPIC_BY_ID: (state, topic) => {
      state.topic = topic
    },
    FIND_ALL_UNREVIEW_TOPIC: (state, unRevierTopics) => {
      state.unRevierTopics = unRevierTopics
    },
    UPDATE_TOPIC_STATE: (state, { id, s }) => {
      state.unRevierTopics = state.unRevierTopics.filter(item => item.id !== id)
      if (s === -2) {
        state.topics = state.topics.filter(item => item.id !== id)
      } else {
        let topic = state.topics.find(item => item.id === id)
        console.log(topic)
        topic.state = s
      }
      state.topic.state = s
    },
    SEVEN_DAYS_TOPIC_CHANGE: (state, sevenDaysTopicChangeArr) => {
      state.sevenDaysTopicChangeArr = sevenDaysTopicChangeArr
    }
  },
  actions: {
    FindAllTopic ({ commit }) {
      return new Promise((resolve, reject) => {
        findAllTopic().then(data => {
          commit('FIND_ALL_TOPIC', data.data)
          resolve(data)
        }).catch(err => reject(err))
      })
    },
    FindTopicById ({ commit }, { id }) {
      return new Promise((resolve, reject) => {
        commit('FIND_TOPIC_BY_ID', {})
        findTopicById({ id }).then(data => {
          commit('FIND_TOPIC_BY_ID', data.data)
          resolve(data)
        }).catch(err => reject(err))
      })
    },
    FindAllUnrevierTopic ({ commit }) {
      return new Promise((resolve, reject) => {
        findAllUnrevierTopic().then(data => {
          commit('FIND_ALL_UNREVIEW_TOPIC', data.data)
          resolve(data)
        }).catch(err => reject(err))
      })
    },
    UpdateTopicState ({ commit }, { id, state }) {
      return new Promise((resolve, reject) => {
        updateTopicState({ id, state }).then(data => {
          commit('UPDATE_TOPIC_STATE', { id, s: state })
          resolve(data)
        }).catch(err => reject(err))
      })
    },
    SevenDaysTopicChange ({ commit }) {
      return new Promise((resolve, reject) => {
        sevenDaysTopicChange().then(data => {
          commit('SEVEN_DAYS_TOPIC_CHANGE', data.data)
          resolve(data)
        }).catch(err => reject(err))
      })
    }
  }
}

export default topic
