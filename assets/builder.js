// Builder
var canvas = document.getElementById('card-canvas');
var context = canvas.getContext('2d');

// New Retina canvas
canvas.width = 600;
canvas.height = 1000;
canvas.style.width = '300px';
canvas.style.height = '500px';
context.scale(2, 2);

var width = canvas.width / 2;
var height = canvas.height / 2;

walker();

function walker() {
  // Variables
  let x = width / 2;
  let y = height / 2;
  const stepSize = 10;
  const walkerCount = 20;
  const angles = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];
  const colors = ['#241e44', '#25315e', '#3a5c85', '#56a1bf', '#97dbd2'];

  // Backgrounds
  context.fillStyle = '#19102e';
  context.fillRect(0, 0, width, height);

  for (let i = 0; i < walkerCount; i++) {
    walkingCircle(x, y, stepSize, i);
  }

  // Starts a new walking circle
  function walkingCircle(x, y, stepSize, color) {
    var animation = true;

    draw();

    canvas.addEventListener('click', function(event) {
      if (animation == true) {
        animation = false;
      } else if (animation == false) {
        animation = true;
        draw();
      }
    });

    function draw() {
      if (animation == false) {
        return;
      }
      let angle = pick(angles);
      x += Math.cos(angle) * stepSize;
      y += Math.sin(angle) * stepSize;

      // Turn around if you hit the edge of the canvas
      if (x < 0) x = 0;
      if (x > width) x = width;
      if (y < 0) y = 0;
      if (y > height) y = height;

      context.beginPath();
      context.arc(x, y, 3, 0, Math.PI * 2, false);
      context.fillStyle = colors[color % colors.length];
      context.fill();

      requestAnimationFrame(draw);
    }

    // MATH
    function rangeFloor(min, max) {
      // Return a random whole number between min and max
      return Math.floor(Math.random() * (max - min) + min);
    }

    function pick(array) {
      // Pick a random item out of an array
      if (array.length === 0) return undefined;
      return array[rangeFloor(0, array.length)];
    }
  }
}
