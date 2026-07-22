<template>
    <el-dialog title="编辑分类" :visible="editCateDialogVisible"  width="50%" 
    @close="addDialogClosed ">
          
    </el-dialog>
</template>

<script>
export default {
    name: 'editCateDialogVue',
    props:['editCateDialogVisible'],
    methods:{
        
    }
}
</script>

<style>

</style>