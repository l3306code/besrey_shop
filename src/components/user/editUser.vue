<template>
    <div>
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
    </div>
</template>


<script>
import { updateUserInfoById } from '@/api/user';
export default {
    name: 'editUserVue', 
    components: {},
    props: ['editDialogVisible', 'currentUserInfo'],
    data() {
        let checkEmail = (_, value, cb)=>{
            const regEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

            if(regEmail.test(value)){
                //合法的邮箱
                return cb()
            }

            cb(new Error('请输入合法的邮箱'))
        }

        let checkMobile = (_, value, cb)=>{
            const regMobile = /^1[3-9]\d{9}$/;

            if(regMobile.test(value)){
                //合法的邮箱
                return cb()
            }

            cb(new Error('请输入正确的手机号'))

        }

        return {
            editForm:{

            },

            editFormRules:{
                email:[
                    {
                        required: true,message: '请输入邮箱', trigger:'blur'
                    },
                    {
                        min: 10, max:25, message:'邮箱的长度在10-25个字符之间',trigger:'blur'
                    },
                    {
                        validator:checkEmail, trigger:'blur'
                    }
                ],
                mobile:[
                    {
                        required: true,message: '请输入电话号码', trigger:'blur'
                    },
                    {
                        min: 11, max:11, message:'电话号码的长度在11个字符之间',trigger:'blur'
                    },{
                        validator:checkMobile, trigger:'blur'
                    }
                ]
            }
        };
    },
    watch: {
        currentUserInfo:{
            immediate: true,
            handler(value){
                this.editForm = {...value}
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
        editUserInfo(){
            this.$refs.editFormRef.validate(async valid=>{
                if(!valid) return
                const {data:res} = await updateUserInfoById(this.editForm.id, {
                    email: this.editForm.email,
                    mobile: this.editForm.mobile
                })

                if(res.meta.status !==200){
                    return this.$message.error(res.meta.msg)
                }

                //关闭对话框
                this.$emit('update-one-user', false)
            })
        }
    },
    created() { },
    mounted() { }
};
</script>
<style lang="less" scoped></style>