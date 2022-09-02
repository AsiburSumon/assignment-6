const loadCategory =()=>{
    const url = `https://openapi.programming-hero.com/api/news/categories`
    fetch(url)
    .then(res=> res.json())
    .then(data=>displayCategory(data.data.news_category))
}

const displayCategory=categories=>{
    const allCategroy = document.getElementById('all-category');
    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('row','d-flex');
        categoryDiv.innerHTML=`
        <a class="mx-3 text-decoration-none text-secondary">${category.category_name}</a>
        `;
        allCategroy.appendChild(categoryDiv);
    });
}

loadCategory();