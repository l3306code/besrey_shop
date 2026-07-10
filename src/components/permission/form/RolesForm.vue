<template>
    <el-table :data="roleList" border stripe :cell-style="{ textAlign: 'center' }"
        :header-cell-style="{ textAlign: 'center' }">
        <el-table-column type="expand"></el-table-column>
        <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="400px">
            <template v-slot="roleList">
                <el-button size="mini" type="primary" icon="el-icon-edit"  @click="editRole(roleList.row.id)">编辑</el-button>
                <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteRole(roleList.row.id)">删除</el-button>
                <el-button size="mini" type="warning" icon="el-icon-setting">分配权限</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
import { deleteRoleById } from '@/api/role';

export default {
  components: {},
  props: ['roleList'],
  data() {
    return {
    };
  },
  watch: {},
  computed: {},
  methods: {
    editRole(id){
        this.$emit('doEditRole', id)       
    },
    async deleteRole(id){
         const confirmRes = await this.$confirm('此操作将永久删除该角色,是否继续?', '提示',{
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

            const {data: res} = await deleteRoleById(id)

            if(res.meta.status !== 200){
                return this.$message.error(res.meta.msg)
            }
            
            this.$emit('deleteRole')
            
        }

  },
  created() {},
  mounted() {}
};
</script>
<style lang="less" scoped>
</style>