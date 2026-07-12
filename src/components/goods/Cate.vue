<template>
  <div>
     <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品分类</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图区域 -->
         <cate-form-vue/>
  </div>
</template>

<script>
import CateFormVue from './form/CateForm.vue';
export default {
    name:'CateVue',
    components:{
        CateFormVue
    }

}
</script>

<style>

</style>