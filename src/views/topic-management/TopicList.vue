<template>
  <div>
    <el-table
      :data="topics">
      <el-table-column
        width="80"
        prop="id"
        :label="$t('table.id')">
      </el-table-column>
      <el-table-column
        prop="title"
        :label="$t('table.title')">
      </el-table-column>
      <el-table-column
        width="150"
        prop="username"
        :label="$t('table.submitUser')">
      </el-table-column>
      <el-table-column
        width="150"
        prop="upvoteNum"
        :label="$t('table.upvoteNum')">
      </el-table-column>
      <el-table-column
        width="150"
        prop="commentNum"
        :label="$t('table.commentNum')">
      </el-table-column>
      <el-table-column
        width="100"
        :label="$t('table.state')">
        <template slot-scope="scope">
          <el-tag :type="stateType[scope.row.state]">{{ state[scope.row.state] }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="gmtCreate"
        :label="$t('table.submitTime')">
      </el-table-column>
      <el-table-column
        fixed="right"
        :label="$t('table.operation')"
        width="100">
        <template slot-scope="scope">
          <el-button
            @click="goToTopicPage(scope.row.id)"
            type="text"
            size="small">
            {{ $t('btn.check') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'topicList',
  data () {
    return {
      stateType: ['warning', 'success', 'danger']
    }
  },
  computed: {
    ...mapGetters({
      topics: 'topics'
    }),
    state () {
      return [
        this.$t('topicState.unReview'),
        this.$t('topicState.ok'),
        this.$t('topicState.reject'),
        this.$t('topicState.del')
      ]
    }
  },
  mounted () {
    this.findAllTopic().then(res => {
    })
  },
  methods: {
    ...mapActions({
      findAllTopic: 'FindAllTopic'
    }),
    goToTopicPage (id) {
      this.$router.push({
        path: '/topicManagement/topic',
        query: {
          id
        }
      })
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
