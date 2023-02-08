const btn = document.querySelector("button");
const h1 = document.querySelector("h1");


const data = `<iframe src="https://www.youtube.com/embed/xm3YgoEiEDc?rel=0&modestbranding=1&autohide=1&mute=1&showinfo=0&controls=0&autoplay=1"  width="560" height="315"  frameborder="0" allowfullscreen></iframe>
`
console.log("something");

const getDataAndShow = () => {
    h1.innerHTML = data;
    console.log("something");
}
