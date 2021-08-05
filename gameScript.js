var shape = new Object();
var ghost1 = new Object();
var ghost2 = new Object();
var ghost3 = new Object();
var timerImage = new Object();
var bonus_creature = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var direction = 1;
var bonus_eaten = false;
var lives = 3;
var bonusTime = 0;
var food_total;
var moved1 = false;
var moved2 = false;
var moved3 = false;
var i_length = 15;
var j_length = 7;


function startGame() {
    lives = 3;
    $("#live1").show();
    $("#live2").show();
    $("#live3").show();
    bonus_eaten = false;
    bonusTime = 0;

    var settingsValidated = validateSettings();

    if (settingsValidated) {
        $("#welcomeDiv").hide();
        $("#registerDiv").hide();
        $("#loginDiv").hide();
        $("#settingsDiv").hide();
        $("#aboutDiv").hide();
        $("#gameDiv").show();
        $("#header1").hide();
        $("#footer").hide();
        $("#gameFinishedDiv").hide();
        $("#player_name").text("Name: " + currentUser.username);
        Start();
    }
}


function Start() {
    playMusic();
    board = new Array();
    score = 0;
    pac_color = "yellow";
    var cnt = 100;
    food_total = $("#pacdot_num_settings").val();
    var food_25 = Math.floor(food_total * 0.1);
    var food_15 = Math.floor(food_total * 0.3);
    var food_5 = food_total - food_25 - food_15;
    start_time = new Date();
    for (var i = 0; i < i_length; i++) {
        board[i] = new Array();
        //put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
        for (var j = 0; j < j_length; j++) {
            if ((i === 3 && j === 2) || (i === 4 && j === 2) || (i === 3 && j === 5) || (i === 4 && j === 5) || /*(i === 7 && j === 3) || (i === 7 && j === 4) ||*/ (i === 10 && j === 2) || (i === 11 && j === 2) || (i === 10 && j === 5) || (i === 11 && j === 5)) {
                board[i][j] = 4;
            } else {
                    board[i][j] = 0;
                cnt--;
            }
        }
    }
    var pacmanStart = findRandomEmptyCell(board);
    shape.i = pacmanStart[0];
    shape.j = pacmanStart[1];
    //pacman_remain--;

    placeGhosts();
    board[pacmanStart[0]][pacmanStart[1]] = 2;

    var timePlace = findRandomEmptyCell(board);
    timerImage.i = timePlace[0];
    timerImage.j = timePlace[1];
    board[timerImage.i][timerImage.j] = 6;

    board[0][j_length - 1] = 3;
    bonus_creature.i = 0;
    bonus_creature.j = j_length - 1;

    while (food_5 > 0) {
        var emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = 5;
        food_5--;
    }
    while (food_15 > 0) {
        var emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = 15;
        food_15--;
    }
    while (food_25 > 0) {
        var emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = 25;
        food_25--;
    }
   
    keysDown = {};
    addEventListener("keydown", function (e) {
        keysDown[e.key] = true;
    }, false);
    addEventListener("keyup", function (e) {
        keysDown[e.key] = false;
    }, false);

    interval = setInterval(UpdatePosition, /*250*/125);
    intervalGhost = setInterval(moveCreatures, 750);
}


function findRandomEmptyCell(board) {
    var i = Math.floor((Math.random() * i_length/*10*//*9*/) /*+ 1*/);
    var j = Math.floor((Math.random() * j_length) /*+ 1*/);
    while (board[i][j] !== 0) {
        i = Math.floor((Math.random() * /*10*/i_length) /*+ 1*/);
        j = Math.floor((Math.random() * /*10*/j_length) /*+ 1*/);
    }
    return [i, j];
}

/**
 * @return {number}
 */
function GetKeyPressed() {
    if (keysDown[$("#upButton").val()] || ($("#upButton").val()==='' && keysDown['ArrowUp'])) {
        direction = 1;
        return 1;
    }
    if (keysDown[$("#downButton").val()] || ($("#downButton").val() === '' && keysDown['ArrowDown'])) {
        direction = 2;
        return 2;
    }
    if (keysDown[$("#leftButton").val()] || ($("#leftButton").val() === '' && keysDown['ArrowLeft'])) {
        direction = 3;
        return 3;
    }
    if (keysDown[$("#rightButton").val()] || ($("#rightButton").val() === '' && keysDown['ArrowRight'])) {
        direction = 4;
        return 4;
    }
}

