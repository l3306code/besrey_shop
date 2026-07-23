<template>
    <div>
        <el-card>
            <el-alert show-icon title="注意: 只允许为第三级分类设置相关参数!" type="warning" :closable="false"></el-alert>


            <!-- 选择商品分类区域 -->
            <el-row class="cat_opt">
                <el-col>
                    <span>选择商品分类: </span>
                    <!-- 选择商品分类的级联选择框 -->
                    <el-cascader :props="{
                        expandTrigger: 'hover',
                        ...cascaderProps,
                        checkStrictly: true
                    }"
                    :options="cateList"
                    v-model="selectedCateKeys"
                    @change="handleChange"
                    >

                    </el-cascader>
                </el-col>
            </el-row>

            <!-- Tab页签区 -->
             <el-tabs v-model="activeName" @tab-click="handleTabClick">
                <el-tab-pane label="动态参数" name="many">
                    <el-button type="primary" size="mini" :disabled="isBtnDisabled">添加参数</el-button>
                </el-tab-pane>
                <el-tab-pane label="静态属性" name="only">
                    <el-button type="primary" size="mini" :disabled="isBtnDisabled">添加属性</el-button>
                </el-tab-pane>
             </el-tabs>
        </el-card>


    </div>
</template>

<script>
import { getCateList } from '@/api/cate';
import { getParamsListById } from '@/api/params';

export default {
    components: {},
    props: {},
    data() {
        return {
            cateList:[],
            cascaderProps:{
                value: 'cat_id',
                label: 'cat_name',
                children: 'children'
            },
            selectedCateKeys:[],
            //默认指定第一个tab
            activeName: 'many'
        };
    },
    watch: {},
    computed: {
        isBtnDisabled(){
            if(this.selectedCateKeys.length !== 3){
                return true
            }

            return false
        },
        //获取选中的三级分类的Id
        cateId(){
            if(this.selectedCateKeys.length === 3){
                return this.selectedCateKeys[2]
            }
            return null
        }
    },
    methods: {
        async getAllCateList(){
            const {data: res} = await getCateList()
            
            if(res.meta.status !== 200){
                return this.$message.error(res.meta.msg)
            }
            
            this.cateList = res.data   
        },
        async handleChange(){
            if(this.selectedCateKeys.length !==3){
                this.selectedCateKeys = []
                return
            }

            const {data: res} = await getParamsListById(this.cateId, {sel: this.activeName})

            


        },
        handleTabClick(){

        }
    },
    created() { 
        this.getAllCateList()
    },
    mounted() { }
};
</script>
<style lang="less" scoped>
.cat_opt {
    margin: 15px 0;
}
</style>