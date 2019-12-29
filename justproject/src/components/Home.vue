<template>
  <el-container class="home_container">
    <el-header class="el-header">
      <div class="home_title">Just Project!</div>
      <div class="home_userinfoContainer">
        <el-dropdown @command="handleCommand" trigger="click">
          <span class="el-dropdown-link home_userinfo">
            {{currentUserName}}<i class="el-icon-arrow-down el-icon--right home_userinfo"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="myHome">个人主页</el-dropdown-item>
            <el-dropdown-item command="changeKey">修改密码</el-dropdown-item>
            <el-dropdown-item command="sysConfig">系统配置</el-dropdown-item>
            <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-main>
      <keep-alive>
        <router-view v-if="this.$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!this.$route.meta.keepAlive"></router-view>
    </el-main>
    <el-footer class="el-footer">Footer</el-footer>
  </el-container>
</template>
<script>
  export default{
    name: 'Home',
    data: function(){
      return {
        currentUserName: 'LVMH'
      }
    },
    methods: {
      handleCommand(command) {
        this.$message('click on item ' + command);
      }
    }
  }
</script>
<style>
  .home_container {
    height: 100%;
    position: absolute;
    /*top: 0px;*/
    left: 0px;
    width: 100%;
  }
  .el-header {
    background-color: #20a0ff;
    color: #333;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .el-footer {
    background-color: #20a0ff;
    color: #fff;
    align-items: center;
    text-align: center;
  }
  .home_title {
    color: #fff;
    font-size: 22px;
    display: inline;
  }
  .home_userinfo {
    color: #fff;
    cursor: pointer;
  }
  .home_userinfoContainer {
    display: inline;
    margin-right: 20px;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #fff;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
