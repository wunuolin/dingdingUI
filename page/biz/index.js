import lifecycle from '/util/lifecycle';

Page({
  ...lifecycle,
  data: {
    pageName: 'biz/index',
    pageInfo: {
      pageId: 0,
    },
    curIndex: 0,
    arr: {
      onItemTap: 'onGridItemTap',
      list: [
        {
          icon: '/image/biz_collapse.png',
          title: '折叠面板',
          entitle: 'Collapse',
          page: '/page/biz/pages/collapse/index',
        }, {
          icon: '/image/biz_dropdown.png',
          title: '下拉菜单',
          entitle: 'Dropdown',
          page: '/page/biz/pages/dropdown/index',
        }, {
          icon: '/image/biz_errorview.png',
          title: '通用错误页',
          entitle: 'ErrorView',
          page: '/page/biz/pages/error-view/index',
        }, {
          icon: '/image/biz_grid.png',
          title: '宫格',
          entitle: 'Grid',
          page: '/page/biz/pages/grid/index',
        }, {
          icon: '/image/biz_list.png',
          title: '列表/template',
          entitle: 'List',
          page: '/page/biz/pages/list/index',
        },
        {
          icon: '/image/logo.png',
          title: '列表/component',
          entitle: 'List-component',
          page: '/page/biz/pages/list-component/index',
        },
        {
          icon: '/image/biz_tag.png',
          title: '标签',
          entitle: 'Tag',
          page: '/page/biz/pages/tag/index',
        },
        {
          icon: '/image/logo.png',
          title: '计数器',
          entitle: 'Counter',
          page: '/page/biz/pages/counter/index',
        },
        {
          icon: '/image/logo.png',
          title: '搜索框',
          entitle: 'Search-bar',
          page: '/page/biz/pages/search-bar/index',
        },
        {
          icon: '/image/logo.png',
          title: '可滑动单元格',
          entitle: 'Swipeaction',
          page: '/page/biz/pages/swipeaction/index',
        },
        {
          icon: '/image/logo.png',
          title: '日期选择',
          entitle: 'Date-select',
          page: '/page/biz/pages/date-select/index',
        },
        {
          icon: '/image/logo.png',
          title: '通告栏',
          entitle: 'Notice',
          page: '/page/biz/pages/notice/index',
        },
        {
          icon: '/image/logo.png',
          title: '弹出菜单',
          entitle: 'Popup',
          page: '/page/biz/pages/popup/index',
        },
        {
          icon: '/image/logo.png',
          title: '弹出菜单Picker',
          entitle: 'Picker',
          page: '/page/biz/pages/picker/index',
        },
        {
          icon: '/image/logo.png',
          title: '页脚',
          entitle: 'Footer',
          page: '/page/biz/pages/footer/index',
        },
        {
          icon: '/image/logo.png',
          title: '下拉刷新',
          entitle: 'Refresh',
          page: '/page/biz/pages/refresh/index',
        }
      ],
    },
  },
  onGridItemTap(e) {
    const page = this.data.arr.list[e.currentTarget.dataset.index].page;
    dd.navigateTo({ url: page });
  },
});
