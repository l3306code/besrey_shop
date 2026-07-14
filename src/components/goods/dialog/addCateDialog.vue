<template>
  <el-dialog title="修改用户" :visible="editDialogVisible"  width="30%" :before-close="handleClose">
             <el-form ref="editFormRef" :model="editForm" label-width="70px" :rules="editFormRules"
              @close="editDialogClosed" >
                <el-form-item label="用户名">
                    <el-input v-model="editForm.username" disabled></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="mobile">
                    <el-input v-model="editForm.mobile"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="editForm.email"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="cancleEdit()">取 消</el-button>
                <el-button type="primary" @click="editUserInfo()">确 定</el-button>
            </span>
        </el-dialog>
</template>

<script>
export default {

}
</script>

<style>

</style>