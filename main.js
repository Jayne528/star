
$(document).ready(function () {

    var canvas = $("#canvas");
    var context = canvas.get(0).getContext("2d");
    canvas.attr("width",$(window).get(0).innerWidth);
    canvas.attr("height",$(window).get(0).innerHeight);
    var canvasWidth = canvas.width();
    var canvasHeight = canvas.height();

    //設定按鈕------------------------------------------------

    var playAnimation = true;

    var startButton = $("#startAnimation");
    var stopButton = $("#stopAnimation");
    
    startButton.hide();
    startButton.click(function() {
        $(this).hide();
        stopButton.show();

        playAnimation = true;
        animate();
    });

    stopButton.click(function() {
        $(this).hide();
        startButton.show();

        playAnimation = false;
    });
    


    var canvasX= canvasWidth/2 - 150;      //canvas X 起始位置
    var canvasY = canvasHeight/2 -150;   //canvas Y 起始位置
    var angleX = Math.PI/180;
    var angleY = Math.PI/180;
 


    function rotateX(){
        var cos = Math.cos(angleX);
        var sin = Math.sin(angleX);

        for(var i=0;i<balls.length;i++){

            var y1 = balls[i].ypos;
            var z1 = balls[i].zpos;

            balls[i].ypos = y1 * cos - z1 * sin;
            balls[i].zpos = z1 * cos + y1 * sin;

        }
    }

    function rotateY(){
        var cos = Math.cos(angleY);
        var sin = Math.sin(angleY);

        for(var i=0;i<balls.length;i++){

            var x1 = balls[i].xpos;
            var z1 = balls[i].zpos;

            balls[i].xpos = x1 * cos - z1 * sin;
            balls[i].zpos = z1 * cos + x1 * sin;

        }
    }

    function rotateZ(){
        var cos = Math.cos(angleY);
        var sin = Math.sin(angleY);

        for(var i=0;i<balls.length;i++){

            var x1 = balls[i].xpos;
            var y1 = balls[i].ypos;

            balls[i].xpos = x1 * cos - y1 * sin;
            balls[i].ypos = y1 * cos + x1 * sin;

        }
    }
    var stars=[
        [117.47, 0],[154.43, 73.63],[236.07, 84.93],
        [177.43, 142.83],[191.9, 223.92],
        [118.7, 186.07],[46.01, 224.89],
        [59.4, 143.61],[0, 86.5],
        [81.48, 74.11],
        [117.47, 0]
    ];

    var ballLine = function (x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    var ballLines = new Array();

    var starsLength = stars.length-1;     
    for (var i = 0; i <=starsLength; i++) {
        
        for (var j = -1; j <2; j++) {
            if (j == 0) {
                continue ;
            }
            var star = stars[i];
            var x = star[0];
            var y = star[1];
            var z = j;

            ballLines.push(new ballLine(x, y, z));
        }

    }

    // function draw() {
    //     var ballLinesLength = ballLines.length-2;   
    //     for(var i = 0; i <=ballLinesLength; i++) {
    //         var ballLine1 = ballLines[i];
    //         var ballLine2 = ballLines[i+1];
    //         var x1 = canvasX + ballLine1.x;
    //         var y1 = canvasY + ballLine1.y;
    //         var x2 = canvasX + ballLine2.x;
    //         var y2 = canvasY + ballLine2.y;
    //         context.beginPath();
    //         context.moveTo(x1, y1);
    //         context.lineTo(x2, y2);
    //         context.strokeStyle = "#FFF";
    //         context.stroke();
    //     }
    // }
    // // draw();

    var ball = function(x , y , z , r , middlePointX, middlePointY){
        this.x = x;
        this.y = y;
        this.z = z;
        this.r = r;
        
        this.xpos = x - middlePointX;
        this.ypos = y - middlePointY;
        this.zpos = this.z;
    }

    var balls = new Array();

    var num = ballLines.length-1;

    var middlePointX = 0;
	var middlePointY = 0;  

	// 所有點的總和 求出中點(圓心)
	for(var i=0; i < starsLength; i++){
		middlePointX+=stars[i][0];	
        middlePointY+=stars[i][1];	
    
	}
	middlePointX = middlePointX/starsLength;
    middlePointY = middlePointY/starsLength;
    for(var i=0; i<num; i++){

        var distanceX1 = Math.abs(canvasX + ballLines[i+1].x - canvasX + ballLines[i].x)/2;
        var distanceY1 = Math.abs(canvasY + ballLines[i+1].y - canvasY + ballLines[i].y)/2;

        var distanceX2 =  ballLines[i].x;
        var distanceY2 =  ballLines[i].y;

        var x = Math.abs(canvasX + distanceX2 - canvasX + distanceX1)/2;
        var y = Math.abs(canvasY + distanceY2 - canvasY + distanceY1)/2;

        var z = ballLines[i].z * Math.sqrt(Math.pow(i, 2));    
        
        var r = 3;
        balls.push(new ball(x, y, z, r, middlePointX, middlePointY));
     
    }
    
    function draw1() {
        var starsLength = stars.length-2;   
        for(var i = 0; i <=starsLength; i++) {
            var fl = 450 //焦距
            context.beginPath();
            var scale = fl / (fl - balls[i].z);
            context.arc(canvasX + balls[i].x, canvasY + balls[i].y, balls[i].r*scale , 0 , 2*Math.PI , true);
            context.fillStyle = "rgba("+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+","+"0."+Math.floor(Math.random()*9)+")";
            context.fill();
        };
    }
    draw1();

 

    function animate(){

        context.clearRect(0,0,canvasWidth , canvasHeight);
        rotateX();
        rotateY();
        rotateZ();

        for(var i=0;i<balls.length;i++){
            var fl = 450 //焦距
            context.beginPath();
            var scale = fl / (fl - balls[i].z);
            context.arc(canvasX + balls[i].xpos, canvasY + balls[i].ypos, balls[i].r*scale , 0 , 2*Math.PI , true);
            context.fillStyle = "rgba("+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+","+"0."+Math.floor(Math.random()*9)+")";
            context.fill();
        };

        if (playAnimation) {
            window.requestAnimationFrame(animate);
        }

    }

    animate();

});

