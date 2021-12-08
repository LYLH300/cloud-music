<template>
  <div class="login">
    <el-form ref="form" :model="form" :rules="rules" label-width="0">
      <el-form-item prop="phone">
        <el-input prefix-icon="el-icon-user" v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          prefix-icon="el-icon-link"
          v-model="form.password"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
        <el-button type="info" @click="clearAll">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {cellPhone} from 'network/login.js'
export default {
  name: "Login",
  data() {
    return {
      form: {
        phone: "",
        password: "",
      },
      rules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      
    };
  },
  methods: {
    clearAll() {
      this.$nextTick(() => {
        this.$refs.form.resetFields();
      });
    },
    login(){
       this.$nextTick(() => {
        this.$refs.form.validate((valid)=>{
          cellPhone(this.form.phone,this.form.password).then((res)=>{
              this.$store.commit('getUserInfo',res)
              console.log(this.$store.state.userInfo);
              window.sessionStorage.setItem('token',res.token)
              window.sessionStorage.setItem('uesrInfo',res.profile.avatarUrl)
              console.log(window.sessionStorage.getItem('uesrInfo'));
              
          })
          this.$router.push('/findmusic')
        });
      });
    }
  },
};
</script>

<style scoped>
</style>