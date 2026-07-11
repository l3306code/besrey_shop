<template>
  <el-dialog title="分配角色" :visible="setRoleDialogVisible"  width="50%"
  @close="setRoleDialogClose">
            <!-- TODO：后面加表单验证 -->
            <div>
                <p>当前的用户: {{ currentUserInfo.username }}</p>
                <p>当前的角色: {{ currentUserInfo.role_name }}</p>
                <p>分配新角色: 
                    <el-select v-model="selectedRoleId" placeholder="请选择角色">
                        <el-option v-for="item in roleInfo"
                        :key="item.id" :label="item.roleName"
                        :value="item.id"
                        >
                        </el-option>
                    </el-select>
                </p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelEdit" >取 消</el-button>
                <el-button type="primary" @click="setRoleInfo">确 定</el-button>
            </span>
    </el-dialog>
</template>

<script>
import { getAllRolesData } from '@/api/role';
import { setRoleByUserIdAndRoleId } from '@/api/user';

export default {
    name:'AllocRoleVue',
    created(){
        this.getRoleInfo()
    },
    data(){
        return{
            roleInfo:[],
            selectedRoleId:''
        }
    },
    props:['setRoleDialogVisible', 'currentUserInfo'],
    methods:{
        async getRoleInfo(){
            const {data: res} = await getAllRolesData()
            
            if(res.meta.status !== 200){
                return this.$message.error(res.meta.msg)
            }

            this.roleInfo = res.data
        },
        async setRoleInfo(){
            if(!this.selectedRoleId){
                return this.$message.error('请选择要分配的角色')
            }

            const {data:res} = await setRoleByUserIdAndRoleId(this.currentUserInfo.id,
                {rid: this.selectedRoleId}
            )

            console.log(res);
            

            if(res.meta.status !== 200){
                return this.$message.error(res.meta.msg)
            }

            this.$message.success(res.meta.msg)

            this.$emit('doGetUserList', false)


        },
        setRoleDialogClose(){
            this.$emit('setRoleDialogClosed')
            this.selectedRoleId = ''
        },
        cancelEdit(){
            this.$emit('setRoleDialogClosed')
            this.selectedRoleId = ''
        }

    },
    mounted(){
        
    }

}
</script>

<style>

</style>