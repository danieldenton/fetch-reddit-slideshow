// APP STATE
// const TIMER_SPEED
// let slideshowInterval
let interval;
// let imageIndex = -1
// const images = []

// DOM ELEMENTS
const userInput = document.getElementById("user-input").value;
const goButton = document.getElementById("go");
const submitForm = document.getElementById("submit");
const slideshow = document.getElementById("slideshow");
const stopButton = document.getElementById("stop");
const h3 = document.getElementById("h3");
const h1 = document.getElementById("h1");

function getSlideshow() {
  submitForm.addEventListener("submit", (e) => {
    stopButton.style.display = "inline";
    slideshow.style.display = "block";
    submitForm.style.display = "inline";
    h3.style.display = "none";
    h1.style.display = "none";
    const userInput = document.getElementById("user-input").value;
    e.preventDefault();
    // below  not working yet
    if (!userInput) return (userInput.placeholder = "type something in");
    fetch(`https://www.reddit.com/search.json?q=${userInput}+nsfw:no`)
      .then((fetchImages) => {
        return fetchImages.json();
      })
      // or
      // .then(response => response.json)

      .then((json) => {
        console.log(json.data);
        const dataArray = json.data.children;
        const mapArray = dataArray.map((item) => {
          return item.data.url;
        });
        // console.log(mapArray);
        const filtered = mapArray.filter((img) => {
          return img.includes("jpg") || img.includes("png");
        });
        // console.log(filtered);
        let index = 0;
        function slide() {
          slideshow.src = filtered[index];
          index++;
          if (index >= filtered.length) {
            index = 0;
          }
        }

        interval = setInterval(slide, 3000);
      });
  });
}

function stopSlideshow() {
  clearInterval(interval);
  document.getElementById("user-input").value = "";
  stopButton.style.displasy = "none";
  slideshow.style.displasy = "none";
  submitForm.style.displasy = "none";
  h3.style.display = "inline";
  h1.style.vdisplay = "inline";
}

document.addEventListener("DOMContentLoaded", () => {
  stopButton.style.visibility = "hidden";
  slideshow.style.visibility = "hidden";
  getSlideshow();
  stopButton.addEventListener("click", stopSlideshow);
});
