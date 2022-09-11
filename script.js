
score = 0;
cross = true;

audio = new Audio('src/music.mp3');
audiogo = new Audio('src/gameover.mp3');

audio.play();

document.onkeydown = function(e){
    
    if(e.keyCode==38){
        
        dino = document.querySelector('.dino');
        dino.classList.add('animationDino');
        
        setTimeout(() => {
            dino.classList.remove('animationDino');
        }, 700);
    }
    else if(e.keyCode == 37){

        dino = document.querySelector('.dino');
        dx = parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));

        width = parseInt(document.documentElement.clientWidth);
        height = parseInt(document.documentElement.clientHeight);
            
        want = Math.min(width,height);
        dx = dx*100/want;

        dino.style.left = dx - 25 + "vmin";
    }
    else if(e.keyCode==39){
        dino = document.querySelector('.dino');
        dx = parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));

        width = parseInt(document.documentElement.clientWidth);
        height = parseInt(document.documentElement.clientHeight);

        want = Math.min(width,height);
        dx = dx*100/want;
            
        dino.style.left = dx + 25 + "vmin";
    }
}

setInterval(() => {

    if(score == 1){
        audio.play();
    }
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');
    
    dx = parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino,null).getPropertyValue('top'));
    ox = parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('top'));
        
    width = parseInt(document.documentElement.clientWidth);
    height = parseInt(document.documentElement.clientHeight);
        
    want = Math.min(width,height);
    
    dx = dx*100/want;
    dy = dy*100/want;
    ox = ox*100/want;
    oy = oy*100/want;
    
    
    offsetX = Math.abs(dx-ox);
    offsetY = Math.abs(oy-dy);

    if(offsetX<10 && offsetY<10){
        obstacle.classList.remove('animationObs');
        score = 0;
        gameOver.innerHTML = "Game Over - Reload to Play again";
        audiogo.play();
        setTimeout(() => {
            audio.pause();
            audiogo.pause();
        }, 1000);
    }
    else if(cross && ox<dx){
        score = score + 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            anidur = parseFloat(window.getComputedStyle(obstacle,null).getPropertyValue('animation-duration'));
            newdur = anidur*0.99;
            obstacle.style.animationDuration = newdur + "s";
        }, 2000);
    }

}, 20);

function updateScore(score){
    scoreCount = document.querySelector('.scoreCount');
    scoreCount.innerHTML = "Your Score : " + score;
}