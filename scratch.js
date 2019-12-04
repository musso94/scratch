/*jslint browser: true*/
(function () {
"use strict";
    var container = document.getElementById('cbox-canvas'),
        arrow = document.getElementById('cbox-arrow'),
        textOne = document.getElementById('cbox-text-1'),
        textTwo = document.getElementById('cbox-text-2'),
        boxOne = document.getElementById('cbox-box-1'),
        boxTwo = document.getElementById('cbox-box-2'),
        cnv = container.getElementsByTagName('canvas'),
        imageCover;


    function createCanvas(parent, width, height) {
        var canvas = {};
        canvas.node = document.createElement('canvas');
        canvas.context = canvas.node.getContext('2d');
        canvas.node.width = width || 100;
        canvas.node.height = height || 100;
        parent.appendChild(canvas.node);
        return canvas;
    }

    function init(container, width, height, imageSrc) {
        var canvas = createCanvas(container, width, height),
            ctx = canvas.context;
 
        // define a custom fillCircle method
        ctx.fillCircle = function (x, y, radius, fillColor) {
            this.fillStyle = fillColor;
            this.shadowBlur = 15;
            this.shadowOffsetX = 0;
            this.shadowOffsetY = 0;
            this.shadowColor = fillColor;
            this.beginPath();
            this.moveTo(x, y);

            this.arc(x, y, radius, 0, Math.PI * 2, true);
            this.fill();
            this.stroke();
        };

        ctx.clearTo = function (image) {
            var imageObj = new Image();
            imageObj.onload = function(){  
                ctx.drawImage(imageObj, 0, 0, ctx.canvas.width, ctx.canvas.height);
            }
            imageObj.src = image
        }(imageSrc);

        // bind mouse events
        canvas.node.onmousemove = function (e) {
            var canvasRect = container.getBoundingClientRect(),
                x = e.clientX - canvasRect.left, // значения тносительно границ окна просмотра браузера
                y = e.clientY - canvasRect.top, 
                // x =  Math.floor((e.clientX-canvasRect.left)/(canvasRect.right-canvasRect.left)* ctx.canvas.width),
                // y = Math.floor((e.clientY-canvasRect.top)/(canvasRect.bottom-canvasRect.top)*ctx.canvas.height),
                radius = 30,
                fillColor = '#ff0000';

            ctx.globalCompositeOperation = 'destination-out';
            ctx.fillCircle(x, y, radius, fillColor);

            if (getAreaOfCover(ctx) < 0.6) { // ошибка была в условии
                container.removeChild(cnv[0]);
                arrow.className += " slide-it";
                textOne.className += " reveal-it";
                textTwo.className += " fade-in";
                boxOne.className += " fade-in-two";
                boxTwo.className += " fade-in-one";
            }

        };

        function getAreaOfCover(ctx) {
            var imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height),
                uintArray = new Uint32Array(imageData.data.buffer),
                count = ctx.canvas.width * ctx.canvas.height;
            
            for(var i = 0; i < uintArray.length; i++) if (!(uintArray[i] & 0xff000000)) count--;

            return count / (ctx.canvas.width * ctx.canvas.height);
        }

        container.onmousemove = function (e) {
            var canvasRect = container.getBoundingClientRect(),
                mouseX = e.pageX || e.clientX,
                mouseY = e.pageY || e.clientY,
                relMouseX = mouseX - canvasRect.left,
                relMouseY = mouseY - canvasRect.top,
                leftLimit = 37,
                topLimit = 37,
                rightLimit = 25,
                bottomLimit = 44,
                x = e.pageX - canvasRect.left,
                y = e.pageY - canvasRect.top,
                radius = 25,
                fillColor = '#ff0000';

            if (relMouseX < leftLimit) {
                relMouseX = leftLimit;
            }
            if (relMouseY < topLimit) {
                relMouseY = topLimit;
            }
            if (relMouseX > width - rightLimit) {
                relMouseX = width - rightLimit;
            }
            if (relMouseY > height - bottomLimit) {
                relMouseY = height - bottomLimit;
            }

            if (!canvas.isDrawing) {
                return;
            }

            ctx.globalCompositeOperation = 'destination-out';
            ctx.fillCircle(x, y, radius, fillColor);
        };
    }

	var imageSrc = "images/scratch.png";
    init(container, 369, 371, imageSrc);
}());
