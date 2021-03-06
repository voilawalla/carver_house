sampleDestruct = function(array) {
  returner =  array.splice(Math.floor(Math.random()*array.length), 1);
  return returner[0];
};

function ItemController(){}

ItemController.prototype = {
  allLocalItems: [],

  instantiateItem: function(itemName){
    var placed = false;
    while ( placed === false ){
      x = gameBoard.randomCoord();
      y = gameBoard.randomCoord();
      if (gameBoard.checkForFloor(x, y)){
        thisItem = new Item(itemName);
        this.allLocalItems.push(thisItem);
        thisItem.placeItem(itemName, x, y);
        placed = true;
    }}},

  seed: function(){
    var itemsToPlace = ["Skull", "Book", "Coin", "CrystalBall", "Dice", "Idol", "MusicBox", "Necklace", "Needle", "PuzzleBox", "Rings", "Voodoo"];
    for ( i = 1; i <= 6; i++){
      placed = false;
      var newItem = sampleDestruct(itemsToPlace);
      this.instantiateItem(newItem);
    }
    this.instantiateItem("Key");
  }
};

function Item (name) {
  this.name = name;
  this.sprite = null;
}

Item.prototype = {

  pickUp: function(){
    if (game.physics.arcade.distanceBetween(this.sprite, player.sprite) < 100 ){
      this.sprite.kill();
      inventory.push(this.name);
  }},

  placeItem: function(item, boardX, boardY){
    this.sprite = game.add.isoSprite(xTilePosition(boardX), yTilePosition(boardY), 0, item, 0, itemGroup);
    this.sprite.anchor.set(0.5, 0.5);
    this.sprite.inputEnabled = true;
    this.sprite.events.onInputDown.add(this.pickUp, this);
    this.sprite.events.onInputOver.add(this.lightUp, this);
    this.sprite.events.onInputOut.add(this.lightOff, this);
  },

  lightUp: function(){
    this.sprite.frame = 1;
  },

  lightOff: function(){
    this.sprite.frame = 0;
  }
};
