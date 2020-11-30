$(function(){
    newgame();
});

function newgame(){
    init();
    randomNum();
    randomNum();
}


//初始化
var board = new Array();
var score = 0;
function init(){
    for(var i=0;i<4;i++){
        board[i] = new Array();
        for(var j=0;j<4;j++){
            board[i][j]=0;
            var gridCell = $('#grid-cell-'+i+'-'+j);
            gridCell.css({top:getPos(i), left:getPos(j)});
        }
    }
    updateBoardView();
    score=0;
}

//数字格
function updateBoardView(){
    $(".number-cell").remove();
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            $('#grid-container').append('<div class="number-cell" id="number-cell-'+ i +'-'+ j +'"></div>')
            var everyNumber = $('#number-cell-'+i+'-'+j);
            if(board[i][j]==0){
                everyNumber.css({
                    width:'0px',
                    height:'0px',
                    top:getPos(i)+50,
                    left:getPos(j)+50,
                });
            }
            else{
                everyNumber.css({
                    width:'100px',
                    height:'100px',
                    top:getPos(i),
                    left:getPos(j),
                    backgroundColor:getBackgroundColor(board[i][j]),
                    color:getColor(board[i][j])
                });
                everyNumber.text(board[i][j]);
            }
        }
    }
}


//在随机位置产生随机数
function randomNum(){
    if(noSpace(board)){
        return false;
    }
    else{
        var randomX = Math.floor(Math.random() * 4);
        var randomY = Math.floor(Math.random() * 4);
        var randomValue = Math.random() > 0.5? 2: 4;
        while(true){
            if(board[randomX][randomY]==0){
                break;
            }
            else{
                var randomX = Math.floor(Math.random() * 4);
                var randomY = Math.floor(Math.random() * 4);
            }
        }
        board[randomX][randomY]=randomValue;
        randomNumAnimate(randomX, randomY, randomValue);
        return true;
    }
}
function randomNumAnimate(randomX, randomY, randomValue){
    var randomnum = $('#number-cell-'+ randomX +'-'+ randomY);
    randomnum.css({
     backgroundColor:getBackgroundColor(randomValue),
     color:getColor(randomValue),
    })
       .text(randomValue)
       .animate({
        width:'100px',
        height:'100px',
        top:getPos(randomX),
        left:getPos(randomY),
       },50);
}

// 获取键盘事件，检测不同的按键进行不同的操作
$(document).keydown(function(event){
    switch(event.keyCode){
        case 37://左
            if(canMoveLeft(board)){
                // 如果可以向左移动
                MoveLeft();
                // 向左移动
                setTimeout(function(){
                randomNum();
                },200);
                // 随机产生一个数字
            }
            isOver();
            break;
        case 38://上
            if(canMoveUp(board)){
                // 如果可以向上移动
                MoveUp();
                // 向上移动
                setTimeout(function(){
                    randomNum();
                },200);
                // 随机产生一个数字
            }
            isOver();
            break;
        case 39://右
            if(canMoveRight(board)){
                // 如果可以向右移动
                    MoveRight();
                    // 向右移动
                    setTimeout(function(){
                    randomNum();
                    },200);
                    // 随机产生一个数字
            }
            isOver();
            break;
        case 40://下
            if(canMoveDown(board)){
                // 如果可以向下移动
                MoveDown();
                // 向下移动
                setTimeout(function(){
                randomNum();
                },200);
                // 随机产生一个数字
            }
            isOver();
            break;
        default:
            break;
    }
});
    

function MoveLeft(){
    if(!canMoveLeft(board))
        return false;
    for(var i=0;i<4;i++){
        for(var j=1;j<4;j++){
            if(board[i][j]!=0){
                for(var k=0;k<j;k++){
                    if(board[i][k]==0&&noBlockH(i,k,j,board)){
                        //move
                        showMoveAnimation(i, j, i, k);
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }
                    else if(board[i][k]==board[i][j]&&noBlockH(i,k,j,board)){
                        showMoveAnimation(i, j, i, k);
                        //叠加
                        board[i][k]+=board[i][j];
                        board[i][j]=0;      
                        score+=board[i][k];
                        updateScore(score);
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}

function MoveRight(){
    if(!canMoveRight(board))
        return false;
    for(var i=0;i<4;i++){
        for(var j=2;j>=0;j--){//除最右列以外，遍历所有
            for(var k=3;k>j;k--){
                if(board[i][k]==0&&noBlockH(i, j, k, board)){
                        showMoveAnimation(i ,j ,i ,k);
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                        continue;
                }
                else if(board[i][k]==board[i][j]&&noBlockH(i, j, k, board)){
                    showMoveAnimation(i ,j ,i ,k);
                    board[i][k]+=board[i][j];
                    board[i][j]=0;
                            
                    score+=board[i][k];
                    updateScore(score);
                    continue;
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}

function MoveUp(){
    if(!canMoveUp(board))
        return false;
    //能移动，怎么移
    for(var j=0;j<4;j++){
        for(var i=1;i<4;i++){
            for(var k=0;k<i;k++){
                if(board[k][j]==0&&noBlockV(j,k,i,board)){
                        showMoveAnimation( i , j , k , j );
                        board[k][j]=board[i][j];
                        board[i][j]=0;
                        continue;
                }
                else if(board[k][j]==board[i][j]&&noBlockV(j,k,i,board)){
                        showMoveAnimation( i , j , k , j );
                        board[k][j]+=board[i][j];
                        board[i][j]=0
                        
                        score+=board[i][k];
                        updateScore(score);
                        continue;
                                
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}

function MoveDown(){
    //先判断是否能移动
    if(!canMoveDown(board))return false;

    for(var j=0;j<4;j++){
        for(var i=2;i>=0;i--){
            for(var k=3;k>i;k--){
                if( board[k][j] == 0 && noBlockV(j ,i ,k ,board)){
                        showMoveAnimation(i ,j ,k ,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                }
                else if( board[k][j] == board[i][j] && noBlockV(j ,i ,k ,board)){
                        showMoveAnimation( i , j , k , j );
                        board[k][j]+= board[i][j];
                        board[i][j] = 0;
                        
                        score+=board[i][k];
                        updateScore(score);
                        continue;
                }
                
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}
   
// 判断中间的数字格是否为0(行)
function noMiddleNumRow(row,col1,col2,checkerboard){
    for(var i=col1+1;i<col2;i++){
        if(checkerboard[row][i] != 0){
            return false;
        }
    }
    return true;
}

function isOver(){
    if(noSpace(board)&&noMove(board)){
        gameOver();
    }
}
    
function gameOver(){
    alert("Game Over!");
    newgame();
}