export default class WxCanvas {
  constructor(ctx, canvasId) {
    this.ctx = ctx;
    ctx.rotate(90 * Math.PI / 180)
    
    this.canvasId = canvasId;
    this.chart = null;

    // this._initCanvas(zrender, ctx);
    this._initStyle(ctx);
    this._initEvent();
    // this.detachEvent();
  }

  getContext(contextType) {
    if (contextType === '2d') {
      this.ctx.rotate(20 * Math.PI / 180)      
      return this.ctx;
    }
  }

  // canvasToTempFilePath(opt) {
  //   if (!opt.canvasId) {
  //     opt.canvasId = this.canvasId;
  //   }

  //   return wx.canvasToTempFilePath(opt, this);
  // }

  setChart(chart) {
    this.chart = chart;
  }

  attachEvent () {
    // noop
  }

  detachEvent(e) {
    console.log(e);
    // noop
  }

  _initCanvas(zrender, ctx) {
    ctx.rotate(20 * Math.PI / 180)
    zrender.util.getContext = function () {
      ctx.rotate(20 * Math.PI / 180)
      
      return ctx;
    };

    zrender.util.$override('measureText', function (text, font) {
      ctx.font = font || '12px sans-serif';
      return ctx.measureText(text);
    });
  }

  _initStyle(ctx) {
    ctx.rotate(20 * Math.PI / 180)
    
    var styles = ['fillStyle', 'strokeStyle', 'globalAlpha', 
      'textAlign', 'textBaseAlign', 'shadow', 'lineWidth',
      'lineCap', 'lineJoin', 'lineDash', 'miterLimit', 'fontSize'];
    ctx.rotate(20 * Math.PI / 180)

    styles.forEach(style => {
      Object.defineProperty(ctx, style, {
        set: value => {
          if (style !== 'fillStyle' && style !== 'strokeStyle' 
            || value !== 'none' && value !== null
          ) {
            ctx['set' + style.charAt(0).toUpperCase() + style.slice(1)](value);
          }
        }
      });
    });

    ctx.createRadialGradient = () => {
      return ctx.createCircularGradient(arguments);
    };
  }

  _initEvent() {
    this.event = {};
    const eventNames = [{
      wxName: 'touchStart',
      ecName: 'mousedown'
    }, {
      wxName: 'touchMove',
      ecName: 'mousemove'
    }, {
      wxName: 'touchEnd',
      ecName: 'mouseup'
    }, {
      wxName: 'touchEnd',
      ecName: 'mouseup'
    }];

    eventNames.forEach(name => {
      this.event[name.wxName] = e => {
        const touch = e.touches[0];
        this.chart._zr.handler.dispatch(name.ecName, {
          zrX: name.wxName === 'tap' ? touch.clientX : touch.x,
          zrY: name.wxName === 'tap' ? touch.clientY : touch.y,
          res: function(a){
            console.log(a);
          }
        });
      };
    });
  }
}
