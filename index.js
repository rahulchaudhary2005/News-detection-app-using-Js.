
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
