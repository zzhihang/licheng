<template>
  <list-page class="table-list">
    <query-box :columns="filter">
      <el-button type="primary" size="small" @click="add">新增</el-button>
    </query-box>
    <my-table ref="table" :columns="tableColumns" :list="[{app_name:'单点登录系统', app_code: 666,  app_quality: 1},{app_quality: 0}]" url="">
      <template slot="operate" slot-scope="{row}">
        <el-button type="text" @click="edit(row)">编辑</el-button>
        <el-button type="text" class="pop-btn" @click="showDelPop($event,row)">删除</el-button>
        <el-button type="text" class="pop-btn" @click="addUser($event,row)">添加用户</el-button>
        <el-button type="text" class="pop-btn" @click="manageUser($event,row)">用户列表</el-button>
      </template>
    </my-table>
    <add :visible.sync="showAdd" :form-data="formData" :title="title" @finish="$refs.table.reset()" />
    <add-user :visible.sync="showAddUser" :form-data="formData" :title="title" @finish="$refs.table.reset()" />
    <manage-user :visible.sync="showManageUser" :form-data="formData" :title="title" @finish="$refs.table.reset()" />
    <del-popover v-model="showDel" :target="target" @confirm="del" />
  </list-page>
</template>

<script>

import Add from './add'
import AddUser from './addUser'
import ManageUser from './manage-user'
import { tableColumns, filter } from './columns'

export default {
  name: 'application',
  components: { Add,AddUser,ManageUser },
  data() {
    return {
      tableColumns,
      filter,
      formData: null,
      showAdd: false,
      showAddUser:false,
      showManageUser:false,
      showDel: false,
      title: '新增',
      target: null
    }
  },
  watch: {},
  methods: {
    showDelPop(e, { id }) {
      this.showDel = true
      this.target = e.target
      this.id = id
    },
    del() {
      delConfig(this.id).then(res => {
        if (res.code === 200) {
          this.msgSuccess('删除成功')
          this.$refs.table.reset()
        }
      })
    },
    add() {
      this.id = ''
      this.title = '新增'
      this.showAdd = true
      this.formData = null
    },
    addUser() {
      this.id = ''
      this.title = '新增'
      this.showAddUser = true
      this.formData = null
    },
    manageUser() {
      this.id = ''
      this.title = '新增'
      this.showManageUser = true
      this.formData = null
    },
    edit(data) {
      this.id = data.id
      this.showAdd = true
      this.title = '编辑'
      this.formData = { ...data }
    },
    submit(data) {
      if (data.id) {
        updateConfig(data).then(res => {
          if (res.code === 200) {
            this.msgSuccess('更新成功')
            this.showAdd = false
            this.$refs.table.reset()
          }
        })
      } else {
        addConfig(data).then(res => {
          if (res.code === 200) {
            this.msgSuccess('保存成功')
            this.showAdd = false
            this.$refs.table.reset()
          }
        })
      }
    }
  }
}
</script>
