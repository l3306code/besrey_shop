<template>
    <el-dialog title="修改角色信息" :visible="editDialogVisible"  width="30%" :before-close="handleClose">
            <!-- TODO：后面加表单验证 -->
             <el-form ref="editFormRef" :model="editRoleForm" label-width="70px"
              @close="editDialogClosed" :rules="editFormRules">
                <el-form-item label="角色名称">
                    <el-input v-model="editRoleForm.roleName"></el-input>
                </el-form-item>
                <el-form-item label="角色描述">
                    <el-input v-model="editRoleForm.roleDesc"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="cancleEdit()">取 消</el-button>
                <el-button type="primary" @click="editRoleInfo4">确 定</el-button>
            </span>
    </el-dialog>
</template>

<script>
import { updateRoleInfo } from '@/api/role';

export default {
  components: {},
  props: ['editRoleInfo', 'editDialogVisible'],
  data() {
    return {
        editRoleForm:{

        },
        editFormRules:{
            roleName: [
                    {
                        required: true, message: '请输入角色名称', trigger: 'blur'
                    },
                    {
                        min: 2, max: 10, message: '角色名称的长度在2-10个字符之间', trigger: 'blur'
                    }
                ],
                roleDesc: [
                    {
                        required: true, message: '请输入角色描述', trigger: 'blur'
                    },
                    {
                        min: 5, max: 15, message: '角色描述的长度在5-15个字符之间', trigger: 'blur'
                    }
                ]
        }
            
        
    };
  },
  watch: {
    editRoleInfo:{
        immediate: true,
        handler(value){
            this.editRoleForm = {...value}
        }
    }
  },
  computed: {},
  methods: {
    handleClose(done){
        this.$emit('closeEditDialog', false)
        done()
    },
    cancleEdit(){
        this.$emit('cancleEditInfo', false)
    },
    editDialogClosed(){
        this.$refs.editFormRef.resetFields()
    },
    async editRoleInfo4(){
        const roleId = this.editRoleForm.roleId
        const {data: res} = await updateRoleInfo(roleId, {
            'roleName': this.editRoleForm.roleName,
            'roleDesc': this.editRoleForm.roleDesc
        })

        
        
        if(res.meta.status !==200){
            return this.$message.error(res.meta.msg)
        }

        //关闭对话框
        this.$emit('update-one-role', false)
    }
    
  },
  created() {},
  mounted() {

  }
};
</script>
<style lang="less" scoped>
</style>