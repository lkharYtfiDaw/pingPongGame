// Getting my canvas info and tools to draw in it
const canvas = document.getElementById("PingPong");
const context = canvas.getContext("2d");

//===+Functions to draw with+============

// Draw rectangle function
function rectangle(x,y,w,h,color)
{
    context.fillStyle = color;
    context.fillRect(x,y,w,h);
}

// Draw circle function
function circle(x,y,r,color)
{
    context.fillStyle = color;
    context.beginPath();
    context.arc(x,y,r,0,Math.PI*2,false);
    context.closePath();
    context.fill();
}

// Draw text
function text(text,x,y,color)
{
    context.fillStyle = color;
    context.font = "45px fantasy";
    context.fillText(text,x,y);
}

//========================================

//=========+Objects to draw+===============

// User paddle
const user = {
    width : 10,
    height : 100,
    x : 0,
    y : canvas.height/2 - 50,
    color : "WHITE",
    score : 0,
    movSpeed : 10,
}

// User2 paddle
const user2 = {
    width : 10,
    height : 100,
    x : canvas.width - 10,
    y : canvas.height/2 - 50,
    color : "WHITE",
    score : 0,
    movSpeed : 10,
}

// The ball
const ball = {
    x : canvas.width/2,
    y : canvas.height/2,
    radius : 10,
    speed : 5,
    movement_angle : Math.PI/4,
    color : "WHITE",
    directionX : 1,
    directionY : 1,
}

// The net pieces
const net = {
    x : canvas.width/2- 1,
    y : 0,
    width : 2,
    height : 10,
    color : "WHITE",
} 
//=======================================

// Drawing the net
function drawNet()
{
    for (let i = 0; i <= canvas.height; i += 15)
        rectangle(net.x, net.y + i, net.width, net.height, net.color);
}

// Control the user Paddle // needs to be understood more
let lastDownTarget;
/* For mouse event */
document.addEventListener('mousedown', function(event){ lastDownTarget = event.target;});
/* For keyboard event */
document.addEventListener('keydown', function(event) { if (lastDownTarget == PingPong) movePaddle(event);}); 
canvas.addEventListener("key", movePaddle);
function movePaddle(event)
{
    if (event.keyCode == 38)
        user.y = (user.y - user.movSpeed >= 0) ? user.y - user.movSpeed : 0;
    if (event.keyCode == 40)
        user.y = (user.y + user.movSpeed <= canvas.height - user.height) ? user.y + user.movSpeed : canvas.height - user.height;
    if (event.keyCode == 37)
        user2.y = (user2.y - user2.movSpeed >= 0) ? user2.y - user2.movSpeed : 0;
    if (event.keyCode == 39)
        user2.y = (user2.y + user2.movSpeed <= canvas.height - user2.height) ? user2.y + user2.movSpeed : canvas.height - user2.height;
}

// Collision detection
function collision(ball, player)
{
    return (ball.x >= player.x - (ball.radius - 1) && ball.x <= player.x + (player.width - 1) + (ball.radius - 1)
    &&  ball.y >= player.y - (ball.radius - 1) && ball.y <= player.y + (player.height - 1) + (ball.radius - 1))
}

// Reseting ball
function resetBall()
{
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.movement_angle = Math.PI/4;
    ball.speed = 5;
}

// Rendering the game
function render()
{
    // Clear the canvas
    rectangle(0, 0, canvas.width, canvas.height, "BLACK");
    // Draw the net
    drawNet();
    // Draw the score
    text(user.score, canvas.width/4, canvas.height/5, user.color);
    text(user2.score, 3*canvas.width/4, canvas.height/5, user2.color);
    // Draw the paddles
    rectangle(user.x, user.y, user.width, user.height, user.color);
    rectangle(user2.x, user2.y, user2.width, user2.height, user2.color);
    // Draw the ball
    circle(ball.x, ball.y, ball.radius, ball.color);
}

// Updating ball position, score, ...
function update()
{
    if (ball.y >= canvas.height - ball.radius || ball.y <= ball.radius - 1)
        ball.directionY *= -1;
    let player = (ball.x < canvas.width/2) ? user : user2;
    if (collision(ball, player))
    {
        // Updating the angle according to where the ball hits the paddle
        ball.movement_angle = Math.abs(((ball.y - (player.y + player.height/2))/(player.y + player.height/2))*(Math.PI/4));
        // Updating directions
        ball.directionX *= -1;
        ball.directionY = (ball.y <= player.y + player.height/2) ? -1 : 1;
        // Increasing speed
        ball.speed += 0.1;
    }
    // Updating score and reseting
    if (ball.x <= ball.radius - 1)
    {
        user2.score++;
        resetBall();
    }
    else if (ball.x >= canvas.width - ball.radius)
    {
        user.score++;
        resetBall();
    }
    ball.x += Math.cos(ball.movement_angle) * ball.speed * ball.directionX;
    ball.y += Math.sin(ball.movement_angle) * ball.speed * ball.directionY;
}

// Game init
function game()
{
    update();
    render();
}

// Loop
const framePerSecond = 50;
setInterval(game, 1000/framePerSecond);






