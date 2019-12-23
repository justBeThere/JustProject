<template>
  <el-container>
    <el-header class="cate_mana_header">
      <el-button type="primary" @click="addNewCate">新建</el-button>
      <el-button type="danger" :disabled="this.selItems.length==0" @click="deleteAll" >删除</el-button>
      <el-input
        placeholder="请输入关键字"
        v-model="cateName" style="width: 200px;">
      </el-input>
      <el-button type="primary" @click="addNewCate" icon="el-icon-search"></el-button>
    </el-header>
    <el-main class="cate_mana_main">
      <el-table
        ref="multipleTable"
        :data="categories"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange" v-loading="loading">
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
          label="栏目名称"
          prop="cateName"
          width="120" align="left">
        </el-table-column>
        <el-table-column
          prop="date"
          label="启用时间" align="left">
          <template slot-scope="scope">{{ scope.row.date | formatDate}}</template>
        </el-table-column>
        <el-table-column label="操作" align="left">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>
<script type="text/ecmascript-6">
  export default{
    name: 'HomeMain',
    methods: {
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
        cateName: '',
        selItems: [],
        categories: [],
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
</style>
