Component({
  props: {
    className: '',
    mode: '', // closable,link
    action: '', // 文本按钮
    show: true, // 是否显示
    enableMarquee: false, // 是否开启marquee，字体滚动
    onClick: function onClick() {},
    marqueeProps: {
      loop: false, 
      leading: 1000,
      trailing: 1000,
      fps: 50
    }
  },
  data: {
    animatedWidth: 0,
    overflowWidth: 0
  },
  didMount: function didMount() {
    if (this.props.enableMarquee) {
      this._measureText();
      this._startAnimation();
    }
  },
  didUpdate: function didUpdate() {
    this._measureText();
    if (this.props.enableMarquee && !this._marqueeTimer) {
      this._measureText();
      this._startAnimation();
    }
  },
  didUnmount: function didUnmount() {
    if (this._marqueeTimer) {
      clearTimeout(this._marqueeTimer);
      this._marqueeTimer = null;
    }
  },

  methods: {
    _measureText: function _measureText() {
      var _this = this;

      // 计算文本所占据的宽度，计算需要滚动的宽度
      dd.createSelectorQuery().select('.am-notice-marquee-' + this.$id).boundingClientRect().select('.am-notice-content-' + this.$id).boundingClientRect().exec(function (ret) {
        var overflowWidth = ret && ret[0] && ret[1] && ret[0].width - ret[1].width || 0;
        _this.setData({
          overflowWidth: overflowWidth
        });
      });
    },
    _startAnimation: function _startAnimation() {
      var _this2 = this;

      if (this._marqueeTimer) {
        clearTimeout(this._marqueeTimer);
      }

      var _props$marqueeProps = this.props.marqueeProps,
          loop = _props$marqueeProps.loop,
          fps = _props$marqueeProps.fps,
          trailing = _props$marqueeProps.trailing,
          leading = _props$marqueeProps.leading;

      var TIMEOUT = 1 / fps * 1000;
      var isLeading = this.data.animatedWidth === 0;
      var timeout = isLeading ? leading : TIMEOUT;

      var animate = function animate() {
        var overflowWidth = _this2.data.overflowWidth;

        var animatedWidth = _this2.data.animatedWidth + 1;
        var isRoundOver = animatedWidth > overflowWidth;

        if (isRoundOver) {
          if (loop) {
            animatedWidth = 0;
          } else {
            return;
          }
        }

        if (isRoundOver && trailing) {
          _this2._marqueeTimer = setTimeout(function () {
            _this2.setData({
              animatedWidth: animatedWidth
            });

            _this2._marqueeTimer = setTimeout(animate, TIMEOUT);
          }, trailing);
        } else {
          _this2.setData({
            animatedWidth: animatedWidth
          });

          _this2._marqueeTimer = setTimeout(animate, TIMEOUT);
        }
      };

      if (this.data.overflowWidth !== 0) {
        this._marqueeTimer = setTimeout(animate, timeout);
      }
    },
    onNoticeTap: function onNoticeTap() {
      var _props = this.props,
          mode = _props.mode,
          onClick = _props.onClick;

      if (mode === 'link' && typeof onClick === 'function') {
        onClick();
      }
    },
    onOperationTap: function onOperationTap() {
      var _props2 = this.props,
          mode = _props2.mode,
          onClick = _props2.onClick;

      if (mode === 'closable' && typeof onClick === 'function') {
        onClick();
      }
    }
  }
});