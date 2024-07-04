document.getElementById('upload').addEventListener('change', handleImage, false);
document.getElementById('generate').addEventListener('click', generateJSON);

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let points = [];
let img = new Image();

function handleImage(e) {
    let reader = new FileReader();
    reader.onload = function(event) {
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
}

canvas.addEventListener('click', function(event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    points.push([x / canvas.width, y / canvas.height]);
    drawPoints();
});

function drawPoints() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
    ctx.fillStyle = 'red';
    points.forEach(point => {
        ctx.beginPath();
        ctx.arc(point[0] * canvas.width, point[1] * canvas.height, 5, 0, 2 * Math.PI);
        ctx.fill();
    });
}

function generateJSON() {
    let density = document.getElementById('density').value;
    let friction = document.getElementById('friction').value;
    let restitution = document.getElementById('restitution').value;

    let characterData = {
        bodies: [{
            density: parseFloat(density),
            friction: parseFloat(friction),
            restitution: parseFloat(restitution),
            shapes: [points]
        }]
    };

    document.getElementById('output').textContent = JSON.stringify(characterData, null, 2);
}
