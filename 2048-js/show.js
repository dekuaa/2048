function showMoveAnimation(fromx,fromy,tox,toy){
    var numberCell = $('#number-cell-' + fromx + '-' + fromy );
    numberCell.animate({
   top:getPos(tox),
   left:getPos(toy)
    },200);
}

function updateScore(score){
    $("#score").html(score+'');
    
    }