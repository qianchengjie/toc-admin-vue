<template>
  <div>
    <el-table
      :data="unRevierTopics">
      <el-table-column
        width="80"
        prop="id"
        label="id">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题">
      </el-table-column>
      <el-table-column
        width="150"
        prop="username"
        label="发表用户">
      </el-table-column>
      <el-table-column
        prop="gmtCreate"
        label="发表时间">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button
            @click="goToTopicPage(scope.row.id)"
            type="text"
            size="small">
            查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'reviewList',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      unRevierTopics: 'unRevierTopics'
    })
  },
  mounted () {
    this.findAllUnrevierTopic().then(res => {
    })
  },
  methods: {
    ...mapActions({
      findAllUnrevierTopic: 'FindAllUnrevierTopic'
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
