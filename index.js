const createWeightedPalette = (items) => {
  const colorArray = [];

  for (const item of items) {
    for (let i = 0; i < item.weight; i++) {
      colorArray.push(item.value);

      console.log(colorArray);
    }
  }

  return () => {
    return colorArray[Math.floor(Math.random() * colorArray.length)];
  };
};

const colors = [
  {
    weight: 35,
    value: "white",
  },
  {
    weight: 15,
    value: "#ff292f", // red
  },
  {
    weight: 30,
    value: "#ff561f", //orange
  },
  {
    weight: 10,
    value: "#a306d1", // dark purple
  },
  {
    weight: 10,
    value: "#a306d1", // purple
  },
];

const pickColor = createWeightedPalette(colors);
const color = pickColor();

const randomRange = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1) + min);
};

const createMask = (count) => {
  for (let i = 0; i < count; i++) {
    let blob = document.createElement("div");
    blob.classList.add("blob");
    blob.style.backgroundColor = "black";
    blob.style.width = `${randomRange(200, 280)}px`;
    blob.style.height = blob.style.width;

    document.querySelector(".blobs-mask .wrapper").appendChild(blob);
  }
};

const createBlobs = (count) => {
  for (let i = 0; i < count; i++) {
    let blob = document.createElement("div");
    blob.classList.add("blob");
    blob.style.backgroundColor = pickColor();
    blob.style.width = `${randomRange(180, 320)}px`;
    blob.style.height = blob.style.width;

    document.querySelector(".blobs-bg .wrapper").appendChild(blob);
  }
};

createMask(12);
createBlobs(18);

const tlBlob = gsap.timeline();
let blobs = gsap.utils.toArray(".blob");

blobs.forEach((blob) => {
  gsap.set(blob, {x: "random(-120, 120)", y: "random(-120, 120)"});
  tlBlob.to(
    blob,
    {
      x: "random(-240, 240)",
      y: "random(-240, 240)",
      scale: "random(0.75, 1.5)",
      ease: Sine.easeInOut,
      duration: "random(2, 6)",
      repeat: -1,
      yoyo: true,
      yoyoEase: true,
      repeatRefresh: true,
    },
    0
  );
});

let pointerRatio = 0;

window.addEventListener("mousemove", function (event) {
  let xDistance = Math.abs(event.clientX - window.innerWidth / 2);
  pointerRatio = xDistance / (window.innerWidth / 2);
  pointerRatio = Math.min(pointerRatio, 1);
  // pointerRatio = 1 - xDistance / (window.innerWidth / 2);
  // pointerRatio = Math.max(pointerRatio, 0);
  let maxSpeed = 3;
  let minSpeed = 0.01;
  let speed = pointerRatio * maxSpeed + minSpeed;

  tlBlob.timeScale(speed).resume();
});
