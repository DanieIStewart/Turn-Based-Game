// Player
let mario = "/images/mario.png";
let bowser ="/images/turtle.png";
let weapons = [];
let fightScreen = document.getElementById("main");
let selectedWeapson = [];
let dimmmedTiles = [];

let isPlayer1Turn = true

const generateRandomNum = () => Math.floor(Math.random() * $('.grid-item').length);


// fight sequence global variables 
let resetButton = document.getElementById('resetBtn');
let players1Turn =  true;

// Classes ///////////////////////////////////
class Player{
  constructor(src, weapon, health, className, position){
    this.src = src;
    this.weapon = weapon;
    this.health = health;
    this.className = className;
    this.position = position;
    this.weapon = weapon1
    this.isDefending = false;
  }
  positionPlayer(){
     this.position = getRandomTileAvailable().addClass('unavailable classGenerated').addClass(this.src).removeClass('available');
  }
}

class Weapon{
  constructor(name, damage, className, src){
    this.name = name;
    this.damage = damage;
    this.className = className;
    this.src = src;
    weapons.push(this)
  }
  placeWeapons(){
   let weapon = getRandomTileAvailable().addClass('unavailable weapon').addClass(this.src).removeClass('available');
   return weapon
  }
}

// **Declaring players with src as as image but does not work?
const weapon1 = new Weapon('Daga', 10, 'unavailable','weapon-1');
const weapon2 = new Weapon('Espada', 20, 'unavailable', 'weapon-2');
const weapon3 = new Weapon('Lanza', 25, 'unavailable', 'weapon-3');
const weapon4 = new Weapon('Hacha', 40, 'unavailable', 'weapon-4');
// **Declaring players with src as as image but does not work?
const playerMario = new Player('player-1', false, 100, 'unavailable');
const  playerBowser = new Player('player-2', false, 100, 'unavailable');

/////////////////////////////////////////Board/////////////////////////////////////////////////////
// *This class renders the baord and renders the characters, blocks
// Generate Board
class Game{
  constructor(columns, rows){
    this.columns = columns;
    this.rows = rows;
  }
  renderBoard(){
    for (let i = 0; i < this.columns; i++) {
      for (let j = 0; j < this.rows; j++) {
        $('.main').append('<div class="grid-item" data-y='+i+' data-x='+j+'></div>');
    
      }
      $('div').addClass('not available')
    }
  }
  renderBlocks(){
        let i = 0
        while(i <= 5){
        const block = getRandomTileAvailable()
          block.addClass('block').removeClass('available');
          i++
        }
      }
  }//Game closing



// checking tiles 
function getRandomTileAvailable(){
  let randomTile = $('.grid-item:eq(' + generateRandomNum() + ')');
  // Check if contains weapons, characters ect
  while ($(randomTile).hasClass("unavailble") || $(randomTile).hasClass("weapon") || $(randomTile).hasClass("block") || randomTile === -1) {
      randomTile = $('.grid-ite:eq(' + generateRandomNum() + ')');
  }       
      return randomTile
}
    
// board instantition
let map = new Game(10,10);
// players start with weapons
document.getElementById('playersWeapon1').innerHTML =  weapons[0].name
document.getElementById('playersWeapon2').innerHTML =  weapons[1].name

let playerMove = function(event){
  let value = event.target
  // check if players turn
    if(isPlayer1Turn && $(value).hasClass('dimmed')){
      // checkForPlayer(value)
        $('.player-1').removeClass('player-1')
        $(value).addClass('player-1')
        $('div').removeClass('dimmed')
        dimedTiles('player-2')
        isPlayer1Turn = false;
        if ($('.player-1').hasClass('weapon')) {
          weaponPickUp('player-1', value.classList[3], 'playersWeapon1', value)
        }
        checkForPlayer(value)
    }else if(isPlayer1Turn != true && $(value).hasClass('dimmed')){
        $('.player-2').removeClass('player-2')
        $(value).addClass('player-2')
        $('div').removeClass('dimmed')
        dimedTiles('player-1')
        // checkForPlayer(playerMario.position, playerBowser.position)
        isPlayer1Turn = true;
        if($('.player-2').hasClass('weapon')){
          // pass player and weapon to function
          weaponPickUp('player-2', value.classList[3], 'playersWeapon2', value )
        }
        checkForPlayer(value)
    }
};

// weapons pick up function
function weaponPickUp(player, weaponClassName, playerClass, eventTarget){
  // passing in the class value
  // check the value of the weapon
  if($(player).val(weaponClassName) && weaponClassName != undefined ){
    // loop over the weapons 
    weapons.forEach(function (weaponInArray) {
      // check that the classes match
      if(weaponInArray.src === weaponClassName){
        // player.weapon.name += weaponInArray.name
        if(player == 'player-1'){
          // update screen with current weapon
          document.getElementById(playerClass).innerHTML =  weaponInArray.name
          // remove weapon
          $('.grid-item').removeClass(weaponInArray.src)
          // add old weapon to the map
          $(eventTarget).addClass(playerMario.weapon.src)
          // set players weapon to new weapon
          playerMario.weapon = weaponInArray
        }else{
          // update screen with current weapon
          document.getElementById(playerClass).innerHTML = weaponInArray.name
          // remove the weapon
          $('.grid-item').removeClass(weaponInArray.src)
          // add old weapon to map
          $(eventTarget).addClass(playerBowser.weapon.src)
          // set to new weapon
          playerBowser.weapon = weaponInArray
        }
      }
    })
  }
}

