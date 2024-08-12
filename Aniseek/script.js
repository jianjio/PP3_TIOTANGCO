async function search() {
  const query = document.getElementById("search_query").value;
  const requestUrl = `https://api.jikan.moe/v4/anime?q=${query}&sfw`;
  const startTime = new Date().getTime();

  try {
    const response = await fetch(requestUrl);
    const data = await response.json();

    let timeTaken = new Date().getTime() - startTime;

    const node = document.getElementById("search_results");
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }

    const maxResults = 28;
    let i = 1;

    for (const item of data.data) {
      if (i > maxResults) break;

      document.getElementById("search_results").insertAdjacentHTML(
        "beforeend",
        `
        <a target="_blank" href="${item.url}" class="card">
            <div class="card__image">
                <img loading="lazy" src="${item.images.jpg.large_image_url}" alt="${item.title}" />
            </div>
            <div class="card__name">
                <span>${item.title}</span> 
            </div>
        </a>
        `
      );

      i++;
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

document.getElementById("search").onclick = () => search();
document.getElementById("search_query").onkeydown = (event) => {
  if (event.keyCode === 13) {
    search();
  }
};
