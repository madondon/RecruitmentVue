<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"

            unique-opened
            router
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
export default {
    data() {
        return {
            collapse: false,
            userInfo:JSON.parse(localStorage.getItem('userInfo')),
            items: [
                {
                    icon: 'el-icon-lx-home',
                    index: 'dashboard',
                    title: '系统首页'
                },
                {
                    icon: 'el-icon-lx-cascades',
                    index: 'Info',
                    title: '招聘信息'
                },

                {
                    icon: 'el-icon-lx-calendar',
                    index: '3',
                    title: '招聘分析',
                    subs: [
                        {
                            index: 'Companyana',
                            title: '公司分析'
                        },
                        {
                            index: 'Jobana',
                            title: '岗位分析'
                        },
                        {
                            index: 'regionana',
                            title: '地区分析'
                        },
                        {
                            index: 'multiple',
                            title: '自定义分析'
                        }
                    ]
                },
                {
                    icon: 'el-icon-lx-emoji',
                    index: 'Collection',
                    title: '我的收藏'
                },
                {
                    icon: 'el-icon-lx-copy',
                    index: 'delivery',
                    title: '我的投递'
                },
                {
                    icon: 'el-icon-pie-chart',
                    index: 'myInfo',
                    title: '我的信息'
                },
                {
                    icon: 'el-icon-lx-calendar',
                    index: '4',
                    title: '系统管理',
                    subs: [
                        {
                            index: 'person',
                            title: '用户信息管理'
                        },
                        {
                            index: 'recruit',
                            title: '招聘信息管理'
                        },
                    ]
                },
            ]
        };
    },
    mounted(){
        if(this.userInfo.admin==="否")
            this.items.pop();
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
