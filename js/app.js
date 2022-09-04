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
        categoryDiv.classList.add('d-sm-block', 'd-lg-inline');
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
    const noNewsFound = document.getElementById('no-found-message');
    newsContainer.innerHTML='';
    noNewsFound.innerHTML='';
    if(category1.length === 0){
        const noData =document.createElement('h1');
        noData.classList.add('text-center','text-warning','mt-5','pt-5')
        noData.innerText = 'No Data Has Been Found Here';
        noNewsFound.appendChild(noData);
    }
    else{
        category1.forEach(news => {
            const newsId = news._id;
            const newsDiv = document.createElement('div');
            newsDiv.innerHTML=`
            <div class="card h-100 shadow">
                <img src="${news.thumbnail_url}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${news.title}</h5>
                    <p class="card-text">${news.details.slice(0, 150)+'...'}</p>
                    <div class="d-flex">
                    <img style="height:50px; width:50px;" src="${news.author.img}" class="img-fluid me-2">
                    <p class="fw-bold me-3 text-danger">${news.author.name ? news.author.name:'No Data Found'}</p>
                    <p class="fw-semibold me-3">${news.total_view ? news.total_view: 'No Data Found'}</p>
                    <button onclick="loadNewsDetails('${newsId}')" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#newsDetailModal">Details</button>
                    </div>
                 </div>
            </div>
            `;
            newsContainer.appendChild(newsDiv);
        }); 
    }
    document.getElementById('item-number').innerText = category1.length;
    
      
}

const loadNewsDetails =(news_id)=>{
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayNewsDetails(data.data[0]))
}
const displayNewsDetails=data=>{
    const modalTitle = document.getElementById('newsDetailModalLabel');
    modalTitle.innerHTML = data.title;
    const newsDetails = document.getElementById('news-details');
    newsDetails.innerHTML = `
        <img src="${data.image_url}" class="img-fluid">
        <p><span class="fs-5 fw-bold">Details:</span> ${data.details}</p>
        <p><span class="fs-5 fw-bold">Rating Badge:</span> ${data.rating.badge}</p>
        <p><span class="fs-5 fw-bold">Rating:</span> ${data.rating.number}</p>
        <p><span class="fs-5 fw-bold">Total Views:</span> ${data.total_view}</p>
        <p><span class="fs-5 fw-bold">Is Todays Pick:</span> ${data.others_info.is_todays_pick}</p>
        <p><span class="fs-5 fw-bold">Is Trending:</span> ${data.others_info.is_trending}</p>
    `;
}


// loadNewsDetails();
// displayPerCategory();
loadCategory();
