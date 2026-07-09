<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-table :data="pagePermissionList" border stripe :cell-style="{ textAlign: 'center' }"
        :header-cell-style="{ textAlign: 'center' }">
        <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
        <el-table-column label="权限名称" prop="authName"></el-table-column>
        <el-table-column label="路径" prop="path"></el-table-column>
        <el-table-column label="权限等级" prop="level">
          <template v-slot="permissionInfo">
            <el-tag v-if="permissionInfo.row.level === '0'">一级权限</el-tag>
            <el-tag type="success" v-else-if="permissionInfo.row.level === '1'">二级权限</el-tag>
            <el-tag type="warning" v-else>三级权限</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 分页区域 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page="currentPage" :page-sizes="[5, 10, 20, 30]" :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper" :total="permissionList.length">
    </el-pagination>

  </div>
</template>

<script>
import { getPermissionList } from '@/api/permission';

export default {
  name: 'RightsVue',
  components: {},
  props: {},
  data() {
    return {
      permissionList: [],

      // 当前页
      currentPage: 1,

        // 每页数量
      pageSize: 10
    };

     
  },
  watch: {},
  computed: {
    pagePermissionList(){

        let start = (this.currentPage - 1) * this.pageSize

        let end = start + this.pageSize

        return this.permissionList.slice(start,end)
    }
  },
  methods: {
    async getRightsList() {
      const { data: res } = await getPermissionList()

      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }

      this.permissionList = res.data
    },
    handleSizeChange(val){
        this.pageSize = val
        this.currentPage = 1
    },

    handleCurrentChange(val){
        this.currentPage = val
    }
  },
  created() {
    this.getRightsList()
  },
  mounted() { }
};
</script>
<style lang="less" scoped></style>