const loadCategory =()=>{
    const url = `https://openapi.programming-hero.com/api/news/categories`
    fetch(url)
    .then(res=> res.json())
    .then(data=>displayCategory(data.data.news_category))
}

const displayCategory=categories=>{
    const allCategroy = document.getElementById('all-category');
    allCategroy.innerHTML='';
    categories.forEach(category => {
        const id = category.category_id;
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('row','d-flex');
        categoryDiv.innerHTML=`
        <a style="cursor: grab" onclick="loadPerCategory(${id})" class="mx-3 text-decoration-none text-secondary">${category.category_name}</a>
        `;
        allCategroy.appendChild(categoryDiv);
    });
}
const loadPerCategory= (category_id) =>{
    const url = `https://openapi.programming-hero.com/api/news/category/0${category_id}`
    fetch(url)
    .then(res => res.json())
    .then(data=> displayPerCategory(data.data))
}
const displayPerCategory=category1=>{
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML='';
    category1.forEach(news => {
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('card');
        newsDiv.innerHTML=`
        <div class="card h-100 shadow">
            <img src="${news.thumbnail_url}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${news.title}</h5>
                <p class="card-text">${news.details.slice(0, 150)+'...'}</p>
                <div class="d-flex">
                <img style="height:50px; width:50px;" src="${news.author.img}" class="img-fluid me-2">
                <p class="fw-bold me-3">${news.author.name}</p>
                <p class="fw-bold me-3">${news.total_view}</p>
                <button class="btn btn-danger px-3">Details</button>
                </div>
                
             </div>
        </div>
        `;
        newsContainer.appendChild(newsDiv);
    });   
}

// perCategory();
loadCategory();
