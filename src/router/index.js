import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path:'/Multiple',
                    meta: { title: '自定义图表' },
                    component: () => import( '../components/page/Multiple/Multiple.vue'),
                    children:[
                        {
                            path:'/Chart',
                            name:'Chart',
                            component: () => import( '../components/page/Multiple/Chart/Chart.vue'),
                            children:[
                                {
                                    path:'/Charts',
                                    name:'Charts',
                                    component: () => import( '../components/page/Multiple/Chart/Charts/Charts.vue'),
                                },]
                        },]
                },
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/Collection',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/Collection.vue'),
                    meta: { title: '我的收藏' }
                },
                {
                    path: '/myInfo',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/myInfo.vue'),
                    meta: { title: '我的信息' }
                },
                {
                    path: '/Info',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/Info.vue'),
                    meta: { title: '招聘信息' }
                },
                {
                    path: '/delivery',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/delivery.vue'),
                    meta: { title: '我的投递' }
                },

                {
                    // 图片上传组件
                    path: '/upload',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/page/utils/Upload.vue'),
                    meta: { title: '文件上传' }
                },
                {
                    // vue-schart组件
                    path: '/Jobana',
                    component: () => import(/* webpackChunkName: "chart" */ '../components/page/Jobana.vue'),
                    meta: { title: '岗位分析' }
                },
                {
                    // vue-schart组件
                    path: '/Companyana',
                    component: () => import(/* webpackChunkName: "chart" */ '../components/page/Companyana.vue'),
                    meta: { title: '公司分析' }
                },
                {
                    // vue-schart组件
                    path: '/regionana',
                    component: () => import(/* webpackChunkName: "chart" */ '../components/page/regionana.vue'),
                    meta: { title: '地区分析' }
                },
                {
                    // vue-schart组件
                    path: '/multiple',
                    component: () => import(/* webpackChunkName: "chart" */ '../components/page/Multiple/Multiple.vue'),
                    meta: { title: '自定义分析' }
                },
                {
                    // vue-schart组件
                    path: '/person',
                    component: () => import(/* webpackChunkName: "chart" */ '../components/page/person.vue'),
                    meta: { title: '用户信息管理' }
                },
                {
                    // vue-schart组件
                    path: '/recruit',
                    component: () => import(/* webpackChunkName: "chart" */ '../components/page/recruit.vue'),
                    meta: { title: '招聘信息管理' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: () => import(/* webpackChunkName: "drag" */ '../components/page/utils/DragList.vue'),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/utils/DragDialog.vue'),
                    meta: { title: '拖拽弹框' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/utils/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/utils/403.vue'),
                    meta: { title: '403' }
                },
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '/register',
            component: () => import(/* webpackChunkName: "register" */ '../components/page/register.vue'),
            meta: { title: '注册' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
