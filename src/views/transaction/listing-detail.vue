<template>
  <div class="news-detail-content w">
    <preview-render :list="list"
                    :data-source="dataSource"
                    :show-collect="false"
    >
      <template #button>
        <confirm-button type="primary"
                        style="width: 100px;margin-left: 270px;margin-bottom: 40px;"
                        url="/listing/pick"
                        :id="id"
                        info="是否确定摘牌"
                        tip="摘牌后需等待供货商确认，是否达成交易，以供货商最终确认为准。"
        >摘牌</confirm-button>
      </template>
      <template #extra>
        <div class="preview-item">
          <span class="preview-item-title" style="font-weight: normal">等待供货商进行确认</span>
          <div class="preview-item-content">
            <div class="top-border">
              <span class="th">供应商名称</span>
              <span class="td">需要接口提供</span>
            </div>
            <div>
              <span class="th">联系人</span>
              <span class="td">需要接口提供</span>
            </div>
            <div>
              <span class="th">联系电话</span>
              <span class="td">需要接口提供</span>
            </div>
          </div>
        </div>
      </template>
    </preview-render>
  </div>
</template>

<script>
import PreviewRender from "@components/PreviewRender/PreviewRender";
import {FORM_TYPE, LOGISTICS_COST_TYPE} from "@utils/const";
import ConfirmButton from "@components/ConfirmButton/ConfirmButton";
import {getListingDetail} from "@/api/listing/listing";

export default {
  components: {
    PreviewRender,
    ConfirmButton
  },
  data() {
    return {
      list:  [{
        label: '商品名称',
        field: 'goodsName',
        asTitle: true
      },{
        label: '商品品级',
        field: 'goodsGrade',
        extraField: 'districtId' //额外传递的id字段
      },{
        label: '商品单价',
        field: 'unitPrice',
      },{
        label: '商品数量/单位',
        field: 'num',
        type: FORM_TYPE.RENDER,
        render: (data) => {
          return data.num + data.unit;
        }
      },{
        label: '货源所在地',
        field: 'goodsOriginStr',
      },{
        label: '生产企业',
        field: 'manufacturer'
      },{
        label: '储存方式',
        field: 'storageMode'
      },{
        label: '交货方式',
        field: 'deliveryMode'
      },{
        label: '交货时间',
        field: 'deliveryTime',
      },{
        type: FORM_TYPE.IMAGE_UPLOAD,
        label: '商品图片',
        field: 'imgUrls',
      }],
      dataSource: {},
      id: ''
    }
  },
  created() {
    this.id = this.$route.params.id
    this.getData()
  },
  methods: {
    async getData() {
      const {data} = await getListingDetail(this.id)
      this.dataSource = data;
    },
  },
}
</script>

<style lang="scss" scoped>
  .preview-item-content{
    .top-border{
      border-top: 1px solid #EDEDED;
    }
    .th, .td{
      font-size: 12px;
      text-align: center;
      line-height: 60px;
      height: 60px;
      display: inline-block;
      border-bottom: 1px solid #EDEDED;
      border-right: 1px solid #EDEDED;
    }
    .th{
      width: 108px;
      background: #F6F9FE;
      border-left: 1px solid #EDEDED;
    }
    .td{
      width: 108px;
    }
  }
</style>
