let processor = {
  timerCallback: function () {
    if (this.video.paused || this.video.ended) {
      return;
    }
    this.computeFrame();
    let self = this;
    setTimeout(function () {
      self.timerCallback();
    }, 0);
  },

  doLoad: function () {
    this.video = document.getElementById("video");
    this.c1 = document.getElementById("c1");
    this.ctx1 = this.c1.getContext("2d");
    let self = this;
    this.video.addEventListener("play", function () {
      self.width = self.video.videoWidth
      self.height = self.video.videoHeight
      self.timerCallback();
    }, false);
  },

  computeFrame: function () {
    this.ctx1.drawImage(this.video, 0, 0, this.width, this.height);
    let frame = this.ctx1.getImageData(0, 0, this.width, this.height);
    let l = frame.data.length / 4;

    for (let i = 0; i < l; i++) {
      let r = frame.data[i * 4 + 0];
      let g = frame.data[i * 4 + 1];
      let b = frame.data[i * 4 + 2];
      if (g > 100 && r > 100 && b < 43)
        frame.data[i * 4 + 3] = 0;
    }
    return;
  }
};

document.addEventListener("DOMContentLoaded", () => {
  processor.doLoad();
});


// Add Keypoint 
let addButton = document.getElementById('add')
addButton.onclick = addKeyPoint

function addKeyPoint() {
  console.log('add key point')
  let x = 107
  let y = 83
  let pointSize = 3
  let ctx = document.getElementById('c1').getContext('2d')
  ctx.fillStyle = '#ff2626'
  ctx.beginPath()
  ctx.arc(x, y, pointSize, 0, Math.PI * 2, true)
  ctx.arc(117, 93, pointSize, 0, Math.PI * 2, true)
  ctx.arc(127, 103, pointSize, 0, Math.PI * 2, true)
  ctx.fill()
}

// clear point
let clearButton = document.getElementById('clear')
clearButton.onclick = clearPoint

function clearPoint() {
  console.log('clear')
  let ca2 = document.getElementById('c1')
  let ctx2 = ca2.getContext('2d')
  ctx2.clearRect(0, 0, ca2.width, ca2.height)
}

function drawCoordinates(x, y) {
  console.log(x, y)
  let ctx = c2.getContext('2d')
  ctx.fillStyle = '#ff2626'
  ctx.beginPath()
  ctx.arc(x, y, pointSize, 0, Math.PI * 2, true)
  ctx.fill()
  setTimeout(() => {
    ctx.clearRect(0, 0, c2.width, c2.height)
    console.log('3s clear point')
  }, 3000)
}


let c2 = document.getElementById('c2')
c2.addEventListener('click', event => {
  getPosition(event)
})

let pointSize = 3

function getPosition(e) {
  let rect = c2.getBoundingClientRect()
  let x = e.clientX - rect.left
  let y = e.clientY - rect.top
  drawCoordinates(x, y)
}

function drawCoordinates(x, y) {
  let ctx = c2.getContext('2d')
  ctx.fillStyle = '#ff2626'
  ctx.beginPath()
  console.log(x, y)
  ctx.arc(x, y, pointSize, 0, Math.PI * 2, true)
  ctx.fill()
  setTimeout(() => {
    console.log('3s')
    ctx.clearRect(0, 0, c2.width, c2.height)
  }, 3000)
}


