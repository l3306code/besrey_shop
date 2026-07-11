<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视角区域 -->
        <el-card>
            <!-- 搜索与添加区域 -->
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input placeholder="请输入用户姓名（可支持模糊搜索）" v-model="queryInfo.query" clearable @clear="getUserList()">
                        <el-button slot="append" icon="el-icon-search" @click="getUserList()"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
                </el-col>
            </el-row>
            <!-- 用户列表区域 -->
            <el-table :data="userlist" border stripe :cell-style="{ textAlign: 'center' }"
                :header-cell-style="{ textAlign: 'center' }">
                <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
                <el-table-column label="姓名" prop="username"></el-table-column>
                <el-table-column label="邮箱" prop="email"></el-table-column>
                <el-table-column label="电话" prop="mobile"></el-table-column>
                <el-table-column label="角色" prop="role_name"></el-table-column>
                <el-table-column label="状态">
                    <!-- 插槽 -->
                    <template v-slot="userInfo">
                        <el-switch v-model="userInfo.row.mg_state"
                            @change="userStateChanged(userInfo.row.mg_state, userInfo.row.id)">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="250px">
                    <template v-slot="userInfo">
                        <el-tooltip effect="dark" placement="top" content="编辑" :enterable="false">
                            <el-button type="primary" icon="el-icon-edit" size="mini"
                                @click="showEditDialog(userInfo.row.id)"></el-button>
                        </el-tooltip>

                        <el-tooltip effect="dark" placement="top" content="删除" :enterable="false">
                            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeByUserId(userInfo.row.id)"></el-button>
                        </el-tooltip>
                        <el-tooltip effect="dark" placement="top" content="分配角色" :enterable="false">
                            <el-button type="warning" icon="el-icon-setting" size="mini" @click="setRoleForUser(userInfo.row)"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页区域 -->
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="queryInfo.pagenum" :page-sizes="[5, 10, 20, 30]" :page-size="queryInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </el-card>

        <!-- 添加用户的弹框 -->
        <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="30%" @close="addDialogVisibleClose">
            <el-form ref="addFormRef" :model="addUserInfo" label-width="80px" :rules="addFormRules">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="addUserInfo.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="addUserInfo.password"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="addUserInfo.email"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="mobile">
                    <el-input v-model="addUserInfo.mobile"></el-input>
                </el-form-item>
            </el-form>

            <!-- 底部区域 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addUser">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 编辑弹框组件 -->
        <editUserVue :editDialogVisible.sync="editDialogVisible" :currentUserInfo="currentUserInfo" ref="editUserRef"
            @update-one-user="handleUpdateOneUser" />

        <!-- 分配角色组件 -->
        <AllocRoleVue :setRoleDialogVisible.sync="setRoleDialogVisible"
        :currentUserInfo="roleForUserInfo"
        @doGetUserList="handleUpdateUserRole"
        @setRoleDialogClosed="handleSetRoleDialogClosed"/> 
        
        
    </div>
</template>

<script>
import { getUserData, updateUserState, addUserInfo4, getUserInfoById, deleteUserById } from '@/api/user';
import editUserVue from './editUser.vue';
import AllocRoleVue from './dialog/AllocRole.vue';

