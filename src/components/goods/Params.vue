<template>
  <div>
     <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>参数列表</el-breadcrumb-item>
     </el-breadcrumb>

      <ParamsForm/>
  </div>
</template>

<script>
import ParamsForm from './form/ParamsForm.vue';
export default {
    name:'ParamsVue',
    components:{
        ParamsForm
    }
}
</script>

<style>

</style>