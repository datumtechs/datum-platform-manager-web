export default {
    methods: {
        handleSizeChange (item) {
            this.pageSize = item
            this.initData()
        },
        handlePageChange (item) {
            this.curPage = item
            this.initData()
        }
    }
}