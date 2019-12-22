<template>
  <el-container>
    <el-header class="cate_mana_header">
      <el-button type="primary" size="medium" @click="addNewCate">新建</el-button>
      <el-button type="danger" :disabled="this.selItems.length==0" @click="deleteAll" v-if="this.categories.length>0">删除
      </el-button>
      <el-input
        placeholder="请输入关键字"
        v-model="cateName" style="width: 200px;">
      </el-input>
      <el-button type="primary" size="medium" style="margin-left: 10px" @click="addNewCate">查找</el-button>
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
<style>
  .cate_mana_header {
    background-color: #ececec;
    margin-top: 20px;
    padding-left: 5px;
    display: flex;
    justify-content: flex-start;
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
