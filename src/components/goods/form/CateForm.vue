<template>
  <div>
    <el-card>
    <el-row>
        <el-button type="primary" @click="showAddCate">添加分类</el-button>
    </el-row>

    <!-- 表格 -->
    <tree-table class="treeTable" :data="cateList" :columns="columns" border stripe
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
    <template slot="opt" slot-scope="cateInfo">
        <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="showCateOne(cateInfo.row.cat_id)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="deleteCate(cateInfo.row.cat_id)"
            >删除</el-button
          >
    </template>
    </tree-table>


    <!-- 分页区域 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
    :current-page="queryInfo.pagenum" :page-sizes="[3,10,15,20]"
    :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
  </el-card>

   <add-cate-dialog :addCateDialogVisible.sync="addCateDialogVisible" ref="addCateRef" 
   @cancelAdd="handleCancelAdd" :parentCateList="parentCateList"
   @doGetCateList="getAllCateList"></add-cate-dialog>

   <editCateDialogVue :editCateDialogVisible.sync="editCateDialogVisible"
   @closeEditDialog="handleCloseEdit" :editCateInfo="editCateInfo"
   @updateCateForm="getAllCateList"/>
  </div>
</template>

<script>
import { getCateList, getCateInfoById, removeCateInfoById } from '@/api/cate';
import addCateDialog from '../dialog/addCateDialog.vue';
import editCateDialogVue from '../dialog/editCateDialog.vue';
export default {
  components: { addCateDialog, editCateDialogVue },
    data(){
        return{
            queryInfo:{
                type:3,
                pagenum:1,
                pagesize: 3
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
            ],
            addCateDialogVisible: false,
            parentCateList:[],
            editCateDialogVisible: false,
            editCateInfo:{

            }
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
           
        },
        handleSizeChange(newSize){
            this.queryInfo.pagesize = newSize
            this.getAllCateList()
        },
        handleCurrentChange(newPage){
            this.queryInfo.pagenum = newPage
            this.getAllCateList()
        },
        async showAddCate(){
             const {data: res} = await getCateList({
                type: 2
            })

            if(res.meta.status !== 200){
                return this.$message.error(res.meta.msg)
            }

            this.addCateDialogVisible = true
           
            this.parentCateList = res.data
            
            
        },
        handleCancelAdd(status){
            this.addCateDialogVisible = status
        },
        async showCateOne(id){
            const {data: res} = await getCateInfoById(id)
            
            if(res.meta.status !==200){
                return this.$message.error(res.meta.msg)
            }

            this.editCateDialogVisible = true

            this.editCateInfo = res.data
            
        },
        handleCloseEdit(status){
            this.editCateDialogVisible = status
        },
        async deleteCate(id){
             const confirmRes = await this.$confirm('此操作将永久删除该分类,是否继续?', '提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(
                err =>{
                    err
                }
            )

            if(confirmRes !== 'confirm'){
                return this.$message.info('已取消删除')
            }

            const {data: res} = await removeCateInfoById(id)

            if(res.meta.status !== 200){
                return this.$message.error(res.meta.msg)
            }

            this.$message.success(res.meta.msg)


            if(this.cateList.length === 1 && this.queryInfo.pagenum > 1){
                this.queryInfo.pagenum --
            }

            this.getAllCateList()
        }
       
    },
    mounted(){

    }
}
</script>

<style scoped>
.el-row{
    margin-bottom: 10px;
}



</style>