function Draw() {
    context.clearRect(0, 0, canvas.width, canvas.height); //clean board
    lblScore.value = score;
    lblTime.value = time_elapsed;
    for (var i = 0; i < /*10*/i_length; i++) {
        for (var j = 0; j < j_length; j++) {
            var center = new Object();
            center.x = i * 60 + 30;
            center.y = j * 60 + 30;
            if (board[i][j] === 2) {
                //pacman
                context.beginPath();
                if (direction == 1)
                    context.arc(center.x, center.y, 30, 1.6 * Math.PI, 1.35 * Math.PI); // half circle
                if (direction == 2)
                    context.arc(center.x, center.y, 30, 0.65 * Math.PI, 0.35 * Math.PI); // half circle
                if (direction == 3)
                    context.arc(center.x, center.y, 30, 1.15 * Math.PI, 0.85 * Math.PI); // half circle
                if (direction == 4)
                    context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
                context.lineTo(center.x, center.y);
                context.fillStyle = pac_color; //color
                context.fill();

                //eye
                context.beginPath();
                if (direction == 1)
                    context.arc(center.x + 15, center.y - 7, 5, 0, 2 * Math.PI); // circle
                if (direction == 2)
                    context.arc(center.x + 15, center.y + 5, 5, 0, 2 * Math.PI); // circle
                if (direction == 3)
                    context.arc(center.x - 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
                if (direction == 4)
                    context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
                context.fillStyle = "black"; //color
                context.fill();
            } else if (board[i][j] === 5) {
                drawFood($("#5color").val(), center);
            } else if (board[i][j] === 15) {
                drawFood($("#15color").val(), center);
            } else if (board[i][j] === 25) {
                drawFood($("#25color").val(), center);
            } else if (board[i][j] === 4) {
                context.beginPath();
                context.rect(center.x - 30, center.y - 30, 60, 60);
                context.fillStyle = /*"grey"*/"blue"; //color
                context.fill();
            } else if (board[i][j] == 1 || board[i][j] == 125 || board[i][j] == 1215 || board[i][j] == 1225) {
                drawGhost("aqua", center);
            } else if (board[i][j] == 11 || board[i][j] == 1125 || board[i][j] == 11215 || board[i][j] == 11225) {
                drawGhost("red", center);
            } else if (board[i][j] == 111 || board[i][j] == 11125 || board[i][j] == 111215 || board[i][j] == 111225) {
                drawGhost("orange", center);
            } else if (board[i][j] == 3 || board[i][j] == 325 || board[i][j] == 3215 || board[i][j] == 3225) {
                drawBonus(center);
            } else if (board[i][j] == 6) {
                drawTime(center);
            }
        }
    }

}

function drawTime(center) {
    var img = document.getElementById("sandTime");
    context.drawImage(img, center.x - 30, center.y - 30);
}

function drawBonus(center) {
    //draw body
    context.beginPath();
    context.arc(center.x, center.y - 7, 30, 0, 2*Math.PI);
    context.fillStyle = "green"; //color
    context.fill();

    //draw eyes
    context.beginPath();
    context.arc(center.x + 10, center.y - 7, 5, 0, 2 * Math.PI); // circle
    context.fillStyle = "white"; //color
    context.fill();
    context.beginPath();
    context.arc(center.x + 10, center.y - 7, 2, 0, 2 * Math.PI); // circle
    context.fillStyle = "black"; //color
    context.fill();

    context.beginPath();
    context.arc(center.x - 5, center.y - 7, 5, 0, 2 * Math.PI); // circle
    context.fillStyle = "white"; //color
    context.fill();
    context.beginPath();
    context.arc(center.x - 5, center.y - 7, 2, 0, 2 * Math.PI); // circle
    context.fillStyle = "black"; //color
    context.fill();

    //draw Mouth and theeth
    context.beginPath();
    context.rect(center.x - 7, center.y + 3, 20, 2);
    context.fillStyle = "black"; //color
    context.fill();

    context.beginPath();
    context.rect(center.x - 5, center.y + 5, 15, 7);
    context.fillStyle = "white"; //color
    context.fill();
    context.beginPath();

    context.rect(center.x + 1.5, center.y + 3, 2, 9);
    context.fillStyle = "black"; //color
    context.fill();

}

function drawGhost(color, center) {
    //draw body
    context.beginPath();
    context.arc(center.x - 10, center.y - 7, 20, Math.PI, 0);
    context.fillStyle = color; //color
    context.fill();

    context.beginPath();
    context.rect(center.x - 30, center.y - 7, 40, 20);
    context.fillStyle = color; //color
    context.fill();

    //draw eyes
    context.beginPath();
    context.arc(center.x, center.y - 7, 5, 0, 2 * Math.PI); // circle
    context.fillStyle = "white"; //color
    context.fill();
    context.beginPath();
    context.arc(center.x + 3, center.y - 7, 2, 0, 2 * Math.PI); // circle
    context.fillStyle = "black"; //color
    context.fill();

    context.beginPath();
    context.arc(center.x - 15, center.y - 7, 5, 0, 2 * Math.PI); // circle
    context.fillStyle = "white"; //color
    context.fill();
    context.beginPath();
    context.arc(center.x - 12, center.y - 7, 2, 0, 2 * Math.PI); // circle
    context.fillStyle = "black"; //color
    context.fill();
}

function drawFood(color, center) {
    context.beginPath();
    context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
    context.fillStyle = color; //color
    context.fill();
}

function placeToMove(value) {
    return value == 2 || value == 5 || value == 15 || value == 25 || value == 0 || value == 6;
}

function moveGhostInRow(ghost, n_25, n_215, n_225, n, movedLastTime) {
    if (ghost.i > shape.i && placeToMove(board[ghost.i - 1][ghost.j])) {
        moveLeft(ghost, n_25, n_215, n_225, n);
        movedLastTime = true;
    }
    else if (ghost.i < shape.i && placeToMove(board[ghost.i + 1][ghost.j])) {
        moveRight(ghost, n_25, n_215, n_225, n);
        movedLastTime = true;
    }
    if (!movedLastTime) {
        if (placeToMove(board[ghost.i][ghost.j + 1]))
            moveDown(ghost, n_25, n_215, n_225, n);
        else if (placeToMove(board[ghost.i][ghost.j - 1]))
            moveUp(ghost, n_25, n_215, n_225, n);
        movedLastTime = true;
    }
    movedLastTime = false;
}

function moveRight(ghost, n_25, n_215, n_225, n) {
    if (board[ghost.i][ghost.j] == n)
        board[ghost.i][ghost.j] = 0;
    else if (board[ghost.i][ghost.j] == n_25)
        board[ghost.i][ghost.j] = 5;
    else if (board[ghost.i][ghost.j] == n_215)
        board[ghost.i][ghost.j] = 15;
    else if (board[ghost.i][ghost.j] == n_225)
        board[ghost.i][ghost.j] = 25;
    ghost.i++;
    if (board[ghost.i][ghost.j] == 5)
        board[ghost.i][ghost.j] = n_25;
    else if (board[ghost.i][ghost.j] == 15)
        board[ghost.i][ghost.j] = n_215;
    else if (board[ghost.i][ghost.j] == 25)
        board[ghost.i][ghost.j] = n_225;
    else
        board[ghost.i][ghost.j] = n;
}

function moveLeft(ghost, n_25, n_215, n_225, n) {
    if (board[ghost.i][ghost.j] == n)
        board[ghost.i][ghost.j] = 0;
    else if (board[ghost.i][ghost.j] == n_25)
        board[ghost.i][ghost.j] = 5;
    else if (board[ghost.i][ghost.j] == n_215)
        board[ghost.i][ghost.j] = 15;
    else if (board[ghost.i][ghost.j] == n_225)
        board[ghost.i][ghost.j] = 25;
    ghost.i--;
    if (board[ghost.i][ghost.j] == 5)
        board[ghost.i][ghost.j] = n_25;
    else if (board[ghost.i][ghost.j] == 15)
        board[ghost.i][ghost.j] = n_215;
    else if (board[ghost.i][ghost.j] == 25)
        board[ghost.i][ghost.j] = n_225;
    else
        board[ghost.i][ghost.j] = n;
}

function moveGhostInCol(ghost, n_25, n_215, n_225, n, movedLastTime) {
    if (ghost.j > shape.j && placeToMove(board[ghost.i][ghost.j-1])) {
        moveUp(ghost, n_25, n_215, n_225, n);
        movedLastTime = true;
    }
    else if (ghost.j < shape.j && placeToMove(board[ghost.i][ghost.j+1])) {
        moveDown(ghost, n_25, n_215, n_225, n)
        movedLastTime = true;
    }
    if (!movedLastTime) {
        if (placeToMove(board[ghost.i + 1][ghost.j])) {
            moveRight(ghost, n_25, n_215, n_225, n);
        }
        else if (placeToMove(board[ghost.i - 1][ghost.j]))
            moveLeft(ghost, n_25, n_215, n_225, n);
        movedLastTime = true;
    }
    movedLastTime = false;
}

function moveUp(ghost, n_25, n_215, n_225, n) {
    if (board[ghost.i][ghost.j] == n)
        board[ghost.i][ghost.j] = 0;
    else if (board[ghost.i][ghost.j] == n_25)
        board[ghost.i][ghost.j] = 5;
    else if (board[ghost.i][ghost.j] == n_215)
        board[ghost.i][ghost.j] = 15;
    else if (board[ghost.i][ghost.j] == n_225)
        board[ghost.i][ghost.j] = 25;
    ghost.j--;
    if (board[ghost.i][ghost.j] == 5)
        board[ghost.i][ghost.j] = n_25;
    else if (board[ghost.i][ghost.j] == 15)
        board[ghost.i][ghost.j] = n_215;
    else if (board[ghost.i][ghost.j] == 25)
        board[ghost.i][ghost.j] = n_225;
    else
        board[ghost.i][ghost.j] = n;
}

function moveDown(ghost, n_25, n_215, n_225, n) {
    if (board[ghost.i][ghost.j] == n)
        board[ghost.i][ghost.j] = 0;
    else if (board[ghost.i][ghost.j] == n_25)
        board[ghost.i][ghost.j] = 5;
    else if (board[ghost.i][ghost.j] == n_215)
        board[ghost.i][ghost.j] = 15;
    else if (board[ghost.i][ghost.j] == n_225)
        board[ghost.i][ghost.j] = 25;
    ghost.j++;
    if (board[ghost.i][ghost.j] == 5)
        board[ghost.i][ghost.j] = n_25;
    else if (board[ghost.i][ghost.j] == 15)
        board[ghost.i][ghost.j] = n_215;
    else if (board[ghost.i][ghost.j] == 25)
        board[ghost.i][ghost.j] = n_225;
    else
        board[ghost.i][ghost.j] = n;
}

function moveGhosts() {
    var rand = Math.random(); 
    if (rand < 0.5) {
        if (ghost1.i != shape.i)
            moveGhostInRow(ghost1, 125, 1215, 1225, 1, moved1);
        else
            moveGhostInCol(ghost1, 125, 1215, 1225, 1, moved1);
        if ($("#monsterSetting").val() > 1 && ghost2.i != shape.i)
            moveGhostInRow(ghost2, 1125, 11215, 11225, 11, moved2);
        else if ($("#monsterSetting").val() > 1)
            moveGhostInCol(ghost2, 1125, 11215, 11225, 11, moved2);
        if ($("#monsterSetting").val() > 2 && ghost3.i != shape.i)
            moveGhostInRow(ghost3, 11125, 111215, 111225, 111, moved3);
        else if ($("#monsterSetting").val() > 2)
            moveGhostInCol(ghost3, 11125, 111215, 111225, 111, moved3);
    }
    else {
        if (ghost1.j != shape.j)
            moveGhostInCol(ghost1, 125, 1215, 1225, 1, moved1);
        else
            moveGhostInRow(ghost1, 125, 1215, 1225, 1, moved1);
        if ($("#monsterSetting").val() > 1 && ghost2.j != shape.j)
            moveGhostInCol(ghost2, 1125, 11215, 11225, 11, moved2);
        else if ($("#monsterSetting").val() > 1)
            moveGhostInRow(ghost2, 1125, 11215, 11225, 11, moved2);
        if ($("#monsterSetting").val() > 2 && ghost3.j != shape.j)
            moveGhostInCol(ghost3, 11125, 111215, 111225, 111, moved3);
        else if ($("#monsterSetting").val() > 2)
            moveGhostInRow(ghost3, 11125, 111215, 111225, 111, moved3);
    }
}

function moveBonus() {
    var rand = Math.random();
    if (rand < 0.5) { 
        // move up or down
        rand = Math.random();
        if (rand < 0.5) {
            //move up
            if (bonus_creature.j != 0 && placeToMove(board[bonus_creature.i][bonus_creature.j-1])) {
                moveUp(bonus_creature, 325, 3215, 3225, 3);
            }    
        }
        else {
            //move down
            if (bonus_creature.j != board[0].length && placeToMove(board[bonus_creature.i][bonus_creature.j+1])) {
                moveDown(bonus_creature, 325, 3215, 3225, 3);
            }  
        }
    }
    else { //move right or left
        rand = Math.random();
        if (rand < 0.5) {
            //move right
            if (bonus_creature.j != board.length && placeToMove(board[bonus_creature.i + 1][bonus_creature.j])) {
                moveRight(bonus_creature, 325, 3215, 3225, 3);
            }  
        }
        else {
            //move left
            if (bonus_creature.i != 0 && placeToMove(board[bonus_creature.i - 1][bonus_creature.j])) {
                moveLeft(bonus_creature, 325, 3215, 3225, 3);
            }
        }

    }
}

function moveCreatures(){
    moveGhosts();
    if (!bonus_eaten)
        moveBonus();
}

function UpdatePosition() {
    //moveGhosts();
    board[shape.i][shape.j] = 0;
    var x = GetKeyPressed();
    if (x === 1) {
        if (shape.j > 0 && board[shape.i][shape.j - 1] !== 4) {
            shape.j--;
        }
    }
    if (x === 2) {
        if (shape.j < j_length-1 && board[shape.i][shape.j + 1] !== 4) {
            shape.j++;
        }
    }
    if (x === 3) {
        if (shape.i > 0 && board[shape.i - 1][shape.j] !== 4) {
            shape.i--;
        }
    }
    if (x === 4) {
        if (shape.i < i_length-1 && board[shape.i + 1][shape.j] !== 4) {
            shape.i++;
        }
    }
    if (board[shape.i][shape.j] === 5) {
        score += 5;
        food_total--;
    }
    if (board[shape.i][shape.j] === 15) {
        score += 15;
        food_total--;
    }
    if (board[shape.i][shape.j] === 25) {
        score += 25;
        food_total--;
    }

    if (food_total < 3 && !checkFood()) {
        var txt;
        if ($("#lblScore").val() < 150)
            txt = "You Can Do Better: " + $("#lblScore").val() + " points";
        else
            txt = "We Have a Winner!!! " + $("#lblScore").val() + " points";
        stopGame("You ate all the food!", txt);
    }
   
    if ((shape.i == ghost1.i && shape.j == ghost1.j) || (shape.i == ghost2.i && shape.j == ghost2.j) || (shape.i == ghost3.i && shape.j == ghost3.j)) {
        cleanGhosts();
        placeGhosts();
        score -= 10;

        var pacmanStart = findRandomEmptyCell(board);
        shape.i = pacmanStart[0];
        shape.j = pacmanStart[1];
        //pacman_remain--;
        board[pacmanStart[0]][pacmanStart[1]] = 2;

        checkAndUpdateLives();
    }
   
    if (shape.i == bonus_creature.i && shape.j == bonus_creature.j/*board[shape.i][shape.j] === 3 || board[shape.i][shape.j] === 325 || board[shape.i][shape.j] === 3215 || board[shape.i][shape.j] === 3225*/) {
        score += 50;
        bonus_eaten = true;
        bonus_creature.i = -1;
        bonus_creature.j = -1;
    }

    if (shape.i == timerImage.i && shape.j == timerImage.j) {
        bonusTime = 10;
    }
    if (ghostsColideWithTime()) {
        bonusTime = -10;
    }

    board[shape.i][shape.j] = 2;

    var currentTime = new Date();
    var totalTime = $("#timeSetting").val();
    time_elapsed = totalTime - (currentTime - start_time) / 1000 + bonusTime;
    
    if (time_elapsed < 0) {
        var txt;
        if ($("#lblScore").val() < 150)
            txt = "You Can Do Better: " + $("#lblScore").val() + " points";
        else
            txt = "We Have a Winner!!! " + $("#lblScore").val() + " points";
        stopGame("Time's Up", txt);
    }

    if (score >= 20 && time_elapsed <= 10) {
        pac_color = "green";
    }
    //alert(food_total);
    if (food_total === 0) {
        var txt;
        if ($("#lblScore").val() < 150)
            txt = "You Can Do Better: " + $("#lblScore").val() + " points";
        else
            txt = "We Have a Winner!!! " + $("#lblScore").val() + " points";
        stopGame("You ate all the food!", txt);
    } else {
        Draw();
    }
}

function playMusic() {
    soundtrack.load();
    soundtrack.play();
}

function checkAndUpdateLives() {
    lives--;
    if (lives < 3)
        $("#live3").hide();
    if (lives < 2)
        $("#live2").hide();
    if (lives < 1)
        $("#live1").hide();
    if (lives <= 0) {
        stopGame("You Lost!", "Better Luck Next Time");
    }
}

function stopGame(title, text) {
    soundtrack.pause();
    soundtrack.load();

    window.clearInterval(interval);
    window.clearInterval(intervalGhost);

    if ($("#gameDiv").is(":visible")){
        $("#gameDiv").hide();
        $("#gameFinishedDiv").show();
        $("#finish_text").text(text)
        $("#finish_title").text(title);
    }
}

function placeGhosts() {
    if ($("#monsterSetting").val() > 0) {
        board[0][0] = 1;
        ghost1.i = 0;
        ghost1.j = 0;
    }
    if ($("#monsterSetting").val() > 1) {
        board[/*9*/i_length-1][0] = 11;
        ghost2.i = i_length-1;
        ghost2.j = 0;
    }
    if ($("#monsterSetting").val() > 2) {
        board[i_length - 1][j_length - 1] = 111;
        ghost3.i = i_length - 1;
        ghost3.j = j_length - 1;
    }
}

function cleanGhosts() {
    if ($("#monsterSetting").val() > 0) {
        cleanGhost(ghost1, 1, 125, 1215, 1225);
    }
    if ($("#monsterSetting").val() > 1) {
        cleanGhost(ghost2, 11, 1125, 11215, 11225);
    }
    if ($("#monsterSetting").val() > 2) {
        cleanGhost(ghost3, 111, 11125, 111215, 111225);
    }
}

function cleanGhost(ghost, n, n_25, n_215, n_225) {
    if (board[ghost.i][ghost.j] == n)
        board[ghost.i][ghost.j] = 0;
    else if (board[ghost.i][ghost.j] == n_25)
        board[ghost.i][ghost.j] = 5;
    else if (board[ghost.i][ghost.j] == n_215)
        board[ghost.i][ghost.j] = 15;
    else if (board[ghost.i][ghost.j] == n_225)
        board[ghost.i][ghost.j] = 25;
}

function ghostsColideWithTime() {
    return ghostColideWithTime(ghost1) || ghostColideWithTime(ghost2) || ghostColideWithTime(ghost3);
}

function ghostColideWithTime(ghost) {
    return ghost.i === timerImage.i && ghost.j === timerImage.j;
}


// When the user clicks on <span> (x), close the modal
function closeModal() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        closeModal();
    }
}

function showModal() {
    modal.style.display = "block";
}

function checkFood() {
    for (var i = 0; i < i_length; i++) {
        for (var j = 0; j < j_length; j++) {
            if (board[i][j] == 5 || board[i][j] == 15 || board[i][j] == 25 || board[i][j] == 125 || board[i][j] == 1125 || board[i][j] == 11125 || board[i][j] == 1215 || board[i][j] == 11215 || board[i][j] == 111215 || board[i][j] == 1225 || board[i][j] == 11225 || board[i][j] == 111225)
                return true;
        }
    }
    return false;
}

//1 - blue ghost, 11 - red ghost, 111 - orange ghost;   125 - blue ghost on food 5, 1125 - red ghost on food 5
//2 - pacman
//3 - bonus creature
//4 - wall
//5, 15, 25 = points
//6 - timerImage
