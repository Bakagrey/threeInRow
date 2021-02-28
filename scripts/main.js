const _maxRow = 6;
const _maxColumn = 6;
const monstersArray = [
    {name:'cat',maxFrame:13,folder:'cat/cat'},
    //{name:'lizard',maxFrame:8,folder:'Lizard/Lizard'},
    {name:'octopus',maxFrame:9,folder:'Octopus/Octopus'},
    //{name:'owl',maxFrame:13,folder:'Owl/Owl'},
    {name:'pig',maxFrame:13,folder:'Pig/Pig'},
    {name:'rabbit',maxFrame:13,folder:'Rabbit/Rabbit'}];
let monsterDragging;
let dragComplete = 0;
const currentMonsters = Array.apply(null, Array(_maxRow * _maxColumn)).map(function () {});
const getRandomMonster = (min, max) => {
    return  (Math.random() * (max - min) + min).toFixed(0);
  }
const addMonsters = () => {
    const mainTable = document.querySelector('#game_board');
    if(currentMonsters.filter(e=>!e).length>0){
        const cat = new Monster(monstersArray[getRandomMonster(0,monstersArray.length-1)]);
        mainTable.appendChild(cat.drawMonster());
    }
    
}
const initMainTable = () => {
    const mainTable = document.querySelector('#game_board');
    mainTable.style.width = `${_maxColumn * 92}px`;
    for(let row = 1; row < _maxRow+1; row++){
        for(let column = 1; column < _maxColumn+1;column ++){
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-row',row);
            cell.setAttribute('data-column',column);
            mainTable.appendChild(cell);
        }
    }
    setInterval(addMonsters,100)
}
initMainTable();
