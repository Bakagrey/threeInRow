class Monster {
    constructor(monster){
        this.maxFrame = monster.maxFrame;
        this.folder = monster.folder;
    }
    getMonsterFrame(){
        return parseInt(this.monsterHtml.style.backgroundImage.match(/\d+/)[0]) === this.maxFrame ? 1 : parseInt(this.monsterHtml.style.backgroundImage.match(/\d+/)[0]) + 1;
    }
    getMonsterPosition(){
        for(let i = 0; i< currentMonsters.length; i++){
            if(!currentMonsters[i]){
                this.top = Math.floor(i / _maxRow) * 90;
                this.left = i % _maxColumn * 90;
                currentMonsters[i] = this;
                return;
            }
        }
    }
    dragMonster(event){
        event.target.classList.add("dragged");
        monsterDragging = this;
        dragComplete = 0;
    }
    dropMonster(event){
        event.target.classList.remove("dragged");
    }
    checkThreeInRow(){
        let result = [];
        for(let i = 0; i< currentMonsters.length; i+= _maxColumn){
            if(currentMonsters[i].folder === currentMonsters[i+1].folder && currentMonsters[i].folder === currentMonsters[i+2].folder){
                result.push(i,i+1,i+2);
                return result;
            }
        }
        for(let i = 0; i< _maxRow; i++){
            if(currentMonsters[i].folder === currentMonsters[i+_maxRow].folder && currentMonsters[i].folder === currentMonsters[i+_maxRow*2].folder){
                result.push(i, i+_maxRow, i+_maxRow*2);
                return result;
            }
        }
        return result;
    }
    destoySameMonsters(arrayIdx){
        if(arrayIdx.length === 0)
            return;
        console.log(arrayIdx);
        for(let i = 0; i< arrayIdx.length;i++){
            //clearInterval(this.interval) 
            currentMonsters[arrayIdx[i]].monsterHtml.style.backgroundImage =`url(./img/monsters/${this.folder}.png)`;
            setTimeout(()=>{
                currentMonsters[arrayIdx[i]].monsterHtml.remove();
                currentMonsters[arrayIdx[i]] = null;
            },400);            
        }
    }
    getMonsterIdxInArray(monster){
        let monsterDraggingBeforeTop = monster.style.top;
        let monsterDraggingBeforeLeft = monster.style.left;
        monsterDraggingBeforeTop = parseInt(monsterDraggingBeforeTop);
        monsterDraggingBeforeLeft = parseInt(monsterDraggingBeforeLeft);
        return monsterDraggingBeforeTop * _maxRow / 90 + monsterDraggingBeforeLeft / 90;
    }
    changeMonsterInArray(monster1, monster2){
        const monsterDraggedIdx = this.getMonsterIdxInArray(monster1);
        const monsterHoveredIdx = this.getMonsterIdxInArray(monster2);
        const monsterDragged = currentMonsters[monsterDraggedIdx];
        currentMonsters[monsterDraggedIdx] = currentMonsters[monsterHoveredIdx];
        currentMonsters[monsterHoveredIdx] = monsterDragged;
    }
    dragOverMonster(){
        const hoveredMonsterTop = this.monsterHtml.style.top;
        const hoveredMonsterLeft = this.monsterHtml.style.left;
        if((monsterDragging.style.top != hoveredMonsterTop && monsterDragging.style.left == hoveredMonsterLeft)  || (monsterDragging.style.left != hoveredMonsterLeft && monsterDragging.style.top == hoveredMonsterTop)){
            if(dragComplete === 1)
                return false;
            this.changeMonsterInArray(monsterDragging, this.monsterHtml);
            this.destoySameMonsters(this.checkThreeInRow());
            this.monsterHtml.style.top =  monsterDragging.style.top;
            this.monsterHtml.style.left = monsterDragging.style.left;
            monsterDragging.style.top = hoveredMonsterTop;
            monsterDragging.style.left = hoveredMonsterLeft;
            dragComplete = 1;      
        }
    }
    drawMonster(){
        this.getMonsterPosition();
        this.monsterHtml = document.createElement('div');
        this.monsterHtml.classList.add('monster');
        this.monsterHtml.style.backgroundImage =`url(./img/monsters/${this.folder}_1.png)`;
        this.monsterHtml.style.top =`${this.top}px`;
        this.monsterHtml.style.left =`${this.left}px`;
        this.monsterHtml.setAttribute('draggable', true)
        setInterval(()=>{
            this.monsterHtml.style.backgroundImage =`url(./img/monsters/${this.folder}_${this.getMonsterFrame()}.png)`;            
        },1700);
        this.monsterHtml.addEventListener('dragstart',this.dragMonster);   
        this.monsterHtml.addEventListener('dragend',this.dropMonster);    
        this.monsterHtml.addEventListener('dragover',(event)=>{this.dragOverMonster(event)});      
        return this.monsterHtml;  
    }
    showInformation(){
        console.log(this);
    }
}