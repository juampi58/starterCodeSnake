
function Game(options){
  this.rows=options.rows;
  this.columns=options.columns;
  this.snake= options.snake;
  this.food=undefined;

for(var rowIndex=0 ; rowIndex<this.rows; rowIndex++){
  for(var columnIndex=0 ; columnIndex<this.columns; columnIndex++){
             $('.container').append($('<div>')
             .addClass('cell board')
             .attr('data-row',rowIndex)
             .attr('data-column',columnIndex));

    }
  }
}

Game.prototype.drawSnake=function(){
  this.snake.body.forEach(function(position,index){
    var selector = '[data-row=' + position.row +'][data-column=' + position.column +']';
    $(selector).addClass('snake');
  });
};
Game.prototype.clearSnake=function(){
  $('.snake').removeClass('snake');
};

Game.prototype.start=function(){
  setInterval(this.update.bind(this),100);
};
Game.prototype.update=function(){
  this.snake.moveForward(this.rows, this.columns);
  if( this.snake.hasEatenFood(this.food)){
    //this.sanke.growUp()
    this.clearFood();
    this.generateFood();
    this.drawFood();
  }
  this.clearSnake();
  this.drawSnake();
};

Game.prototype.clearFood=function(){
  $('.food').removeClass('food');
  this.food=undefined;

};

Game.prototype.assignControlsToKeys=function(){
  $('body').on('keydown',function(e){
    console.log(e);
    switch (e.keyCode) {
      case 37:
        this.snake.goLeft();
          break;
      case 38:
        this.snake.goUp();
          break;
      case 39:
        this.snake.goRight();
          break;
      case 40:
        this.snake.goDown();
          break;
    }
  }.bind(this));
};
Game.prototype.generateFood=function(){
  this.food={
    row:Math.floor(Math.random()*this.rows),
    column:Math.floor(Math.random()*this.columns),
  };
};
Game.prototype.drawFood=function(){
  var selector = '[data-row=' + this.food.row +'][data-column=' + this.food.column +']';
  $(selector).addClass('food');
};


$(document).ready(function () {

var game= new Game({
  rows:50,
  columns:50,
  snake: new Snake()
});
game.assignControlsToKeys();
game.generateFood();
game.drawFood();
game.start();

});
