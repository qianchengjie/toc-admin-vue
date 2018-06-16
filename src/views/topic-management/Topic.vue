<template>
  <div class="topic-page">
    <el-card>
      {{ $t('table.state') }}： {{ state[topic.state] }}
      <div style="float: right">
        <el-button v-if="topic.state === 0" @click="pass" type="success" size="mini">通过</el-button>
        <el-button v-if="topic.state === 0" @click="rejectPass" type="danger" size="mini">拒绝通过</el-button>
        <el-button @click="del" type="info" size="mini">{{ $t('btn.del') }}</el-button>
      </div>
    </el-card>
    <el-card>
      <h2>{{ $t('table.title') }}：{{ topic.title }}</h2>
      <div class="topic-content" v-html="topic.content"></div>
      <el-row class="topic-basic-info">
        <el-col :span="8">{{ $t('table.submitTime') }}：{{ topic.gmtCreate }}</el-col>
        <el-col :span="8">{{ $t('table.upvoteNum') }}：{{ topic.upvoteNum }}</el-col>
        <el-col :span="8">{{ $t('table.commentNum') }}：{{ topic.commentNum }}</el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'topic',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      topic: 'topic'
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
    let id = this.$route.query.id
    this.findTopicById({ id })
  },
  methods: {
    ...mapActions({
      findTopicById: 'FindTopicById',
      updateTopicState: 'UpdateTopicState'
    }),
    pass () {
      this.$confirm('确认通过', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.updateTopicState({ id: this.topic.id, state: 1 }).then(res => {
          this.$message({
            type: 'success',
            message: '操作成功'
          })
        })
      }).catch(() => {})
    },
    rejectPass () {
      this.$confirm('拒绝通过', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.updateTopicState({ id: this.topic.id, state: -1 }).then(res => {
          this.$message({
            type: 'success',
            message: '操作成功'
          })
        })
      }).catch(() => {})
    },
    del () {
      this.$confirm('确认删除', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.updateTopicState({ id: this.topic.id, state: -2 }).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.$router.go(-1)
        })
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss">
.topic-page {
  .topic-content img{
    max-width: 80% !important;
  }
}
</style>

<style lang="scss" scoped>
.topic-content {
  min-height: 400px;
}
.topic-basic-info {
  border-top: 1px solid #F1F1F1;
  padding-top: 20px;
}
</style>
