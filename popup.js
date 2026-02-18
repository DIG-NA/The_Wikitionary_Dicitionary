document.getElementById("btn").addEventListener("click", async () => {
  const word = document.getElementById("input").value.trim();
  if (!word) return;

  const htmlString = await tryfun(word);
  // console.log(htmlString);

  document.getElementById("content").innerHTML =
    htmlString;

});


document.getElementById("input").addEventListener("keydown", async (e) => {

  if (e.key == "Enter") {
    e.preventDefault();
    e.stopPropagation();

    const input = document.getElementById("input");
    const word = input.value.trim();

    if (!word) return;

    const htmlString = await tryfun(word);

    document.getElementById("content").innerHTML =
      htmlString;


  }

})