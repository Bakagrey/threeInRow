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
    checkThreeInRow(monster){
        let result = [];
        const monsterIdx = this.getMonsterIdxInArray(monster);
        const monsterName = currentMonsters[monsterIdx].folder;
        //Check Horizontal
        let nearlyLow = _maxColumn * _maxRow;
        while(nearlyLow > monsterIdx){
            nearlyLow = nearlyLow - _maxColumn;
        }
        for(let i = monsterIdx; i>=nearlyLow;i--){
            if(currentMonsters[i].folder === monsterName)
                result.push(i);
            else
                break;
        }
        for(let i = monsterIdx + 1; i< nearlyLow + _maxColumn;i++){
            if(currentMonsters[i].folder === monsterName)
                result.push(i);
            else
                break;
        }
        if(result.length < 3)
            result = [];
        let subresult = [];
        //Check Vertical
        for(let i = monsterIdx; i>=0;i-=_maxRow){
            if(currentMonsters[i].folder === monsterName)
            subresult.push(i);
            else
                break;
        }
        for(let i = monsterIdx + _maxRow; i< _maxRow * _maxColumn; i += _maxRow){
            if(currentMonsters[i].folder === monsterName)
                subresult.push(i);
            else
                break;
        }
        if(subresult.length >2){
            subresult.forEach(element => {
                result.push(element)
            });
        }
        /*for(let i = 0; i< _maxRow; i++){
            if(currentMonsters[i].folder === currentMonsters[i+_maxRow].folder && currentMonsters[i].folder === currentMonsters[i+_maxRow*2].folder){
                result.push(i, i+_maxRow, i+_maxRow*2);
                return result;
            }
        }*/
        return result;
    }
    destoySameMonsters(arrayIdx){
        if(arrayIdx.length === 0)
            return;
        for(let i = 0; i< arrayIdx.length;i++){
            clearInterval(currentMonsters[arrayIdx[i]].interval) 
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
            this.destoySameMonsters(this.checkThreeInRow(this.monsterHtml));
            this.destoySameMonsters(this.checkThreeInRow(monsterDragging));
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
        this.interval = setInterval(()=>{
            this.monsterHtml.style.backgroundImage =`url(./img/monsters/${this.folder}_${this.getMonsterFrame()}.png)`;            
        },3000);
        this.monsterHtml.addEventListener('dragstart',this.dragMonster);   
        this.monsterHtml.addEventListener('dragend',this.dropMonster);    
        this.monsterHtml.addEventListener('dragover',(event)=>{this.dragOverMonster(event)});  
        return this.monsterHtml;  
    }
    showInformation(){
        console.log(this);
    }
}