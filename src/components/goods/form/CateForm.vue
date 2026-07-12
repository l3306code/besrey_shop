<template>
  <el-card>
    <el-row>
        <el-button type="primary">添加分类</el-button>
    </el-row>

    <!-- 表格 -->
    <tree-table :data="cateList" :columns="columns" border stripe
    :selection-type="false" :expand-type="false" show-index>
    <!-- 是否有效 -->
    <template slot="isUsed" slot-scope="cateInfo">
        <i class="el-icon-success" 
        v-if="cateInfo.row.cat_deleted === false" style="color: lightgreen" ></i>
        <i class="el-icon-error" v-else style="color: red"></i>
    </template>
    <template slot="order" slot-scope="cateInfo">
        <el-tag size="mini" v-if="cateInfo.row.cat_level===0">一级</el-tag>
        <el-tag size="mini" type="success" v-else-if="cateInfo.row.cat_level===1">二级</el-tag>
        <el-tag size="mini" type="warning" v-else>三级</el-tag>
    </template>
    <template slot="opt">
        <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            >删除</el-button
          >
    </template>
    </tree-table>


    <!-- 分页区域 -->
  </el-card>
</template>

<script>
import { getCateList } from '@/api/cate';
export default {
    data(){
        return{
            queryInfo:{
                type:3,
                pagenum:1,
                pagesize: 5
            },
            cateList: [],
            total: 0,
            columns:[
                {
                    label:'分类名称',
                    prop: 'cat_name'
                },
                {
                    label:'是否有效',
                    type:'template',
                    template: 'isUsed'
                },
                {
                    label:'排序',
                    type:'template',
                    template: 'order'
                },
                {
                    label:'操作',
                    type:'template',
                    template: 'opt'
                }
            ]
        }
    },
    created(){
        this.getAllCateList()
    },
    methods:{
        async getAllCateList(){
           const {data:res} =  await getCateList(this.queryInfo)

                      
           if(res.meta.status !== 200){
             return this.$message.error(res.meta.msg)
           }

           this.cateList = res.data.result

           this.total = res.data.total
           
        }
    }
}
</script>

<style scoped>
.el-row{
    margin-bottom: 10px;
}
</style>