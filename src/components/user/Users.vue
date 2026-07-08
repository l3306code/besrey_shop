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
                            @change="userStateChanged(userInfo.row.mg_state, userInfo.row.id)"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="250px">
                    <template>
                        <el-tooltip effect="dark" placement="top" content="编辑" :enterable="false">
                            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
                        </el-tooltip>

                        <el-tooltip effect="dark" placement="top" content="删除" :enterable="false">
                            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
                        </el-tooltip>
                        <el-tooltip effect="dark" placement="top" content="分配角色" :enterable="false">
                            <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页区域 -->
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="queryInfo.pagenum" :page-sizes="[2, 10, 20, 30]" :page-size="queryInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </el-card>

        <!-- 添加用户的弹框 -->
        <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="30%">
            <!-- <el-form ref="form" :model="userInfo" label-width="80px">
                <el-form-item label="活动名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
            </el-form> -->

            <!-- 底部区域 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getUserData, updateUserState } from '@/api/user';


export default {
    name: 'UsersVue',
    components: {},
    created() {
        this.getUserList()
    },
    props: {},
    data() {
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
            userInfo:{
                
            }
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

        }


    },

    mounted() { }
};
</script>
<style lang="less" scoped></style>
