<template>
  <el-dialog
    :visible="visible"
    :show-close="false"
    @close="close"
    class="edit-company"
    width="60%">
    <div slot="title" class="header-box">
      <h1>请选择企业</h1>
      <el-input
        size="medium"
        placeholder="请输入内容"
        suffix-icon="el-icon-date"
        v-model="filter">
      </el-input>
    </div>

    <div class="inner-content">
      <el-checkbox-group v-model="checkList">
        <el-row>
          <el-col :span="6" v-for="(item, index) in companyList" :key="index">
            <el-checkbox :label="item.k">{{item.v}}</el-checkbox>
          </el-col>
        </el-row>
      </el-checkbox-group>
    </div>

    <div class="choose-area">
      <h6>已选企业</h6>
      <div class="tag-list">
        <el-tag
          v-for="tag in selected"
          :key="tag.k"
          @close="handleTagClose(tag)"
          closable>
          {{tag.v}}
        </el-tag>
      </div>
    </div>

    <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="onSaveClick">确 定</el-button>
      </span>
  </el-dialog>
</template>

<script>
import {addGoods, addGoodsType} from "@/api/product/product";
import {getBiddingCompanyList, saveBiddingCompanyList} from "@/api/bidding/bidding";

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    goodsId: {
      type: String,
      default: ''
    },
    node: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      nodeName: '',
      filter: '',
      checkList: [],
      selected: [],
      companyList: [],
    }
  },
  methods: {
    async getBiddingCompanyList(){
      const {data} = await getBiddingCompanyList(this.node.id)
      this.companyList = data.all;
      this.checkList = data.selected.map(item => item.k);
    },
    close() {
      this.$emit('update:visible', false)
    },
    handleTagClose(tag) {
      const index = this.checkList.findIndex(item => item === tag.k);
      this.checkList.splice(index, 1);
    },
    async onSaveClick() {
      const data = this.checkList;
      let params = {
        goodsId: this.node.id,
        data: data
      };
      const result = await saveBiddingCompanyList(params);
      if (result.code === 200) {
        this.$message.success(result.msg)
        this.close();
        this.$emit('onSuccess')
      } else {
        this.$message.error(result.msg);
      }
    }
  },
  watch: {
    node: {
      handler(val) {
        if(val.id){
          this.getBiddingCompanyList();
        }
      },
      immediate: true
    },
    checkList: {
      handler(val) {
        this.selected = this.companyList.filter(item => val.includes(item.k));
      },
      immediate: true
    },
  },
}
</script>

<style lang="scss" scoped>
.edit-company{
  .inner-content{
    height: 133px;
    overflow-y: auto;
    border-bottom: 1px dashed #E0E2ED;
  }
  ::v-deep .el-dialog__header{
    padding: 0 26px;
  }
  ::v-deep .el-dialog__body{
    padding: 23px 27px 20px;
  }
  .el-col{
    margin-bottom: 14px;
  }
  .choose-area{
    padding: 27px 0;
  }
  .tag-list{
    margin-top: 22px;
  }
  h6{
    font-size: 16px;
    color: #333333;
    line-height: 20px;
  }
  .el-tag{
    margin-right: 32px;
  }
}
.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 65px;
  border-bottom: 1px solid #EDEFF3;

  h1 {
    font-weight: bold;
    font-size: 16px;
    color: #1E3149;
  }

  .el-input {
    width: 256px;
    height: 40px;
  }
}
</style>
