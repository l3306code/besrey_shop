<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像组件 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <!--登录表单区域  -->
      <el-form
        ref="jlForm"
        :model="loginForm"
        label-width="auto"
        class="login_form"
        :rules="loginFormRules"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user">
          </el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>

        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { doLogin } from '@/api/login';

export default {
  name: "LoginVue",
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123456",
      },

      //验证表单规则
      loginFormRules: {
        //验证用户名密码是否合法
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 12, message: "用户名长度需在3-12个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "密码长度需在6-12个字符", trigger: "blur" },
        ],
      },
    };
  },

  methods:{
    resetLoginForm(){
       this.$refs.jlForm.resetFields()
    },

    login(){
        this.$refs.jlForm.validate(async (valid) =>{
            if(!valid) return
            
            const {data: res} = await doLogin(this.loginForm)

            const res_msg = res.meta.msg

            if(res.meta.status !== 200) return this.$message.error(res_msg)

            this.$message.success(res_msg)

            window.sessionStorage.setItem("token", res.data.token)

            this.$router.push('/home')
                      
        })
    }
  }
};
</script>

<style scoped lang="less">
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>