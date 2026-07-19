<template>
  <el-dialog title="添加分类" :visible="addCateDialogVisible"  width="50%" 
  @close="addDialogClosed ">
           <!-- 添加分类的表单 -->
            <el-form :model="addCateForm" :rules="addCateFormRules" label-width="100px" ref="addCateRef">
                <el-form-item label="分类名称" prop="cat_name" > 
                    <el-input v-model="addCateForm.cat_name"></el-input>
                </el-form-item>

                <el-form-item label="父级分类:">
                    <el-cascader
                    v-model="selectedKeys"
                    :options="parentCateList"
                    :props="{
                        expandTrigger: 'hover',
                        ...cascaderProps,
                        checkStrictly: true
                    }"
                    @change="parentCateChange" clearable 
                    ></el-cascader>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogClosed">取 消</el-button>
                <el-button type="primary" @click="addCate">确 定</el-button>
            </span>
        </el-dialog>
</template>

<script>
import { addCateInfo } from '@/api/cate';

export default {
    name: 'addCateDialogVue',
    props:['addCateDialogVisible', 'parentCateList'],
    data(){
        return{
            addCateForm:{
                cat_name: '',
                cat_pid: 0,
                cat_level: 0
            },
            addCateFormRules:{
                cat_name:[
                   {required: true, message: '请输入分类名称', trigger: 'blur'} 
                ]
            },
            //指定级联选择器的配置对象
            cascaderProps:{
                value: 'cat_id',
                label: 'cat_name',
                children: 'children'
            },
            //选中的父级分类的Id数组
            selectedKeys:[]
        }
    },
    methods:{
        parentCateChange(){
            if(this.selectedKeys.length > 0){
                this.addCateForm.cat_pid = this.selectedKeys[this.selectedKeys.length -1]
                this.addCateForm.cat_level = this.selectedKeys.length
                return
            } else{
                this.addCateForm.cat_pid = 0
                this.addCateForm.cat_level = 0
            }
        },
        addCate(){
            this.$refs.addCateRef.validate(async valid =>{
                if(!valid) return this.$message.error("数据校验失败,请检查数据是否合规")
                
                const {data: res} = await addCateInfo(this.addCateForm)

                if(res.meta.status !==201) return this.$message.error(res.meta.msg)

                this.$message.success(res.meta.msg)

                this.addDialogClosed()

                this.$emit('doGetCateList')
            })
            
        },
        addDialogClosed(){
            this.$refs.addCateRef.resetFields()
            this.selectedKeys = []
            this.$emit('cancelAdd', false)
            this.addCateForm.cat_pid = 0
            this.addCateForm.cat_level = 0
        }
        

    }
}
</script>

<style style="less" scoped>
    .el-cascader{
        width: 100%;
    }

</style>