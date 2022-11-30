<template>
  <div class="preview-render">
    <template v-for="(item, index) in list">
      <h1 v-if="item.asTitle">
        <span>{{dataSource[item.field]}}</span>
        <el-button v-if="showCollect"
                   style="margin-left: 18px; border-radius: 8px;"
                   plain icon="el-icon-star-off"
                   @click="$emit('onCollectClick')"
                   size="small">{{dataSource['favorite'] ? '取消收藏' : '收藏'}}</el-button>
      </h1>
      <div class="preview-item"
           v-else
           :key="index"
      >
        <span class="preview-item-title">{{item.label}}</span>
        <div class="preview-item-content" v-if="item.type === FORM_TYPE.ADDRESS_SELECT_RANGE">
          {{dataSource[item.field1]}}
          <i class="el-icon-right" v-if="dataSource[item.field1]"></i>
          {{dataSource[item.field2]}}
        </div>

        <div class="preview-item-content" v-else-if="item.type === FORM_TYPE.IMAGE_UPLOAD_GROUP">
          <el-image
            v-for="(child, index) in item.fields"
            :key="index"
            style="width: 100px; height: 100px;margin-right: 24px;border-radius: 8px;"
            :src="getImages(dataSource[child])"
            :preview-src-list="getImages(dataSource[child])">
          </el-image>
        </div>

        <div class="preview-item-content" v-else-if="item.type === FORM_TYPE.RENDER">
          {{item.render(dataSource)}}
        </div>
        <el-image
          v-else-if="item.type === FORM_TYPE.IMAGE_UPLOAD"
          style="width: 100px; height: 100px"
          :src="getImages(dataSource[item.field])"
          :preview-src-list="getImages(dataSource[item.field])">
        </el-image>
        <span class="preview-item-content" v-else>{{dataSource[item.field]}}</span>
      </div>
    </template>
    <slot name="button"></slot>
    <slot name="extra"></slot>
  </div>
</template>

<script>
import Vue from 'vue';
import {FORM_TYPE} from "@utils/const";

export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    dataSource: {
      type: Object,
      default: () => {}
    },
    showCollect: {
      type: Boolean,
      default: false
    },
    isFavorite: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      FORM_TYPE: FORM_TYPE
    }
  },
  methods: {
    getImages(data) {
      if(!data){
        return []
      }
      if(Array.isArray(data)){
        return data;
      }
      return data.split(',')
    }
  },
}
</script>

<style lang="scss" scoped>
  .preview-render{
    padding: 24px 24px 60px;
    background: #F9F9FC;
    border-radius: 8px;
    h1{
      color: #333333;
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 40px;
    }
    .preview-item{
      font-size: 14px;
      display: flex;
      line-height: 40px;
      margin-bottom: 20px;
      .preview-item-title{
        color: #333333;
        display: inline-block;
        width: 116px;
        text-align: left;
        font-weight: bold;
      }
      .preview-item-content{
        color: #666666;
      }
    }
  }
</style>
