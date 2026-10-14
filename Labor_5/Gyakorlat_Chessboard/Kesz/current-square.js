function getIndex(element) {
    return Array.from(element.parentNode.children).indexOf(element);
}

document.querySelectorAll('table.chessboard td').forEach((element) => {
    element.addEventListener('mouseenter', (event) => {
        const currentElement = event.currentTarget;
        const col = getIndex(currentElement) - 1;
        const row = getIndex(currentElement.parentNode);
        const notation = 'abcdefgh'.charAt(col) + (8 - row);
        console.log(`Mouse on square (row=${row},col=${col}), i.e., ${notation}`);
        document.getElementById('currentSquare').textContent = `Current square is ${notation}`;
    });
    element.addEventListener('mouseleave', (event) => {
        document.getElementById('currentSquare').textContent = '';
    });
});