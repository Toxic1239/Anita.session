<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pair Code with Firefly Effect</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
  <style>
    body {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
      background-color: #0a043c; /* Dark blue background */
      overflow: hidden;
      font-family: Arial, sans-serif;
      color: #f6f5f5;
    }
    #fireflyCanvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    }
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      z-index: 1;
    }
    .box {
      width: 300px;
      height: 320px;
      padding: 20px;
      text-align: center;
      background-color: #1a1a2e; /* Darker box color */
      border-radius: 10px;
      box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
    }
    #text {
      color: #f6f5f5;
    }
    .input-container {
      display: flex;
      background: #444;
      border-radius: 1rem;
      padding: 0.3rem;
      gap: 0.3rem;
      max-width: 300px;
      width: 100%;
    }
    .input-container input {
      border-radius: 0.8rem 0 0 0.8rem;
      background: #e8e8e8;
      width: 100%;
      padding: 1rem;
      border: none;
      color: #000;
    }
    .input-container button {
      padding: 1rem;
      background: #ff9800; /* Bright orange color for button */
      font-weight: 700;
      color: white;
      border: none;
      border-radius: 0 1rem 1rem 0;
      cursor: pointer;
    }
    .input-container button:hover {
      background-color: #ff5722; /* Darker orange for hover */
    }
    .centered-text {
      color: #fff;
      text-align: center;
    }
    @media (max-width: 500px) {
      .box {
        width: 90%;
      }
      .input-container {
        flex-direction: column;
      }
      .input-container input {
        border-radius: 0.8rem;
        width: 100%;
      }
      .input-container button {
        padding: 0.4rem;
        border-radius: 0.8rem;
      }
    }
  </style>
</head>
<body>
  <canvas id="fireflyCanvas"></canvas>
  <div class="container">
    <div class="main">
      <div class="box" id="box">
        <div id="text">
          <i class="fa fa-user"></i>
          <p>
            <h3 class="centered-text">ANITA-V2 PAIRING CODE</h3>
            <br>
            <h6>Made By David Cyril⚡.</h6>
            <h6>Enter Your Number with Country Code.</h6>
            <div class="input-container">
              <input placeholder="923192173xxx" type="number" id="number" name="">
              <button id="submit">Submit</button>
            </div>
            
            <a id="waiting-message" class="centered-text" style="display: none;">Please wait a while</a>
            <br>
            <br>
            <main id="pair"></main>
          </p>
        </div>
      </div>
    </div>
  </div>
  <script>
    let a = document.getElementById("pair");
    let b = document.getElementById("submit");
    let c = document.getElementById("number");
    let box = document.getElementById("box");

    async function Copy() {
      let text = document.getElementById("copy").innerText;
      let obj = document.getElementById("copy");
      await navigator.clipboard.writeText(obj.innerText.replace('CODE: ', ''));
      obj.innerText = "COPIED";
      obj.style = "color:blue;font-weight:bold";
      obj.size = "5";
      setTimeout(() => {
        obj.innerText = text;
        obj.style = "color:white;font-weight-bold";
        obj.size = "5";
      }, 500);
    }

    b.addEventListener("click", async (e) => {
      e.preventDefault();
      if (!c.value) {
        a.innerHTML = '<a style="color:white;font-weight:bold">Enter your WhatsApp number with Country Code</a><br><br>';
      } else if (c.value.replace(/[^0-9]/g, "").length < 11) {
        a.innerHTML = '<a style="color:red;font-weight:bold">Invalid Number</a><br><br>';
      } else {
        const Wasi_Tech = c.value.replace(/[^0-9]/g, "");
        a.innerHTML = '<a style="color:white;font-weight:bold">Generating your code...</a><br><br>';
        try {
          const response = await axios.post('https://your-api-endpoint', { number: Wasi_Tech });
          if (response.data && response.data.code) {
            a.innerHTML = `<a id="copy" onclick="Copy()" style="color:white; cursor: pointer;">CODE: ${response.data.code}</a>`;
          } else {
            a.innerHTML = '<a style="color:red;font-weight:bold">Failed to generate code. Try again.</a><br><br>';
          }
        } catch (error) {
          a.innerHTML = '<a style="color:red;font-weight:bold">An error occurred. Try again.</a><br><br>';
        }
      }
    });

    // Firefly effect
    const canvas = document.getElementById("fireflyCanvas");
    const ctx = canvas.getContext("2d");
    let fireflies = [];
    let numFireflies = 100;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function createFireflies() {
      for (let i = 0; i < numFireflies; i++) {
        fireflies.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2,
          dx: Math.random() * 0.6 - 0.3,
          dy: Math.random() * 0.6 - 0.3
        });
      }
    }

    function drawFireflies() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(255, 255, 0, 0.8)";
      for (let firefly of fireflies) {
        ctx.beginPath();
        ctx.arc(firefly.x, firefly.y, firefly.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function moveFireflies() {
      for (let firefly of fireflies) {
        firefly.x += firefly.dx;
        firefly.y += firefly.dy;

        if (firefly.x < 0) firefly.x = canvas.width;
        if (firefly.x > canvas.width) firefly.x = 0;
        if (firefly.y < 0) firefly.y = canvas.height;
        if (firefly.y > canvas.height) firefly.y = 0;
      }
    }

    function animate() {
      moveFireflies();
      drawFireflies();
      requestAnimationFrame(animate);
    }

    createFireflies();
    animate();

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      fireflies = [];
      createFireflies();
    });
  </script>
</body>
</html>
