<template>
  <el-dialog title="分配权限" :visible="setRightDialogVisible"  
  width="30%" @close="setRightDialogClosed">
            <!-- 树形控件 -->
            <el-tree :data="myPermInfo" :props="treeProps"
            show-checkbox node-key="id" default-expand-all
            :default-checked-keys="myDefKeys" ref="permTreeRef"
            ></el-tree>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelEdit()">取 消</el-button>
                <el-button type="primary" @click="allotRights">确 定</el-button>
            </span>
    </el-dialog>
</template>

<script>
import { updatePermissionByRoleId } from '@/api/permission';
export default {
    props:['setRightDialogVisible', 'AllPermInfo', 'defKeys', 'roleId'],
    data(){
        return{
           myPermInfo:[],
           //树形空间的属性绑定对象
           treeProps:{
             label: 'authName',
             children:'children'
           },
           myDefKeys:[]
         
        }
    },
    watch:{
      AllPermInfo: {
      immediate: true,
      handler(value) {
        this.myPermInfo = [...value];
      }
    },
      defKeys: {
        immediate: true,
        handler(value) {
        this.myDefKeys = [...value];
      }
    }
    },
    methods:{
        cancelEdit(){
            this.$emit('closeSetPermDialog', false)
            
        },
        setRightDialogClosed(){
            this.$emit('closeSetPermDialog', false)
        },
        //添加权限
        async allotRights(){
            const keys = [
                ...this.$refs.permTreeRef.getCheckedKeys(),
                ...this.$refs.permTreeRef.getHalfCheckedKeys()
            ]

            const idStr = keys.join(',')
            
            

            const {data: res}  = await updatePermissionByRoleId(this.roleId, {rids: idStr})

            if(res.meta.status !==200){
                return this.$message.error(res.meta.msg)
            }

            this.$message.success(res.meta.msg)

            this.$emit('updatePermInfo')
            
            
            
        }
        
    }

}
</script>

<style>

</style>