// remove dimmed class for non players turn
function removeDimmedTiles(){
  $('.dimmed').removeClass('dimmed')
}



function dimedTiles(player){
  // get players index on board
  let position = $("." + player).index('.grid-item');
  // store players y and x value pass this to dimThreeTiles function
  const playerY = parseInt($('.grid-item').eq(position).attr("data-y"));
  const playerX = parseInt($('.grid-item').eq(position).attr("data-x"));

  // get value of tile above 
  let tileAbove =  '';

    // x and y are individual numbers

    dimThreeTiles(0, -1, playerY, playerX)
    // get value of tile bottom 
    dimThreeTiles(0, 1, playerY, playerX)
    // get value of tile left
    dimThreeTiles(-1, 0, playerY, playerX)
    // get value of tile right 
    dimThreeTiles(1, 0, playerY, playerX)

}
 let gameOver = false;

// When ready load classes and functions//////////////////////////////////////////////////////////////
if(gameOver === false){
  $( document ).ready(function() {
    map.renderBoard()
    map.renderBlocks()
    // map.renderPlayers()
    playerMario.positionPlayer()
    playerBowser.positionPlayer()
    // checkForPlayer(playerMario.position, playerBowser.position)
      weapon1.placeWeapons()
      weapon2.placeWeapons()
      weapon3.placeWeapons()
      weapon4.placeWeapons()
      dimedTiles('player-1')
    
      $('.main').on('click', playerMove)
    
});
}


//Check if player are in ajacent tiles 
function checkForPlayer(event){
  // store each players move
  let positionY = $(event).attr('data-y')
  let positionX = $(event).attr('data-X') 
  // add together to get exact position of the player
  let playerCordinates = positionY+positionX; 
  let numCordinates = Number(playerCordinates);

  // get all 4 directions in either direction 
  let up  = numCordinates - 10
  let down  = numCordinates + 10
  let left  = numCordinates - 1
  let right  = numCordinates + 1

    // condition checking if tiles contain class of player-2 
    if($('.grid-item').eq(up).hasClass('player-2')|| $('.grid-item').eq(down).hasClass('player-2') || $('.grid-item').eq(left).hasClass('player-2')|| $('.grid-item').eq(right).hasClass('player-2')){
      console.log('found player 2')
      document.getElementById('battleScreen').style.display = 'block';
      document.getElementById('main').style.display = 'none';
      document.getElementById('displayWeapon2').innerHTML = playerBowser.weapon.name
      document.getElementById('displayWeapon1').innerHTML = playerMario.weapon.name
      fightWindow()
    }
    // check for player1
    if($('.grid-item').eq(up).hasClass('player-1')|| $('.grid-item').eq(down).hasClass('player-1') || $('.grid-item').eq(left).hasClass('player-1')|| $('.grid-item').eq(right).hasClass('player-1')){
      console.log('found player 1')
      document.getElementById('battleScreen').style.display = 'block';
      document.getElementById('main').style.display = 'none';
      document.getElementById('displayWeapon2').innerHTML = playerBowser.weapon.name
      document.getElementById('displayWeapon1').innerHTML = playerMario.weapon.name
      fightWindow()
    }
}




