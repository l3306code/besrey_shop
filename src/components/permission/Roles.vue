<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
            <el-row>
                <el-col :span="24">
                    <el-button type="primary" @click="addDialogVisible = true">添加角色</el-button>
                </el-col>
            </el-row>

            <!-- 角色列表区域 -->
            <RolesFormVue :roleList="roleList" ref="roleFormRef" @deleteRole="handleDeleteRole"/>
        </el-card>

        <!-- 添加角色的弹框 -->
        <el-dialog title="添加角色" :visible.sync="addDialogVisible" width="30%" @close="addDialogVisibleClose">
            <el-form ref="addFormRef" :model="addRoleInfo" label-width="80px" :rules="addRoleRules">
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="addRoleInfo.roleName"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" prop="roleDesc">
                    <el-input v-model="addRoleInfo.roleDesc"></el-input>
                </el-form-item>
            </el-form>

            <!-- 底部区域 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addRole">确 定</el-button>
            </span>

            
        </el-dialog>

        <!-- 修改角色的弹框 -->
        <EditRoleVue :editRoleInfo="editRoleInfo" :editDialogVisible.sync="editDialogVisible" ref="editRoleRef" 
         @update-one-role="handleUpdateOneRole"  />

    </div>
</template>

<script>
import { getAllRolesData, addRole4, getRoleInfoById } from '@/api/role';
import RolesFormVue from './form/RolesForm.vue';
import EditRoleVue from './form/editRole.vue';


export default {
    name: 'RolesVue',
    components: {
        RolesFormVue,
        EditRoleVue
    },
    props: {},
    data() {
        return {
            //所有角色列表数据
            roleList: [],
            addRoleInfo:{

            },
            addDialogVisible:false,
            addRoleRules:{
                roleName: [
                    {
                        required: true, message: '请输入角色名称', trigger: 'blur'
                    },
                    {
                        min: 3, max: 10, message: '角色名称的长度在3-10个字符之间', trigger: 'blur'
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
            },
            editDialogVisible: false,
            editRoleInfo:{

            }
        };
    },
    watch: {},
    computed: {},
    methods: {
        async getRoleList() {
            const { data: res } = await getAllRolesData()

            if (res.meta.status !== 200) {
                return this.$message.error(res.meta.msg)
            }

            this.roleList = res.data
        },
       

        addDialogVisibleClose(){
            this.$refs.addFormRef.resetFields()
        },

        addRole(){
           this.$refs.addFormRef.validate(async valid =>{
              if (!valid) return this.$message.error('数据填写错误,请重新检查')

              const {data:res} = await addRole4(this.addRoleInfo)
              
              if (res.meta.status !== 201) {
                    return this.$message.error(res.meta.msg)
                }

              this.$message.success(res.meta.msg)

              this.addDialogVisible = false
              this.getRoleList()

           })          
        },
        handleUpdateOneRole(editStatus){
            this.editDialogVisible = editStatus
            this.getRoleList()
            this.$message.success('更新角色信息成功')
        },
        handleDeleteRole(){
            this.getRoleList()
            this.$message.success('删除角色信息成功')
        }
    },
    created() {
        this.getRoleList()
    },
    mounted() { 
        this.$refs.roleFormRef.$on('doEditRole',async (id) =>{
            const {data: res} = await getRoleInfoById(id)
            
            if(res.meta.status !==200) return this.$message.error(res.meta.msg)

            this.editRoleInfo = res.data

            this.editDialogVisible = true
            
        })

         this.$refs.editRoleRef.$on('closeEditDialog', (editStatus) => {
            this.editDialogVisible = editStatus
        })

        this.$refs.editRoleRef.$on('cancleEditInfo', (editStatus) => {
            this.editDialogVisible = editStatus
        })


    }
};
</script>
<style lang="less" scoped></style>