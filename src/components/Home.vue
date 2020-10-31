<template>
  <!--  注意使用的组件，其名字就可以作为类名-->
  <el-container class="home-container">
    <!--头部区-->
    <el-header>
      <div>
        <img src="../assets/logo.png" width="50px" alt="">
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!--页面主体区-->
    <el-container>
      <!--侧边栏-->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <!--侧边栏点击隐藏按钮-->
        <div class="toggle-button" @click="toggleCollapse">
          |||
        </div>
        <!--侧边栏菜单区-->
        <el-menu
          background-color="#1e283d"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened router
          :default-active="activePath"
          :collapse="isCollapse"
          :collapse-transition="false">
          <!--一级菜单，index相同的菜单会一起打开；item.id不是字符串，加一个空字符串之后就变成字符串了-->
          <el-submenu
            :index = "item.id + ''"
            v-for="item in menulist"
            :key="item.id">
            <!--一级菜单模板区-->
            <template slot="title">
              <!--图标-->
              <i :class="iconsObj[item.id]"></i>
              <!--文本，通过插值表达式动态绑定，注意前后空格-->
              <span>{{ item.authName }}</span>
            </template>
            <!--二级菜单-->
            <el-menu-item
              :index="'/' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="saveNavState('/' + subItem.path)">
              <template slot="title">
                <!--图标-->
                <i class="el-icon-menu"></i>
                <!--文本-->
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!--右侧主体-->
      <el-main>
        <!--路由占位符-->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>export default {
  data () {
    return {
      // 是否折叠
      isCollapse: false,
      // 左侧菜单数据
      menulist: [],
      iconsObj: {
        '125': 'iconfont icon-user',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao'
      },
      // 被激活的链接地址
      activePath: ''
    }
  },
  created () { // 生命周期函数,调用getMenuList()函数去获取所有左侧菜单
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    async getMenuList () {
      const { data: res } = await this.$http.get('menus') // API接口请求，请求路径menus
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menulist = res.data
      console.log(res)
    },
    // 保存链接激活状态
    saveNavState (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style lang="less" scoped>
  .home-container{
    height:100%;
  }
  .el-header{
    background-color: #0b0b0b;
    display: flex;
    justify-content: space-between;
    align-items:center;
    color:#ffffff;
    font-size:20px;
    // 对el-header中的div元素进行调整
    > div {
      display:flex;
      align-items: center;
      span {
        margin-left: 15px;
      }
    }
  }
  .el-aside{
    background-color: #1e283d;
    .el-menu {
      border-right:none;
    }
  }
  .el-main{
    background-color: #e0e0e0;
  }
  .toggle-button{
    background-color: #2b4b6b;
    font-size:10px;
    line-height:24px;
    color:#fff;
    text-align:center;
    letter-spacing:0.2em;
    cursor:pointer;
  }
  .iconfont {
    margin-right:10px;
  }
</style>
