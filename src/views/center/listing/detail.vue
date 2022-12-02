<template>
  <div>
    <data-table ref="table" :columns="columns" :url="url">
      <template slot="num" slot-scope="{row}">
        {{row.num + row.unit}}
      </template>
      <template slot="operate" slot-scope="{row}">
        <span v-if="row.status === 2">交易结束</span>
        <confirm-button
          style="margin-left: 8px"
          url="/listingTransaction/confirm/"
          :id="row.id"
          tip="是否确认与此用户达成交易"
          info="确认交易后，此交易交易成功"
          @onSuccess="onSearch"
          v-if="row.status === 0"
        >
          确认交易
        </confirm-button>
        <confirm-button
          style="margin-left: 8px"
          url="/listingTransaction/cancel/"
          :id="row.id"
          @onSuccess="onSearch"
          info="是否要取消与此用户的交易"
          tip="交易取消后，用户不能再参与此商品的挂牌交易"
          v-if="row.status === 0"
        >
          取消交易
        </confirm-button>
      </template>
    </data-table>
  </div>
</template>

<script>
import Vue from 'vue';
import SearchForm from "@components/SearchForm/SearchForm";
import {FORM_TYPE, NEWS_STATUS, NEWS_TYPE, TRANSACTION_STATUS} from "@utils/const";
import DataTable from "@components/DataTable/DataTable";
import ConfirmButton from "@components/ConfirmButton/ConfirmButton";

export default {
  components: {
    SearchForm,
    DataTable,
    ConfirmButton
  },
  data() {
    return {
      url: '',
      columns: [{
        name: '摘牌时间',
        key: 'createTime',
      },{
        name: '企业名称',
        key: 'name',
      },{
        name: '法人姓名',
        key: 'legalPerson',
      },{
        name: '企业联系人',
        key: 'contact',
      },{
        name: '联系电话',
        key: 'tel',
      },{
        name: '操作',
        key: 'operate',
        slots: ['operate'],
        width: 200
      }]
    }
  },
  created() {
    this.url = '/listingTransaction/pickList/' + this.$route.params.id
  },
  methods: {
    onSearch(params){
      this.queryParam = params;
      this.$refs.table.load(params)
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
