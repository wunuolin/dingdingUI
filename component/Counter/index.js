Component({
  data: {
    opaReduce: 1,
    opaAdd: 1
  },
  props: {
    className: '',
    min: 1,
    max: 100,
    disabled: false,
    value: 10,   //若没有值传进来，就使用该默认值
    readOnly: false,
    showNumber: false,
    step: 1,
    onChange: function onChange() { }
  },
  didMount: function didMount() {    //通过this.props.xx 获取到传过来的值
    var _props = this.props,
      value = _props.value,
      min = _props.min,
      max = _props.max;
    this.setData({
      value: Math.min(Math.max(min, value), max)
    });
  },
  didUpdate: function didUpdate(preProps) {
    var _props2 = this.props,
      value = _props2.value,
      min = _props2.min,
      max = _props2.max;
    if (preProps.value !== value) {
      var newValue = Math.min(Math.max(min, value), max);
      this.setData({
        value: newValue
      });
      this.resetFn(newValue);
    }
  },
  methods: {
    changeFn: function changeFn(ev) {
      var _props3 = this.props,
        min = _props3.min,
        max = _props3.max,
        onChange = _props3.onChange,
        disabled = _props3.disabled,
        readOnly = _props3.readOnly,
        step = _props3.step;

      var evType = ev.target.dataset.type;
      var _data = this.data,
        opaReduce = _data.opaReduce,
        opaAdd = _data.opaAdd,
        value = _data.value;

      var enable = disabled || readOnly;
      if (!enable) {
        if (evType === 'reduce') {
          if (value > min) {
            opaAdd = 1;
            value = Math.max(min, +value - +step);
            opaReduce = value === min ? 0.4 : 1;
          }
        } else {
          /* eslint-disable no-lonely-if */
          if (value < max) {
            opaReduce = 1;
            value = Math.min(+value + +step, max);
            opaAdd = value === max ? 0.4 : 1;
          }
        }
        this.setData({
          value: value,
          opaAdd: opaAdd,
          opaReduce: opaReduce
        });
        // 值通过 this.props.onChange(xxx)传出去
        onChange(value);
      }
    },
    onBlur: function onBlur(event) {
      var value = event.detail.value;

      this.resetFn(value);
    },
    resetFn: function resetFn(value) {
      var _props4 = this.props,
        max = _props4.max,
        min = _props4.min,
        onChange = _props4.onChange;

      var calculatedVal = value;
      var opaAdd = 1;
      var opaReduce = 1;
      if (value >= max) {
        calculatedVal = max;
        opaAdd = 0.4;
      } else if (value <= min) {
        calculatedVal = min;
        opaReduce = 0.4;
      }
      this.setData({
        value: calculatedVal,
        opaAdd: opaAdd,
        opaReduce: opaReduce
      });
      onChange(calculatedVal);
    }
  }
});