<template>
  <div>
    <el-table
      :data="currentRoleInfo"
      border
      stripe
      :cell-style="{ textAlign: 'center' }"
      :header-cell-style="{ textAlign: 'center' }"
    >
      <el-table-column type="expand">
        <template v-slot="roleList">
          <el-row
            v-for="(item1, i1) in roleList.row.children"
            :key="item1.id"
            :class="['bdbottom', i1 === 0 ? 'bdtop' : '', 'vcenter']"
          >
            <el-col :span="5">
              <el-tag
                closable
                @close="removePermById(roleList.row, item1.id)"
                >{{ item1.authName }}</el-tag
              >
              <i class="el-icon-caret-right"></i>
            </el-col>
            <el-col :span="19">
              <!-- 通过for循环 嵌套渲染二级权限 -->
              <el-row
                v-for="(item2, i2) in item1.children"
                :key="item2.id"
                :class="[i2 === 0 ? '' : 'bdtop', 'vcenter']"
              >
                <el-col :span="6">
                  <el-tag
                    type="success"
                    closable
                    @close="removePermById(roleList.row, item2.id)"
                    >{{ item2.authName }}</el-tag
                  >
                  <i class="el-icon-caret-right"></i>
                </el-col>
                <!-- 三级权限 -->
                <el-col :span="18">
                  <el-tag
                    type="warning"
                    v-for="item3 in item2.children"
                    :key="item3.id"
                    closable
                    @close="removePermById(roleList.row, item3.id)"
                  >
                    {{ item3.authName }}
                  </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column  type="index" label="序号"  width="60" align="center"
      ></el-table-column>
      <el-table-column label="角色名称" prop="roleName"></el-table-column>
      <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
      <el-table-column label="操作" width="400px">
        <template v-slot="roleList">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="editRole(roleList.row.id)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="deleteRole(roleList.row.id)"
            >删除</el-button
          >
          <el-button
            size="mini"
            type="warning"
            icon="el-icon-setting"
            @click="showSetPermDialog(roleList.row)"
            >分配权限</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <SetPermDialogVue :setRightDialogVisible.sync="setDialogVisible"
    :AllPermInfo="AllPermInfo" :defKeys="defKeys" 
    @closeSetPermDialog="handleClosePermDialog"
    ref="permDialogRef" :roleId="currentRoleId"
    @updatePermInfo="handleUpdatePermInfo"/>
  </div>
</template>

<script>
import { deleteRoleById } from "@/api/role";
import { deletePermByRoleId, getPermissionInfoByTree } from "@/api/permission";
import SetPermDialogVue from "../dialog/SetPermDialog.vue";

export default {
  components: {
    SetPermDialogVue,
  },
  props: ["roleList"],
  data() {
    return {
      currentRoleInfo: [],
      setDialogVisible: false  ,
      AllPermInfo:[],
      //默认选中的节点Id值
      defKeys:[],
      currentRoleId:''
    };
  },
  watch: {
    roleList: {
      immediate: true,
      handler(value) {
        this.currentRoleInfo = [...value];
      },
    },
  },
  computed: {},
  methods: {
    editRole(id) {
      this.$emit("doEditRole", id);
    },
    async deleteRole(id) {
      const confirmRes = await this.$confirm(
        "此操作将永久删除该角色,是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => {
        err;
      });

      if (confirmRes !== "confirm") {
        return this.$message.info("已取消删除");
      }

      const { data: res } = await deleteRoleById(id);

      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg);
      }

      this.$emit("deleteRole");
    },
    async removePermById(currentRowData, permId) {
      const confirmRes = await this.$confirm(
        "此操作将永久删除此角色的权限,是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => {
        err;
      });

      if (confirmRes !== "confirm") {
        return this.$message.info("已取消删除");
      }

      const { data: res } = await deletePermByRoleId(currentRowData.id, permId);

      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg);
      }

      currentRowData.children = res.data;

      this.$message.success("删除权限成功");
    },

    //递归获取所有三级节点
    getPermByRole(node, arr){
    //三级节点
        if(!node.children){
            return arr.push(node.id)
        }

        node.children.forEach(item =>{
            this.getPermByRole(item, arr)
        })
    },    

    async showSetPermDialog(role){
        this.currentRoleId = role.id

        this.defKeys = []

        const {data: res} = await getPermissionInfoByTree()
        
        
        if(res.meta.status!== 200){
            return this.$message.error(res.meta.msg)
        }

        this.AllPermInfo = res.data; 

        this.getPermByRole(role, this.defKeys)

        this.setDialogVisible = true
    },
    handleClosePermDialog(status){
        this.setDialogVisible = status
    },
    handleUpdatePermInfo(){
        this.$emit('doUpdatePermInfo')
        this.setDialogVisible = false
    }
  },
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped>
.el-tag {
  margin: 15px;
}

.bdtop {
  border-top: 1px solid #eee;
}

.bdbottom {
  border-bottom: 1px solid #eee;
}

.vcenter {
  display: flex;
  align-items: center;
}
</style>