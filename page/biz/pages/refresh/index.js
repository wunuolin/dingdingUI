Page({
    onPullDownRefresh() {
        console.log('onPullDownRefresh', new Date())
    },
    stop(){
        dd.stopPullDownRefresh()
    }
})