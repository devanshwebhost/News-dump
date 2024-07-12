import './App.css';
import React, { useEffect } from 'react';

function App() {
  const apiKey = process.env.REACT_APP_NEWS_API_KEY; // Use environment variable

  async function rendomNews() {
    try {
      const Url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}`;
      const response = await fetch(Url);
      const data = await response.json();
      return data.articles;
    } catch (error) {
      console.log("error");
      return [];
    }
  }

  async function queryNews(query) {
    try {
      const Url = `https://newsapi.org/v2/everything?q=${query}&from=2024-06-11&pageSize=20&sortBy=publishedAt&apiKey=${apiKey}`;
      const response = await fetch(Url);
      const data = await response.json();
      const updateText = document.getElementById("updateText");
      if (data.articles.length > 0) {
        updateText.innerHTML = `Showing the results of "${query}"`;
        return data.articles;
      } else {
        updateText.innerHTML = `No results found for "${query}"`;
        window.location.reload();
        return [];
      }
    } catch (error) {
      console.log("error");
      return [];
    }
  }

  function articleTitle(str, maxLength) {
    if (!str) return '';
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + '...';
    }
    return str;
  }

  function articlePera(str, maxLength) {
    if (!str) return '';
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + '...';
    }
    return str;
  }

  function displayBlogs(articles) {
    const blogContainer = document.querySelector(".blogContainer");
    blogContainer.innerHTML = "";
    articles.forEach((article) => {
      if (article.urlToImage) {
        const aTag = document.createElement("a");
        aTag.href = article.url;
        aTag.target = "_blank";
        aTag.classList.add("aTag");

        const blogCard = document.createElement("div");
        blogCard.classList.add("card");

        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = "Image not found";

        const title = document.createElement("h2");
        title.innerText = articleTitle(article.title, 50);

        const description = document.createElement("p");
        description.innerText = articlePera(article.description, 200);

        aTag.appendChild(img);
        aTag.appendChild(title);
        aTag.appendChild(description);
        blogCard.appendChild(aTag);
        blogContainer.appendChild(blogCard);
      }
    });
  }

  useEffect(() => {
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");

    const handleSearch = async () => {
      const query = searchInput.value;
      if (query !== "") {
        const articles = await queryNews(query);
        displayBlogs(articles);
      } else {
        console.error("Error to receive query");
      }
    };
    searchButton.addEventListener('click', handleSearch);

    (async () => {
      try {
        const articles = await rendomNews();
        displayBlogs(articles);
      } catch (error) {
        console.error("Error fetching random news");
      }
    })();

    return () => {
      searchButton.removeEventListener('click', handleSearch);
    };
  }, []);

  return (
    <div className='main'>
      <nav>
        <div className='navbar'>
          <div className='logo'>
            <a href='#index.html'>News Dump</a>
          </div>
          <div className='search-area'>
            <input type='text' id='search-input' placeholder='Search the news...' />
            <button id='search-button'>Search</button>
          </div>
        </div>
        <h1 id='updateText'>Browse The Latest News...</h1>
      </nav>
      <main>
        <div className='blogContainer'></div>
      </main>
    </div>
  );
}

export default App;