// fight screen functionality
function fightWindow() {
  // store attack buttons
  let player1AttackBtn = document.getElementById('attackBtnp1');
  let player2AttackBtn = document.getElementById('attackBtnp2');
  // defends buttons 
  let player1DefendBtn = document.getElementById('defendBtnp1');
  let player2DefendBtn = document.getElementById('defendBtnp2');
  // display weapons
  let marioWeapon = document.getElementById('player1WeaponImg');
  let bowsersWeapon = document.getElementById('player2WeaponImg');

  if(players1Turn){
    document.getElementById('attackBtnp2').disabled = true;
    document.getElementById('defendBtnp2').disabled = true;
    marioWeapon.src = 'images/'+playerMario.weapon.name +'.png'
    bowsersWeapon.src = 'images/'+playerBowser.weapon.name +'.png'

    // marioWeapon.style.backgroundImage = playerMario.weapon.src
      // fight button player 1
    player1AttackBtn.addEventListener('click', ()=>{
      if(players1Turn && playerBowser.health >= 1){
        // tenary operator is true run attack if not damage is halfed
        playerBowser.health -=  playerBowser.isDefending ? playerMario.weapon.damage *0.5 :  playerMario.weapon.damage; 
        document.getElementById('displayHealth2').innerHTML = playerBowser.health
        playerMario.isDefending = false;
        // disbale player 2 buttons
        btnOptions('attackBtnp2', false)
        btnOptions('defendBtnp2', false)
        // set game state to false changing turns
        players1Turn = false
        // Disable player 1 buttons
        btnOptions('attackBtnp1', true)
        btnOptions('defendBtnp1', true)
        if(playerBowser.health === 0){
          resetButton.style.display = 'inline-block'
          document.getElementById('attackBtnp2').disabled = true;
          document.getElementById('defendBtnp2').disabled = true;
          document.querySelector('.resultMessageP1').innerHTML='Mario is the winner'
        }
      }
    })//event listener
  } //fight window function

  // player 1 defend button
  player1DefendBtn.addEventListener('click', function() {
    if(players1Turn && playerBowser.health >= 1){
      playerMario.isDefending = true;
      // Activate player 2 buttons
      btnOptions('attackBtnp2', false)
      btnOptions('defendBtnp2', false)
      // set game state to false changing turns
      players1Turn = false
      // Disable player 1 buttons
      btnOptions('attackBtnp1', true)
      btnOptions('defendBtnp1', true)
      if(playerBowser.health === 0){
        resetButton.style.display = 'inline-block'
        document.getElementById('attackBtnp2').disabled = true;
        document.getElementById('defendBtnp2').disabled = true;
        document.querySelector('.resultMessageP1').innerHTML='Bowser is the winner'
      }
    }
  })
  
  // player 2
  player2AttackBtn.addEventListener('click', function(){
    if(!players1Turn && playerMario.health >= 1){
       // tenary operator is true run attack if not damage is halfed
       playerMario.health -= playerMario.isDefending ?  playerBowser.weapon.damage * 0.5 :  playerBowser.weapon.damage;
       document.getElementById('displayHealth1').innerHTML = playerMario.health
       playerBowser.isDefending = false;
        btnOptions('attackBtnp1', false)
        btnOptions('defendBtnp1', false)
        players1Turn = true;
        btnOptions('attackBtnp2', true)
        btnOptions('defendBtnp2', true)
        if(playerMario.health === 0){
          resetButton.style.display = 'inline-block'
          document.getElementById('attackBtnp1').disabled = true;
          document.getElementById('defendBtnp1').disabled = true;
          document.querySelector('.resultMessageP2').innerHTML='Bowser is the winner'
        }
    }
  })

player2DefendBtn.addEventListener('click', function() {
  if(!players1Turn && playerMario.health >= 1){
    // changing state
    playerBowser.isDefending = true;
     btnOptions('attackBtnp1', false)
     btnOptions('defendBtnp1', false)
     players1Turn = true;
     btnOptions('attackBtnp2', true)
     btnOptions('defendBtnp2', true)
     if(playerMario.health === 0){
       resetButton.style.display = 'inline-block'
       document.getElementById('attackBtnp1').disabled = true;
       document.getElementById('defendBtnp1').disabled = true;
       }
     }
  })
}

// function disbale buttons
function btnOptions(pointer, condition){
  return document.getElementById(pointer).disabled = condition;
}
// reset button starts game with all values reset
resetButton.addEventListener('click', function() {
  location.reload()

})

// checking that the player is on the map
function isPositioMap(position) {
  // grab player y and x
  const playerY = $('.grid-item').eq(position).attr("data-y");
  const playerX = $('.grid-item').eq(position).attr("data-x");


  if(playerY === -1 || playerX === -1){
    // remove class from the tiles
    console.log('off the board')
    return true
  }else{
    return false
  }
}


function dimThreeTiles(incrementX, incrementY, tileY , tileX ) {
  // loop over the map 3 times 
  for (let index = 1; index <= 3; index ++) {
    // x axis 
    tileX += incrementX
    // y axis
    tileY += incrementY
    // check that x and y are on the map
    if (tileX < 0 || tileX >= map.rows || tileY < 0 || tileY >= map.columns  ) {
      // stop anything from happening
      break
    }
    // get tiles in all directions
    tilePosition = tileY * 10 + tileX
    
    tile = $('.grid-item').eq(tilePosition).removeClass('not available')
    
    if(tile.hasClass('block') || tile === -1 ){
      // if the tile contains blocks or is -1 exit the loop
      break;
    }else{
      tile.addClass('dimmed')
      isPositioMap(tilePosition)
    }
  }
}


// new function checking if player value is equal to 3 or 6
function checkTilesNearEdge(tile){
  // grab positions
 let tileYcoordinates = $('.grid-item').eq(tile).attr("data-x");
 let tileXcoordinates = $('.grid-item').eq(tile).attr("data-y");
//  convert to numbers
 tileYcoordinates = Number(tileYcoordinates)
 tileXcoordinates = Number(tileXcoordinates)
    // checking if tile is equal to 3 || 6
  if((tileXcoordinates === 3 || 6)){
    // if 3 remove dimmed class in 3rd direction left 
    if(tileXcoordinates===3){
      tileXcoordinates.eq(3).removeClass('dimmed')
      // if 6 remove dimmed in 3rd diection right
    }else if(tileXcoordinates === 6){
      tileXcoordinates.eq(3).removeClass('dimmed')
    }
  }
 
} 