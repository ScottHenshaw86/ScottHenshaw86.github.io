(function() {

    let start;
    let draggableBoxes = document.querySelectorAll('.draggableBox');
    let border = document.querySelector('.border');
    for (let i=0, c=draggableBoxes.length; i<c; i++) {
        addEvents(draggableBoxes[i]);
    };
    
    function getOffset(element) {
        var top = 0,
            left = 0;
        do {
            top += element.offsetTop;
            left += element.offsetLeft;
        } while (element = element.offsetParent);
    
        return {
            top: top,
            left: left
        }
    }
    
    function addEvents(element) {
        element.addEventListener('mousedown', function(e) {
            let position = getOffset(e.currentTarget);
            let boxX = position.left, boxY = position.top;
            let mouseX = e.clientX, mouseY = e.clientY;
            border.addEventListener('mousemove', function(event) {
                element.style.left = (boxX + (event.clientX - mouseX)) + 'px';
                element.style.top = (boxY + (event.clientY - mouseY)) + 'px';
                element.style.zIndex = '100';
                element.style.cursor = 'grabbing';
            });
            e.currentTarget.addEventListener('mouseup', function(event) {
                event.currentTarget.style.cursor = 'grab';
                let newPosition = getOffset(event.target);
                event.currentTarget.style.left = newPosition.left;
                event.currentTarget.style.top = newPosition.top;
                newBox = border.appendChild(element.cloneNode(true));
                addEvents(newBox);
                newBox.style.zIndex = '10';
                border.removeChild(element);
                // --------- for the target box
                console.log(newPosition.left)
                console.log(target1.style.left)
                console.log(newPosition.top)
                console.log(target1.style.top)
                if (newPosition.left >= parseInt(target1.style.left)-34 && newPosition.left < parseInt(target1.style.left) + 44 && newPosition.top >= parseInt(target1.style.top)-45 && newPosition.top < parseInt(target1.style.top) + 44) {
                    newBox.classList.add('fire');
                    newBox.classList.remove('mario', 'raccoon', 'small');
                    setTimeout(function() {randomTarget(target1)}, 1500);
                } 
                if (newPosition.left >= parseInt(target2.style.left)-34 && newPosition.left < parseInt(target2.style.left) + 44 && newPosition.top >= parseInt(target2.style.top)-45 && newPosition.top < parseInt(target2.style.top) + 44) {
                    newBox.classList.add('raccoon');
                    newBox.classList.remove('mario', 'fire', 'small');
                    setTimeout(function() {randomTarget(target2)}, 1500);
                } 
                if (newPosition.left >= parseInt(target3.style.left)-34 && newPosition.left < parseInt(target3.style.left) + 44 && newPosition.top >= parseInt(target3.style.top)-45 && newPosition.top < parseInt(target3.style.top) + 44) {
                    newBox.classList.add('mario');
                    newBox.classList.remove('small', 'fire', 'raccoon');
                    setTimeout(function() {randomTarget(target3)}, 1500);
                } 
                if (newPosition.left >= parseInt(target4.style.left)-34 && newPosition.left < parseInt(target4.style.left) + 44 && newPosition.top >= parseInt(target4.style.top)-45 && newPosition.top < parseInt(target4.style.top) + 44) {
                    newBox.classList.add('small');
                    newBox.classList.remove('mario', 'fire', 'raccoon');
                    setTimeout(function() {randomTarget(target4)}, 1500);
                } 
            })
        });
    }
    
    // --------- for the target box
    function randomTarget(name) {
        console.log(name);
        start = Date.now();
        name.classList.remove('green');
        name.style.left = randomX() + 'px';
        name.style.top = randomY() + 'px';
    }
    
    function randomX() {
        return Math.floor(Math.random() * 1200) + 70;
    }
    function randomY() {
        return Math.floor(Math.random() * 540) + 30;
    }

    randomTarget(target1);
    randomTarget(target2);
    randomTarget(target3);
    randomTarget(target4);
})();