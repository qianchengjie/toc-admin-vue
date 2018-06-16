<template>
  <div class="user-list-page">
    <el-card>
      <el-input style="width: 400px" placeholder="请输入搜索内容" v-model="search.val">
        <el-select style="width: 100px" v-model="search.select.val" slot="prepend" placeholder="请选择">
          <el-option label="用户名" :value="1" selected></el-option>
          <el-option label="手机号" :value="2"></el-option>
        </el-select>
        <el-button slot="append" @click="doSearchUser()" icon="el-icon-search"></el-button>
      </el-input>
      <el-button type="primary" @click="showAddUserForm()">新增用户</el-button>
      <el-button type="warning" @click="downloadUserExcel()">导出用户</el-button>
      <el-upload
        style="display: inline; margin-left: 10px;"
        accept="application/vnd.ms-excel"
        :headers="headers"
        :show-file-list="false"
        :action="actionUrl"
        :on-success="uploadSuccess"
        :on-error="uploadError"
        :auto-upload="true">
        <el-button slot="trigger" type="success">导入用户</el-button>
      </el-upload>
    </el-card>
    <el-table
      :data="users">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item :label="$t('table.nickname')">
              <span>{{ scope.row.username }}</span>
            </el-form-item>
            <el-form-item :label="$t('table.phone')">
              <span>{{ scope.row.phone }}</span>
            </el-form-item>
            <el-form-item :label="$t('table.sex')">
              <span>
                {{ scope.row.sex === 0 ? $t('sex.male') : '' }}
                {{ scope.row.sex === 1 ? $t('sex.female') : '' }}
                {{ scope.row.sex === -1 ? '-' : '' }}
              </span>
            </el-form-item>
            <el-form-item :label="$t('table.roles')">
              <span>{{ getRole(scope.row.roleList) }}</span>
            </el-form-item>
            <el-form-item :label="$t('table.followingNum')">
              <span>{{ scope.row.followingNum }}</span>
            </el-form-item>
            <el-form-item :label="$t('table.followedNum')">
              <span>{{ scope.row.followedNum }}</span>
            </el-form-item>
            <el-form-item :label="$t('table.registerTime')">
              <span>{{ scope.row.gmtCreate }}</span>
            </el-form-item>
            <el-form-item :label="$t('table.state')">
              <span>{{ scope.row.state === 0 ? $t('userState.normal') :  $t('userState.lockUp') }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        width="50"
        prop="id"
        :label="$t('table.id')">
      </el-table-column>
      <el-table-column
        width="80"
        :label="$t('table.avatar')">
        <template slot-scope="scope">
          <img style="height: 40px; width: 40px;" :src="scope.row.avatar">
        </template>
      </el-table-column>
      <el-table-column
        width="150"
        prop="username"
        :label="$t('table.nickname')">
      </el-table-column>
      <el-table-column
        width="150"
        prop="phone"
        :label="$t('table.phone')">
      </el-table-column>
      <el-table-column
        width="80"
        :label="$t('table.sex')">
        <template slot-scope="scope">
          {{ scope.row.sex === 0 ? $t('sex.male') : '' }}
          {{ scope.row.sex === 1 ? $t('sex.female') : '' }}
          {{ scope.row.sex === -1 ? '-' : '' }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.roles')">
        <template slot-scope="scope">
          {{ getRole(scope.row.roleList) }}
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        :label="$t('table.operation')">
        <template slot-scope="scope">
          <!-- <el-button
            type="primary"
            size="mini">
            {{ $t('btn.check') }}
          </el-button> -->
          <el-button
            @click="showUpdateRoleForm(scope.row)"
            type="success"
            size="mini">
            {{ $t('btn.changeRole') }}
          </el-button>
          <el-button
            @click="delUser(scope.row)"
            type="danger"
            size="mini">
            {{ $t('btn.del') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      style="text-align: right; padding-top: 10px; padding-right: 200px"
      background
      @current-change="changePage"
      @prev-click="changePage"
      @next-click="changePage"
      :current-page.sync="pageNum"
      layout="prev, pager, next"
      :page-count.sync="userTotalPages">
    </el-pagination>

    <el-dialog title="新增用户" :visible.sync="addUserFormVisible">
      <el-form :model="newUserForm">
        <el-form-item label="用户名">
          <el-input v-model="newUserForm.username"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="newUserForm.phone"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addUserFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitUser()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改角色" :visible.sync="updateRoleFormVisible">
      <el-form :model="newRoleForm">
        <el-checkbox-group v-model="newRoleForm.val">
          <el-checkbox v-for="role of roleList" :key="role.id" :label="role.name"></el-checkbox>
        </el-checkbox-group>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateRoleFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitChangeRole()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
import { deepClone } from '@/utils'

export default {
  name: 'userList',
  data () {
    return {
      actionUrl: '',
      headers: {},
      search: {
        val: '',
        select: {
          val: 1,
          options: []
        }
      },
      searchTemp: {
        val: '',
        select: {
          val: 1,
          options: []
        }
      },
      pageNum: 1,
      addUserFormVisible: false,
      updateRoleFormVisible: false,
      newUserForm: {
        username: '',
        phone: ''
      },
      newRoleForm: {
        val: [],
        user: {}
      }
    }
  },
  computed: {
    ...mapGetters({
      users: 'users',
      roleList: 'roleList',
      userTotalPages: 'userTotalPages'
    })
  },
  mounted () {
    this.actionUrl = process.env.BASE_API + 'admin/user/importUsersToExcel'
    this.headers = {
      'Authorization': getToken()
    }
    this.searchUser({ username: null, phone: null, pageNum: 0 })
    this.findAllRole()
  },
  methods: {
    ...mapActions({
      findAllUser: 'FindAllUser',
      searchUser: 'SearchUser',
      addUser: 'AddUser',
      findAllRole: 'FindAllRole',
      changeRole: 'ChangeRole'
    }),
    changePage (pageNum) {
      let search = this.searchTemp
      pageNum--
      if (search.select.val === 1) {
        this.searchUser({ username: search.val, phone: null, pageNum })
      } else if (search.select.val === 2) {
        this.searchUser({ username: null, phone: search.val, pageNum })
      }
    },
    uploadSuccess (res, file, fileList) {
      if (res.code === 0) {
        this.$successMsg('全部导入成功')
      } else {
        this.$errMsg(res.msg)
      }
    },
    uploadError (err, file, fileList) {
      this.$errMsg('导入失败:' + err.msg)
    },
    showAddUserForm () {
      this.addUserFormVisible = true
    },
    showUpdateRoleForm (user) {
      this.updateRoleFormVisible = true
      this.newRoleForm.user = user
      this.newRoleForm.val = []
      for (let role of user.roleList) {
        this.newRoleForm.val.push(role.name)
      }
    },
    submitUser () {
      this.addUser({ username: this.newUserForm.username, phone: this.newUserForm.phone }).then(res => {
        this.$successMsg('添加成功')
        this.addUserFormVisible = false
        this.newUserForm = {
          username: '',
          phone: ''
        }
      })
    },
    submitChangeRole () {
      let roleIds = []
      for (let roleName of this.newRoleForm.val) {
        roleIds.push(this.roleList.find(role => roleName === role.name).id)
      }
      this.changeRole({ userId: this.newRoleForm.user.id, roleIds }).then(res => {
        this.$successMsg('修改角色成功')
        this.newRoleForm = {
          val: [],
          user: {}
        }
        this.showUpdateRoleForm = false
      })
    },
    delUser (user) {
      this.$confirm('是否删除用户 ' + user.username, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {})
    },
    downloadUserExcel () {
      const a = document.createElement('a')
      let href = process.env.BASE_API + '/admin/user/exportUsersToExcel'
      a.setAttribute('href', href)
      a.download = '用户信息表.xls'
      a.click()
    },
    doSearchUser () {
      if (this.search.select.val === 1) {
        this.searchUser({ username: this.search.val, phone: null, pageNum: 0 }).then(res => {
          this.pageNum = 1
        })
      } else if (this.search.select.val === 2) {
        this.searchUser({ username: null, phone: this.search.val, pageNum: 0 }).then(res => {
          this.pageNum = 1
        })
      }
      this.searchTemp = deepClone(this.search)
    },
    getRole (arr) {
      let str = ''
      for (let i of arr) {
        str += this.$t('role.' + i.role) + ','
      }
      if (str.length === 0) {
        return '-'
      }
      return str.substring(0, str.length - 1)
    }
  }
}
</script>

<style lang="scss">
.user-list-page {
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 120px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
}
</style>

<style lang="scss" scoped>
</style>
