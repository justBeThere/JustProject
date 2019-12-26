<template>
  <el-container>
    <el-header class="cate_mana_header">
      <el-button type="primary" @click="addNewCate">新建</el-button>
      <el-button type="danger" :disabled="this.selItems.length==0" @click="deleteAll">删除</el-button>
      <el-input
        placeholder="请输入关键字"
        v-model="cateName" style="width: 200px;">
      </el-input>
      <el-button type="primary" @click="addNewCate" icon="el-icon-search"></el-button>
    </el-header>
    <el-main class="cate_mana_main">
      <el-table
        ref="multipleTable"
        :data="projects"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        @row-dblclick="openSelectedProject"
        @row-contextmenu="rightClick"
        v-loading="loading">
        <el-table-column
          type="selection"
          width="55" align="left">
        </el-table-column>
        <el-table-column
          label="编号"
          prop="id"
          width="120" align="left">
        </el-table-column>
        <el-table-column
          label="名称"
          prop="name"
          width="180" align="left">
        </el-table-column>
        <el-table-column
          label="详情"
          prop="info"
          width="120" align="left">
        </el-table-column>
        <el-table-column
          label="所有者"
          prop="owner"
          width="120" align="left">
        </el-table-column>
        <el-table-column
          label="类型"
          prop="type"
          width="120" align="left">
        </el-table-column>
        <el-table-column
          label="等级"
          prop="level"
          width="120" align="left">
        </el-table-column>
        <el-table-column
          label="状况"
          prop="status"
          width="120" align="left">
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="创建时间" align="left">
          <template slot-scope="scope">{{ scope.row.date | formatDate}}</template>
        </el-table-column>
      </el-table>
      <div v-show="menuVisible">
        <div id="menu" class="menu">
          <li class="menu_item" @click="openCurrentProject">打开</li>
          <li class="menu_item" @click="openCurrentProject">删除</li>
        </div>
      </div>
    </el-main>
  </el-container>
</template>
<script type="text/ecmascript-6">
  export default{
    name: 'HomeMain',
    methods: {
      rightClick(row, column, event){
        this.menuVisible = false; // 先把模态框关死，目的是 第二次或者第n次右键鼠标的时候 它默认的是true
        this.menuVisible = true;  // 显示模态窗口，跳出自定义菜单栏
        event.preventDefault();
        var menu = document.querySelector('#menu');
        document.addEventListener('click', this.foo); // 给整个document添加监听鼠标事件，点击任何位置执行foo方法
        menu.style.display = "block";
        menu.style.left = event.clientX + 'px';
        menu.style.top = event.clientY + 'px';
        this.currentRow = row;
      },
      foo() { // 取消鼠标监听事件 菜单栏
        this.menuVisible = false
        document.removeEventListener('click', this.foo) // 要及时关掉监听，不关掉的是一个坑，不信你试试，虽然前台显示的时候没有啥毛病，加一个alert你就知道了
      },
      openCurrentProject(){
        alert("id--->" + this.currentRow.id);
      },
      openSelectedProject(row, column, event){
        alert("row--->" + row.id);
        var keys = [];
        for (var i in row) {
          keys.push(i);
        }
        console.log("rowKey--->" + keys);
      },
      addNewCate(){
      },
      deleteAll(){
        var _this = this;
        this.$confirm('确认删除这 ' + this.selItems.length + ' 条数据?', '提示', {
          type: 'warning',
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(()=> {
          var selItems = _this.selItems;
          var ids = '';
          for (var i = 0; i < selItems.length; i++) {
            ids += selItems[i].id + ",";
          }
          _this.deleteCate(ids.substring(0, ids.length - 1));
        }).catch(() => {
          //取消
          _this.loading = false;
        });
      },
      handleSelectionChange(val) {
        this.selItems = val;
      },
      handleEdit(index, row){
        var _this = this;
        this.$prompt('请输入新名称', '编辑', {
          confirmButtonText: '更新',
          inputValue: row.cateName,
          cancelButtonText: '取消'
        }).then(({value}) => {
          //value就是输入值
          if (value === null || value.length === 0) {
            _this.$message({
              type: 'info',
              message: '数据不能为空!'
            });
          } else {
          }
        });
      },
      handleDelete(index, row){
        let _this = this;
        this.$confirm('确认删除 ' + row.cateName + ' ?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.deleteCate(row.id);
        }).catch(() => {
          //取消
          _this.loading = false;
        });
      },
      deleteCate(ids){
        this.loading = true;
        //删除
      },
      refresh(){

      }
    },
    mounted: function () {
//      this.loading = true;
      this.refresh();
    },
    data(){
      return {
        menuVisible: false,
        cateName: '',
        selItems: [],
        currentRow: null,
        projects: [{
          id: '0001',
          name: 'testProject',
          info: 'I',
          owner: 'LVMH',
          type: 'Design',
          level: 'A',
          status: 'RUNNING',
          date: '2019-12-24'
        }],
        loading: false
      }
    }
  }
</script>
<style>
  .cate_mana_header {
    background-color: #ececec;
    margin-top: 20px;
    padding-left: 5px;
    /*display: flex;*/
    /*justify-content: flex-start;*/
  }

  .cate_mana_main {
    /*justify-content: flex-start;*/
    display: flex;
    flex-direction: column;
    padding-left: 5px;
    background-color: #ececec;
    margin-top: 20px;
    padding-top: 10px;
  }

  .menu_item {
    line-height: 20px;
    text-align: center;
    margin-top: 10px;
  }

  .menu {
    height: 100px;
    width: 180px;
    position: absolute;
    border-radius: 10px;
    border: 1px solid #999999;
    background-color: #f4f4f4;
  }

  li:hover {
    background-color: #1790ff;
    color: white;
  }

  li {
    font-size: 15px
  }
</style>
