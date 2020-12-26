Page({
    data: {
        items: [
            {
                title: '单行列表',
                extra: '详细信息',
            },
            {
                title: '多行列表',
                brief: '描述信息',
                arrow: true,
            },
            {   
                thumb: 'http://file06.16sucai.com/2016/0330/b5f2887285d2fdef4e8cb92f525807e7.jpg',
                title: '多行列表',
                brief: '描述信息',
                arrow: true
            },
            {   
                thumb: 'http://file06.16sucai.com/2016/0330/b5f2887285d2fdef4e8cb92f525807e7.jpg',
                title: '多行列表',
                extra: '描述信息'
            },
        ],
        items2: [
            {
                title: '单行列表',
                arrow: true
            },
            {
                title: '单行列表',
                arrow: true
            },
            {
                title: '单行列表',
                arrow: true
            },
            {
                title: '单行列表',
                arrow: true
            },
            {
                title: '单行列表',
                arrow: true
            },
            {
                title: '单行列表',
                arrow: true
            },
            {
                title: '单行列表',
                arrow: true
            },
            {
                title: '单行列表',
                arrow: true
            },
        ]
    },
    onItemClick(ev) {
        dd.alert({
            content: `点击了第${ev.index}行`,
        });
    },
})