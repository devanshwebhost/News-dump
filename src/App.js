
import './App.css';
import React, { useEffect } from 'react';

 function App() {
  let apiKey = "5b59351e6d6d4d92a84f154692c9e4a6";
  async function rendomNews(){
    try{
  const Url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}`
  const response = await fetch(Url);
  const data = await response.json();
  console.log(data)
  return data.articles;
    }catch(error){
      console.log("error")
      return[];
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
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + '...';
    }
    return str;
  }

  function articlePera(str, maxLength) {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + '...';
    }
    return str;
  }
  
  function displayBlogs(articles){
    const blogContainer = document.querySelector(".blogContainer");
    blogContainer.innerHTML = "";
    articles.forEach((articles) =>{

  if (!articles.urlToImage == "") {
    const aTag = document.createElement("a")
    aTag.href = articles.url;
    aTag.target = "_blank";
    aTag.classList.add("aTag");
        const blogCard = document.createElement("div");
        blogCard.classList.add("card");
        const img = document.createElement("img");
        img.src = articles.urlToImage;
        img.alt = "The images is not founded......";
        const title = document.createElement("h2");
        title.innerText = articleTitle(articles.title, 50);
        const description = document.createElement("p");
        description.innerText = articlePera(articles.description, 200);
    
    aTag.appendChild(img);
    aTag.appendChild(title);
    aTag.appendChild(description);
    blogCard.appendChild(aTag);
    blogContainer.appendChild(blogCard);
  }
    })
  }
  useEffect(() =>{
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");
  
    const handlesearch =async() =>{
      const query = searchInput.value;
      if (query !== "") {
        const articles = await queryNews(query);
        displayBlogs(articles);
      } else {
        console.error("Error to receive query")
      }
    };
    searchButton.addEventListener('click', handlesearch);
  
  (async () => {
    try{
     const articles = await rendomNews();
     displayBlogs(articles);
    } catch (error){
        console.error("Error fetching random news")
      }
    })();
    return ()=>{
      searchButton.removeEventListener('click', handlesearch);
    }
  },[]);

  return (
    <div className='main'>
    <nav>
      <div className='navbar'>
        <div className='logo'>
          <a href='#index.html'>News Dump</a>
        </div>
        <div className='search-area'>
          <input type='text' id='search-input' placeholder='Search the news...'/>
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
