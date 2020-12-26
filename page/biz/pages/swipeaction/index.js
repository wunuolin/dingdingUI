Page({
  data: {
    swipeIndex: null,
    right1: [{ type: 'delete', text: '删除' }],
    right2: [{ type: 'edit', text: '取消收藏' }, { type: 'delete', text: '删除' }],
  },
  onRightItemClick(e) {
    // e.index==0 --> 取消收藏   e.index==1  --> 删除
    if (e.index == 1) {
      dd.confirm({
        title: '提示',
        content: "是否确认删除？",
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        success: (result) => {
          if (result.confirm) {
            dd.showToast({
              content: '点击了确定/item1',
            });
            e.done();
          } else {
            dd.showToast({
              content: '点击了取消/item1',
            });
          }
        },
      });
    } else {
      dd.showToast({
        content: '点击了item0',
      });
    }
    e.done()
  },
  onItemClick(e) {
    dd.alert({
      content: `dada${e.index}`,
    });
  },
  onSwipeStart(e) {
    this.setData({
      swipeIndex: e.index || null,
    });
  },
});