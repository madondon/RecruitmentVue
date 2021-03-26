<template>
    <div id="app">
        <router-view v-if="active"></router-view>
    </div>
</template>
<script>
    export default {
        name: 'App',
        provide (){
            return {
                reload:this.reload
            }
        },
        data(){
            return {
                active:true
            }
        },
        methods:{
            reload (){
                this.active = false
                this.$nextTick(function(){
                    this.active = true
                })
            }
        },
        components:{
        }
    }
</script>
<style>
    @import "./assets/css/main.css";
    @import "./assets/css/color-dark.css";     /*深色主题*/
    /*@import "./assets/css/theme-green/color-green.css";*/
</style>