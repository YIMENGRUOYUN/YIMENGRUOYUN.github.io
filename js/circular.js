var canvasCircle = (function (w, d) {
        function Circle(option) {
            this.default = {
                "canvasWrap": null,
                "diameter": 150,
                "lineWidth": 10,
                "baseColor": "#eaeaea",
                "maskColor": ["#ff0", "#f00"], 
                "percentage": 50,
                "textColor": "#000",
                "fontSize": "1em",
                "callback": function () {
                    console.log("执行回调");
                }
            };
            this.op = this.extend(this.default, option);
            this.init();
        }

        Circle.prototype = {
            
            init: function () {
                if (!this.op.canvasWrap) {
                    
                    throw new Error("CanvasWrap is not defined !");
                }
                this.createEle();
            },
            
            createEle: function () {
                var _this = this;
                var eleWrap = d.querySelector(_this.op.canvasWrap);
                _this.canvasOut = canvas1 = d.createElement("canvas");
                _this.canvasInt = canvas2 = d.createElement("canvas");
                _this.canvasOut.className = "canvasWrap";
                _this.canvasInt.className = "canvasBox";
                eleWrap.appendChild(_this.canvasOut);
                eleWrap.appendChild(_this.canvasInt);
                this.addStyle(eleWrap, canvas1, canvas2, this.op.diameter, this.op.diameter);
            },
            
            addStyle: function (wrap, eleInt, eleOut, w, h) {
                var ctx1 = eleInt.getContext("2d");
                var ctx2 = eleOut.getContext("2d");
                var _this = this;
                wrap.style.cssText = "position:relative;width:" + w + "px;height:" + h + "px";
                eleInt.width = eleOut.width = w;
                eleInt.height = eleOut.height = w;
                eleInt.style.cssText = eleOut.style.cssText = "position:absolute;left:0;top:0;transform:rotate(-90deg)";
                _this.drawCanvas(ctx1, ctx2);
            },
            
            drawCanvas: function (ctx1, ctx2) {
                var _this = this;
                var o = _this.op;
                ctx1.lineWidth = o.lineWidth;
                ctx1.strokeStyle = o.baseColor;
                ctx1.beginPath();
                ctx1.arc(o.diameter / 2, o.diameter / 2, o.diameter / 2 - o.lineWidth / 2, 0, 2 * Math.PI, false);
                ctx1.stroke();
                ctx1.closePath();
                ctx2.lineWidth = o.lineWidth;
                ctx2.strokeStyle = o.baseColor;
                ctx2.lineWidth = o.lineWidth;
                ctx2.strokeStyle = o.maskColor;
                _this.animateCanvas(ctx2, o.percentage);
            },
            
            animateCanvas: function (ctx2, percent) {
                var timer = null;
                var angle = 0;
                var percentage = null;
                var _this = this;
                var o = _this.op;
                var diameter = _this.op.diameter;
                (function changeCanvas() {
                    timer = requestAnimationFrame(changeCanvas);
                    ctx2.beginPath();
                    ctx2.arc(o.diameter / 2, diameter / 2, diameter / 2 - o.lineWidth / 2, 0, angle * Math.PI / 180, false);
                    ctx2.clearRect(0, 0, diameter, diameter);
                    percentage = parseInt(angle / 360 * 100);
                    if (percentage < percent) {
                        angle++;
                    } else {
                        window.cancelAnimationFrame(timer);
                        if (o.callback && typeof o.callback == "function") {
                            o.callback();
                        }
                    }
                    ctx2.stroke();
                    ctx2.closePath();
                    ctx2.rotate(90 * Math.PI / 180);
                    ctx2.font = o.fontSize + " Arial";
                    if (Object.prototype.toString.call(o.maskColor) === "[object Array]") {
                        var gradient = ctx2.createLinearGradient(0, 0, diameter * 2, 10);
                        for (var i = 0; i < o.maskColor.length; i++) {
                            gradient.addColorStop(i, o.maskColor[i]);
                        }
                        ctx2.strokeStyle = gradient;
                    } else if (Object.prototype.toString.call(o.maskColor) === "[object String]") {
                        ctx2.strokeStyle = o.maskColor;
                    }
                    ctx2.fillStyle = o.textColor;
                    ctx2.fillText(percentage + " %", diameter / 2 + o.lineWidth / 2, -diameter / 3 + o.lineWidth / 2);
                    ctx2.textBaseline = 'middle';
                    ctx2.textAlign = 'center';
                    ctx2.closePath();
                    ctx2.restore();
                })();
            },
            
            extend: function (defaults, option) {
                for (i in option) {
                    defaults[i] = option[i];
                }
                return defaults;
            }
        }
        return Circle;
    })(window, document);
    new canvasCircle({
        "canvasWrap": "#html",  
        "percentage": 90,
    })
    new canvasCircle({
        "canvasWrap": "#css",
        "percentage": 90,
        "lineWidth": 10,
        "maskColor": ["red", "blue"]
    })
    new canvasCircle({
        "canvasWrap": "#js",
        "percentage": 70,
        "lineWidth": 10,
        "maskColor": ["orange", "green"]
    })
    new canvasCircle({
        "canvasWrap": "#jquery",
        "percentage": 70,
        "lineWidth": 10,
        "maskColor": ["green", "yellow"]
    })
    new canvasCircle({
        "canvasWrap": "#bootstrap",
        "percentage": 70,
        "lineWidth": 10,
        "maskColor": ["purple", "blue"]
    })
    new canvasCircle({
        "canvasWrap": "#ps",
        "percentage": 90,
        "lineWidth": 10,
        "maskColor": ["violet", "red"]
    })