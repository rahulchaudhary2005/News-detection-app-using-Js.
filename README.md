# News-detection-app-using-Js.
A lightweight JavaScript web app that fetches real-time news from APIs and analyzes articles to identify trending and relevant news with a clean, interactive UI.

HTML

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Latest News by Location</title>
   <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Latest News by Location</h1>
    <input type="text" id="locationInput" placeholder="Enter a location (e.g., USA, India)">
    <button id="searchButton" onclick="fetchNews()">Get News</button>
    <div class="news-container" id="newsContainer"></div>
    
    <script src="index2.js"></script>

</body>
</html>

CSS


body {
    font-family: Arial, sans-serif;
    background-color: #000000;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    gap: 10px;
}
h1 {
    color: #f2d150;
    font-weight: 900;
    text-shadow: 1px 1px 300px rgb(50, 195, 208);
    
    border: 2px solid rgb(29, 108, 104);
    border-radius: 5px;
    box-shadow: inset 10px 10px 50px rgb(50, 195, 208); ;
    box-shadow: 1px 10px 50px   #5b84b9;

}
.news-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    width: 100%;
    max-width: 1200px;
    background-color: #000000;
}
.news-card {
    background-color: #281919;
    border: 1px solid #5b5d49;
    
    border-radius: 8px;
    color: rgb(76, 105, 123);
    padding: 15px;
    box-shadow: 0px 0px 100px 20px rgba(44, 161, 188, 0.905);
}
.news-card img {
    width: 100%;
    border-radius: 6px;
}
.news-card h3 {
    margin: 10px 0;
    color: #f27272;
}
.news-card a {
    text-decoration: none;
    color: #4573df;
    font-weight: bold;
}
#locationInput {
    padding: 10px;
    width: 350px;
    margin-bottom: 20px;
    box-shadow: 5px 5px 50px rgb(75, 163, 198);
    border-radius: 10px solid black;
    color: rgb(8, 5, 75);
    font-size: 1.3rem;
    background-color: #32424695;
    color: aqua;
}
#searchButton {
    padding: 10px 20px;
    background-color: #1a73e8;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
p{
    color: #fff;
}


Java script


        async function fetchNews() {
            const location = document.getElementById('locationInput').value;
            if (!location) {
                alert("Please enter a location.");
                return;
            }

            const API_URL = `https://newsapi.org/v2/everything?q=${encodeURIComponent(location)}&sortBy=publishedAt&apiKey=f35484a5f36f4a9b8f6a8bfe6cc80e54`;

            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                const articles = data.articles;

                const newsContainer = document.getElementById('newsContainer');
                newsContainer.innerHTML = '';

                articles.forEach(article => {
                    const newsCard = document.createElement('div');
                    newsCard.className = 'news-card';

                    newsCard.innerHTML = `
                        <img src="${article.urlToImage || 'https://via.placeholder.com/300'}" alt="News Image">
                        <h3>${article.title}</h3>
                        <p>${article.description || 'Description not available.'}</p>
                        <a href="${article.url}" target="_blank">Read more</a>
                    `;
                    
                    newsContainer.appendChild(newsCard);
                });
            } catch (error) {
                console.error('Error fetching news:', error);
                document.getElementById('newsContainer').innerHTML = '<p>Failed to load news. Please try again later.</p>';
            }
        }
