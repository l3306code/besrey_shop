<template>
    <el-dialog title="编辑分类" :visible="editCateDialogVisible"  width="50%"  @close="editDialogClosed" >
           <el-form ref="editFormRef" :model="editCateForm" label-width="70px" :rules="editCateFormRules"
            >
                <el-form-item label="分类名称" prop="cat_name" label-width="100px">
                    <el-input v-model="editCateForm.cat_name"></el-input>
                </el-form-item>
            </el-form>


             <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogClosed">取 消</el-button>
                <el-button type="primary" @click="doEditCateInfo">确 定</el-button>
            </span>
    </el-dialog>
</template>

<script>
import { updateCateInfoById } from '@/api/cate';
export default {
    name: 'editCateDialogVue',
    props:['editCateDialogVisible', 'editCateInfo'],
    data(){
        return{
            editCateForm: {

            },
            editCateFormRules:{
                cat_name:[
                    {
                        required: true, message: '请输入分类名称', trigger:'blur'
                    },
                    {
                        min: 2, max: 15, message: '分类名称的长度在2-15个字符之间', trigger: 'blur'
                    }
                ]
            }
        }
    },
    watch:{
        editCateInfo:{
            immediate: true,
            handler(value){
                this.editCateForm = {...value}
            }
        }
    },
    methods:{
        editDialogClosed(){
            
            this.$emit('closeEditDialog', false)
            this.$refs.editFormRef.resetFields()
        },
        doEditCateInfo(){
            this.$refs.editFormRef.validate(async valid=>{
                if(!valid) return
                const {data:res} = await updateCateInfoById(this.editCateForm.cat_id, {
                    cat_name: this.editCateForm.cat_name
                })

                if(res.meta.status !==200){
                    return this.$message.error(res.meta.msg)
                }

                this.$message.success(res.meta.msg)

                this.editDialogClosed()

                //刷新表单
                this.$emit('updateCateForm')
            })
        }

    },
}
</script>

<style>

</style>