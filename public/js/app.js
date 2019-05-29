const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();

  const location = search.value;
  messageOne.textContent = "loading";
  fetch(`http://localhost:3000/weather?address=${location}`).then(res => {
    return res.json().then(data => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        console.log(data);
        messageOne.textContent = data.address;
        messageTwo.textContent = data.forecast;
      }
    });
  });
});
