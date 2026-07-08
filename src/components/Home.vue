<template>
    <el-container class="home-container">
        <!-- 头部区域 -->
        <el-header>
            <div>
                <img src="../assets/besrey.jpg" alt="">
                <span>besrey后台管理系统</span>
            </div>
            <el-button type="info" @click="logout">退出</el-button>
        </el-header>
        <el-container>
            <!-- 侧边栏 -->
            <el-aside :width="isCollapse ? '64px' : '200px'">
                <div class="toggle-button" @click="toggleCollapse">|||</div>
                <el-menu
                    background-color="#333744" text-color="#fff" active-text-color="#409EEF" 
                    unique-opened
                    :collapse="isCollapse"
                    :collapse-transition="false"
                    :router="true"
                    >
                    <!-- 一级菜单 -->
                    <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
                        <!-- 一级菜单的模板区域 -->
                        <template slot="title">
                            <i :class="iconsObj[item.id]"></i>
                            <span>{{ item.authName }}</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id"
                        @click="saveNavState('/' + subItem.path)">
                            <template slot="title"> 
                                <i class="el-icon-menu"></i>
                                <span>{{ subItem.authName }}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!-- 右侧内容主体 -->
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import { getMenuData } from '@/api/user';

export default {
    name: 'HomeVue',
    data(){
        return{
            menuList:[],
            iconsObj:{
                '125': 'el-icon-user-solid',      // 用户管理
                '103': 'el-icon-lock',            // 权限管理
                '101': 'el-icon-goods',           // 商品管理
                '102': 'el-icon-s-order',         // 订单管理
                '145': 'el-icon-data-analysis'    // 数据统计
            },
            isCollapse:false
        }
    },
    created(){
        this.getMenuList()
    },
    methods: {
        logout() {
            window.sessionStorage.clear()
            this.$router.push("/login")
        },
        async getMenuList(){
            const {data: res} = await getMenuData()
            if(res.meta.status !== 200) return this.$message.error(res.meta.msg)
            this.menuList = res.data
        },
        //点击按钮，切换菜单的折叠与展开
        toggleCollapse(){
            this.isCollapse = !this.isCollapse
        },
        //保存链接的激活状态
        saveNavState(){

        }
    }

}
</script>

<style lang="less" scoped>
.el-header {
    background-color: #373D41;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;

    img {
        height: 50px;
        width: 80px;
    }

    ;
    color: #fff;

    font-size: 25px;

    >div {
        display: flex;
        align-items: center;

        span {
            margin-left: 15px;
        }
    }
}


.el-aside {
    background-color: #333744;
    .el-menu{
        border-right: none;
    }
}

.el-main {
    background-color: #EAEDF1;
}

.home-container {
    height: 100%;
}

.toggle-button{
    background-color: #4A5064;
    font-size: 10px;
    line-height: 24px;
    color:#fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
}


</style>