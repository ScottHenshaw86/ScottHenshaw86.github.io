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
                newPosition = getOffset(event.target);
                event.currentTarget.style.left = newPosition.left;
                event.currentTarget.style.top = newPosition.top;
                newBox = border.appendChild(element.cloneNode(true));
                addEvents(newBox);
                newBox.style.zIndex = '10';
                border.removeChild(element);
                // --------- for the target box
                if (newBox.innerHTML === target1.innerHTML && newPosition.left >= targetX && newPosition.left < targetX + 14 && newPosition.top >= targetY && newPosition.top < targetY + 14) {
                    target1.classList.add('green');
                    var score = ((Date.now() - start)/1000).toFixed(2);
                    document.getElementById('score').innerHTML = 'Score: ' + score + ' s';
                    bestScore(score);
                    setTimeout(randomTarget, 1500);
                } 
            })
        });
    }

    // --------- for the score boxes
    let best = Infinity;
    function bestScore(score) {
        if (score < best) {
            best = score;
            document.getElementById('bestScore').innerHTML = 'Best: ' + best + ' s'
        }
    }
    
    // --------- for the target box
    function randomTarget() {
        start = Date.now();
        let target1 = document.getElementById('target1');
        target1.innerHTML = Math.ceil(Math.random()*3);
        target1.classList.remove('green');
        target1.style.left = randomX() + 'px';
        target1.style.top = randomY() + 'px';
        targetX = parseInt(target1.style.left);
        targetY = parseInt(target1.style.top);
    }
    
    function randomX() {
        return Math.floor(Math.random() * 700) + 50;
    }
    function randomY() {
        return Math.floor(Math.random() * 450) + 50;
    }

    randomTarget();
})();