export default {
    name: 'UsersVue',
    components: {
        editUserVue,
        AllocRoleVue
    },
    created() {
        this.getUserList()
    },
    props: {},
    data() {
        let checkEmail = (_, value, cb) => {
            const regEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

            if (regEmail.test(value)) {
                //合法的邮箱
                return cb()
            }

            cb(new Error('请输入合法的邮箱'))
        }

        let checkMobile = (_, value, cb) => {
            const regMobile = /^1[3-9]\d{9}$/;

            if (regMobile.test(value)) {
                //合法的邮箱
                return cb()
            }

            cb(new Error('请输入正确的手机号'))

        }
        return {
            //获取用户列表的参数对象
            queryInfo: {
                query: '',
                pagenum: 1,
                pagesize: 5
            },
            userlist: [],
            total: 0,
            addDialogVisible: false,
            addUserInfo: {
                username: '',
                password: '',
                email: '',
                mobile: ''
            },
            addFormRules: {
                username: [
                    {
                        required: true, message: '请输入用户名', trigger: 'blur'
                    },
                    {
                        min: 3, max: 10, message: '用户名的长度在3-10个字符之间', trigger: 'blur'
                    }
                ],
                password: [
                    {
                        required: true, message: '请输入密码', trigger: 'blur'
                    },
                    {
                        min: 6, max: 15, message: '密码的长度在6-15个字符之间', trigger: 'blur'
                    }
                ],
                email: [
                    {
                        required: true, message: '请输入邮箱', trigger: 'blur'
                    },
                    {
                        min: 10, max: 25, message: '邮箱的长度在10-25个字符之间', trigger: 'blur'
                    },
                    {
                        validator: checkEmail, trigger: 'blur'
                    }
                ],
                mobile: [
                    {
                        required: true, message: '请输入电话号码', trigger: 'blur'
                    },
                    {
                        min: 11, max: 11, message: '电话号码的长度在11个字符之间', trigger: 'blur'
                    }, {
                        validator: checkMobile, trigger: 'blur'
                    }
                ]
            },
            editDialogVisible: false,
            currentUserId: 0,
            currentUserInfo: {},
            setRoleDialogVisible:false,
            roleForUserInfo:{}
        };
    },
    watch: {},
    computed: {},
    methods: {
        async getUserList() {
            const { data: res } = await getUserData(this.queryInfo)

            if (res.meta.status !== 200) return this.$message.error(res.meta.msg)

            this.userlist = res.data.users;

            this.total = res.data.total

        },
        //监听页面值的改变
        handleSizeChange(newSize) {
            this.queryInfo.pagesize = newSize
            this.getUserList()
        },
        //监听页码值改变
        handleCurrentChange(newPage) {
            this.queryInfo.pagenum = newPage
            this.getUserList()
        },

        //改变状态
        async userStateChanged(state, id) {
            const { data: res } = await updateUserState(id, state)

            if (res.meta.status !== 200) {
                this.getUserList()
                return this.$message.error(res.meta.msg)
            }

            this.$message.success(res.meta.msg)
        },

        addDialogVisibleClose() {
            this.$refs.addFormRef.resetFields()
        },
        addUser() {
            this.$refs.addFormRef.validate(async valid => {
                if (!valid) return this.$message.error('数据填写错误,请重新检查')

                const { data: res } = await addUserInfo4(this.addUserInfo)

                if (res.meta.status !== 201) {
                    return this.$message.error(res.meta.msg)
                }

                this.$message.success(res.meta.msg)

                this.addDialogVisible = false
                this.getUserList()
            })
        },
        //展示编辑页面
        async showEditDialog(currentUserId) {
            this.editDialogVisible = true;
            this.currentUserId = currentUserId

            const { data: res } = await getUserInfoById(currentUserId)

            if (res.meta.status !== 200) {
                return this.$message.error(res.meta.msg)
            }

            this.currentUserInfo = res.data

        },
        handleUpdateOneUser(editStatus) {
            this.editDialogVisible = editStatus
            this.getUserList()
            this.$message.success('更新用户信息成功')
        },
        async removeByUserId(id){
            const confirmRes = await this.$confirm('此操作将永久删除该用户,是否继续?', '提示',{
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

            const {data: res} = await deleteUserById(id)

            if(res.meta.status !== 200){
                return this.$message.error(res.meta.msg)
            }

            this.$message.success(res.meta.msg)

            this.getUserList()
        },
        setRoleForUser(currentInfo){
            this.roleForUserInfo = currentInfo
            this.setRoleDialogVisible = true
        },
        handleUpdateUserRole(){
            this.getUserList()
            this.setRoleDialogVisible = false;
        },
        handleSetRoleDialogClosed(){
            this.setRoleDialogVisible = false
            this.roleForUserInfo = {}
        }


    },

    mounted() {
        this.$refs.editUserRef.$on('closeEditDialog', (editStatus) => {
            this.editDialogVisible = editStatus
        })

        this.$refs.editUserRef.$on('cancleEditInfo', (editStatus) => {
            this.editDialogVisible = editStatus
        })

        /* this.$refs.editUserRef.$on('updateOneUser', (editStatus) => {
            this.editDialogVisible = editStatus
            this.getUserList()
            this.$message.success('更新用户信息成功')
        }) */
    }
};
</script>
<style lang="less" scoped></style>
