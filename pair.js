<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pair Code</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
  <style>
    body {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
      background: black;
      overflow: hidden;
      font-family: Arial, sans-serif;
      color: #0f0;
    }

    canvas {
      position: absolute;
      top: 0;
      left: 0;
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
      position: relative;
      text-align: center;
      background-color: rgba(0, 0, 0, 0.8);
      border-radius: 10px;
      box-shadow: 0 0 20px rgba(0, 255, 0, 0.7);
    }

    #text {
      color: #0f0;
    }

    .input-container input {
      color: #0f0;
    }

    .input-container {
      display: flex;
      background: rgb(10, 10, 10);
      border-radius: 1rem;
      padding: 0.3rem;
      gap: 0.3rem;
      max-width: 300px;
      width: 100%;
    }

    .input-container input {
      border-radius: 0.8rem 0 0 0.8rem;
      background: black;
      box-shadow: inset 13px 13px 10px #000000, inset -13px -13px 10px #0f0f0f;
      width: 100%;
      flex-basis: 75%;
      padding: 1rem;
      border: none;
      color: #0f0;
      transition: all 0.2s ease-in-out;
    }

    .input-container input:focus {
      border-left: 2px solid #0f0;
      outline: none;
      box-shadow: inset 13px 13px 10px #0a0a0a, inset -13px -13px 10px #0f0f0f;
    }

    .input-container button {
      flex-basis: 25%;
      padding: 1rem;
      background: black;
      font-weight: 700;
      text-transform: uppercase;
      color: #0f0;
      border: 2px solid #0f0;
      border-radius: 0 1rem 1rem 0;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
    }

    .input-container button:hover {
      background-color: #0f0;
      color: black;
    }

    @media (max-width: 500px) {
      .input-container {
        flex-direction: column;
      }

      .input-container input {
        border-radius: 0.8rem;
      }

      .input-container button {
        padding: 0.4rem;
        border-radius: 0.8rem;
      }
    }

    .centered-text {
      text-align: center;
    }

    @media (max-width: 500px) {
      .box {
        width: 90%; 
      }
    }

    @media (max-width: 500px) {
      .input-container input {
        border-radius: 0.8rem;
        width: 80%; 
      }

      .input-container button {
        padding: 1rem;
        border-radius: 0.9rem;
        width: 100%; 
      }
    }
  </style>
</head>
<body>
  <canvas id="matrixCanvas"></canvas>
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
              <input placeholder="234906652xxx" type="number" id="number" name="">
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
  <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.0.0-alpha.1/axios.min.js"></script>
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
        obj.style = "color:#0f0;font-weight-bold";
        obj.size = "5";
      }, 500);
    }

    b.addEventListener("click", async (e) => {
      e.preventDefault();
      if (!c.value) {
        a.innerHTML = '<a style="color:#0f0;font-weight:bold">Enter your WhatsApp number with Country Code</a><br><br>';
      } else if (c.value.replace(/[^0-9]/g, "").length < 11) {
        a.innerHTML = '<a style="color:red;font-weight:bold">Invalid Number</a><br><br>';
      } else {
        const Wasi_Tech = c.value.replace(/[^0-9]/g, "");
        a.innerHTML = '<a style="color:#0f0;font-weight:bold">Generating your code...</a><br><br>';
        try {
          const response = await axios.post('https://your-api-endpoint', { number: Wasi_Tech });
          if (response.data && response.data.code) {
            a.innerHTML = `<a id="copy" onclick="Copy()" style="color:#0f0; cursor: pointer;">CODE: ${response.data.code}</a>`;
          } else {
            a.innerHTML = '<a style="color:red;font-weight:bold">Failed to generate code. Try again.</a><br><br>';
          }
        } catch (error) {
          a.innerHTML = '<a style="color:red;font-weight:bold">An error occurred. Try again.</a><br><br>';
        }
      }
    });

    const canvas = document.getElementById("matrixCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = Array(256).join(1).split('');
    const fontSize = 16;
    const columns = canvas.width / fontSize;

    function drawMatrix() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0f0';
      ctx.font = fontSize + 'px monospace';

      letters.forEach((y, index) => {
        const text = String.fromCharCode(65 + Math.random() * 33);
        const x = index * fontSize;
        ctx.fillText(text, x, y);
        if (y > canvas.height && Math.random() > 0.975) {
          letters[index] = 0;
        }
        letters[index] = y + fontSize;
      });
    }

    setInterval(drawMatrix, 50);

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  </script>
</body>
</html>
