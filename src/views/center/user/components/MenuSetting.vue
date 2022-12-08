<template>
  <el-dialog
    title="快捷菜单设置"
    :visible.sync="visible"
    class="setting-dialog"
    @close="close"
    width="50%">
    <div class="menus-content">
      <div class="choose-list">
        <p class="info"><span style="font-weight: bold;margin-right: 10px;">已选菜单</span>按住菜单标签可以对菜单进行排序</p>
        <div class="choose-list-item">
          <el-tag type="primary" v-for="(item, index) in selected" :key="index">{{item.name}}</el-tag>
        </div>
      </div>
      <div class="menu-list">
        <div class="menu-list-item" v-for="(item, index) in menus" :key="index">
          <h6>{{item.title}}</h6>
          <ul>
            <template v-if="item.children && item.children.length">
              <li v-for="(child, childIndex) in item.children" :key="childIndex">
                <el-tag :type="getType(child)" effect="plain" @click="onToggleClick(child)">{{child.title}}</el-tag>
                <el-tag :type="getType(grandSon)" effect="plain"
                        v-for="(grandSon, grandSonIndex) in child.children"
                        :key="grandSonIndex"
                        @click="onToggleClick(grandSon)"
                >
                  {{grandSon.title}}
                </el-tag>
              </li>
            </template>
            <li v-else>
              <el-tag :type="getType(item)" effect="plain" @click="onToggleClick(item)">{{item.title}}</el-tag>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button icon="el-icon-refresh-left" @click="onResetClick">恢复默认</el-button>
      <div class="button-box">
        <el-button type="primary" plain @click="close">取 消</el-button>
        <el-button type="primary" @click="onSaveClick(false)">确 定</el-button>
      </div>
    </span>
  </el-dialog>
</template>

<script>
import Vue from 'vue';
import {getMenuList, saveShortcutMenu} from "@/api/user/user";
import {DEFAULT_SHORT_CUT_MENUS} from "@utils/const";
import {deepClone} from "@utils";

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      menus: [],
      selected: []
    }
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      const {data} = await getMenuList()
      this.menus = data.all;
      if(data.selected.length){
        this.selected = data.selected
      }else{
        this.selected = deepClone(DEFAULT_SHORT_CUT_MENUS)
      }
    },
    onToggleClick(data){
      const index = this.selected.findIndex(item => item.menuId === data.id)
      if(index > -1){
        this.selected.splice(index, 1)
      }else{
        if(this.selected.length === 10){
          return this.$message.warning('最多可以设置10个快捷菜单')
        }
        const push = {
          menuId: data.id,
          name: data.title
        }
        this.selected.push(push);
      }
    },
    getType(data){
      const index = this.selected.findIndex(item => item.menuId === data.id);
      if(index > -1){
        return 'primary'
      }else{
        return 'info';
      }
    },
    close(){
      this.$emit('update:visible',false)
    },
    onResetClick(){
      const ids = DEFAULT_SHORT_CUT_MENUS.map(item => item.id);
      this.$confirm('是否确认恢复默认设置？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.onSaveClick(ids);
      })
    },
    async onSaveClick(ids){
      const result = await saveShortcutMenu(ids || this.selected.map(item => item.menuId));
      if(result.code === 200){
        this.$message.success(result.msg)
        this.close();
        this.$emit('onSuccess')
      }else{
        this.$message.error(result.msg)
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.setting-dialog{
  ::v-deep .el-dialog__header{
    border-bottom: 1px solid #EDEFF3;
    .el-dialog__title{
      font-size: 16px;
      font-weight: bold;
    }
  }
  ::v-deep .el-dialog__headerbtn{
    font-size: 24px;
    font-weight: bold;
  }
}
.menus-content {
  .info {
    color: #333333;
    font-size: 14px;
  }
}

.choose-list {
  .el-tag {
    margin-right: 12px;
    margin-bottom: 4px;
  }
  .choose-list-item{
    margin-top: 16px;
  }
}

.menu-list {
  display: flex;
  margin-top: 22px;
  padding: 0 10px;
  max-height: 312px;
  overflow: auto;
  .menu-list-item {
    margin-right: 24px;

    .el-tag {
      margin-bottom: 8px;
      cursor: pointer;
    }
  }

  h6 {
    color: #333333;
    line-height: 20px;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 10px;
    text-align: center;
  }
}

.dialog-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

::v-deep{
  .el-dialog__footer{
    height: 86px;
    padding: 20px 40px;
    border-top: 1px solid #EDEFF3;
  }
  .el-dialog__body{
    padding: 16px 26px;
  }
}
</style>
