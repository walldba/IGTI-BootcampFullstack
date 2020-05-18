window.addEventListener('load', getInputRange);

function getInputRange() {
    function changeSquareColor() {
        var squareColor = document.querySelector('.squareColor');

        var redButton = document.querySelector('#range-red').value;
        var greenButton = document.querySelector('#range-green').value;
        var blueButton = document.querySelector('#range-blue').value;

        document.querySelector('#text-red').value = redButton;
        document.querySelector('#text-green').value = greenButton;
        document.querySelector('#text-blue').value = blueButton;

        squareColor.style.backgroundColor = 'rgb(' + redButton + ',' + greenButton + ',' + blueButton;
    }
    document.querySelector('#range-red').addEventListener('input', changeSquareColor);
    document.querySelector('#range-green').addEventListener('input', changeSquareColor);
    document.querySelector('#range-blue').addEventListener('input', changeSquareColor);
}
