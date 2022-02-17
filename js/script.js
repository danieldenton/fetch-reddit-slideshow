let interval;
const userInput = document.getElementById("user-input").value;
const goButton = document.getElementById("go");
const submitForm = document.getElementById("submit");

const slideshow = document.getElementById("slideshow");
const stopButton = document.getElementById("stop");

function getSlideshow() {
  submitForm.addEventListener("submit", (e) => {
    stopButton.style.visibility = "visible";
    slideshow.style.visibility = "visible";
    document.getElementById("submit").style.visibility = "hidden";
    document.getElementById("h3").style.visibility = "hidden";
    document.getElementById("h1").style.visibility = "hidden";
    const userInput = document.getElementById("user-input").value;
    e.preventDefault();
    fetch(`https://www.reddit.com/search.json?q=${userInput}+nsfw:no`)
      .then((fetchImages) => {
        return fetchImages.json();
      })

      .then((json) => {
        console.log(json.data);
        const dataArray = json.data.children;
        const mapArray = dataArray.map((item) => {
          return item.data.url;
        });
        // console.log(mapArray);
        const filtered = mapArray.filter((img) => {
          return img.includes("jpg");
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
  stopButton.style.visibility = "hidden";
  slideshow.style.visibility = "hidden";
  document.getElementById("submit").style.visibility = "visible";
  document.getElementById("h3").style.visibility = "visible";
  document.getElementById("h1").style.visibility = "visible";
}

document.addEventListener("DOMContentLoaded", () => {
  stopButton.style.visibility = "hidden";
  slideshow.style.visibility = "hidden";
  getSlideshow();
  stopButton.addEventListener("click", stopSlideshow);
});
