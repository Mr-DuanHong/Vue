<template>
  <div class="login_container">
    <div class="login_box">
      <!--      头像区域-->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="">
      </div>
      <!--登录表单区域,需要用:model进行数据绑定;通过ref可以获取表单的实例对象-->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
        <!--用户名；v-model中的数据都存在上边:model绑定的位置内;prop值为该处要用的验证规则-->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="iconfont icon-3702mima" type="password"></el-input>
        </el-form-item>
        <!--按钮区域-->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resertLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>export default {
  data () {
    return {
      // 登录表单的数据绑定对象
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      //  表单验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          // required是否必填；trigger是触发时机，blur是失去焦点之后
          { required: true, message: '请输入登录名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resertLoginForm () {
      // 通过this访问到表单的refs，然后.表单引用对象，然后调用resetFields()方法重置表单
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      // 表单预验证，在点击登录时来验证是否符合表单验证规则
      this.$refs.loginFormRef.validate(async valid => { // 通过refs访问表单;validate接收回调函数从而拿到结果;当账号、密码都对时，预验证结果为true。
        if (!valid) return // 为false时失败，返回空。
        const { data: res } = await this.$http.post('login', this.loginForm) // 进行post验证，返回结果为res
        if (res.meta.status !== 200) return this.$message.error('登录失败！') // this.$message.error('登录失败！')为弹窗提示
        this.$message.success('登录成功！')
        window.sessionStorage.setItem(' token ', res.data.token) // 将登录成功之后的token，保存到客户端的sessionStorage中.sessionStorage 用于临时保存同一窗口(或标签页)的数据，在关闭窗口或标签页之后将会删除这些数据。
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="less" scoped>//less表示这个节点支持Less语法格式；scoped表示组件样式生效区间为当前组件
.login_container {
  background-color: #2b4b6b;
  height:100%;
}

.login_box{
  width:450px;
  height:300px;
  background-color: #fff;
  border-radius:3px;
  position:absolute;
  left:50%;
  top:50%;
  transform: translate(-50%,-50%);  //在横轴、纵轴各移动-50%
  .avatar_box{
    height:130px;
    width:130px;
    border:1px solid #f9f9f9;
    border-radius:50%;
    padding:10px;  //边距使得内部图片和外部边框有一定距离
    box-shadow: 0 0 10px #ddd;
    background-color:#fff;
    position:absolute;   //开始进行位置调整
    left:50%;
    transform:translate(-50%,-50%);
    img{   //对该类中某一个图片进行样式设置
      width:100%;
      height:100%;
      border-radius:50%;
      background-color:#eee;
    }
  }
  }
.btns{
  display:flex;
  justify-content:flex-end;  //横轴设置，放到横轴的尾部
}

.login_form{
  position:absolute;
  bottom:0;
  width:100%;
  padding:0 30px;
  box-sizing:border-box;  //这个使得输入框不超出登录区域
}
</style>
