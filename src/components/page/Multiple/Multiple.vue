<template>
  <div  style="background-color: rgb(244, 246, 249); padding: 20px;">
    <section >
      <div  style="background-color: rgb(255, 255, 255); padding: 15px;">
    <br>
    <el-button  @click="clickParent" icon=" el-icon-circle-plus" circle style="position: absolute;right: 50%; "></el-button>
        <br><br>
    <div class="box">
      <div v-for="item in id ">
        <el-card shadow="hover"  style="margin-left: 30px;margin-top: 30px">

        <child  :id="id" :item="item" @func="setdelid" style="margin-left: 50px"></child>
        </el-card>
      </div>
    </div>
      </div>
    </section>
  </div>
</template>

<script>
  import Child from  './Chart/Chart'
  export default {
    name: "Multiple",
    components: {
      child: Child
    },
    data() {
      return {
        delid:0,
        id:[],
        count:0,
      }
    },
    watch: {
      delid(newName, oldName) {
        this.id.splice(this.id.indexOf(newName),1) ,
          this.$forceUpdate();
          console.log(this.id)
      }
    },
    methods: {
      setdelid(data){
        this.delid = data

      },
      clickParent() {
        if(this.id.length>=6) {
          this.$message({
            type: 'error',
            message: '最多显示六张表'
          });
          return
        }
        this.count=this.count+1;
        this.id.push(this.count);
        console.log(this.id)
      }
    }
  }
</script>
<style>
  .box{
    display: flex;
    flex-wrap:wrap;
  }
  .btn{
    position:relative;top:50%;  right:0; margin-right:10px;
  }
</style>
