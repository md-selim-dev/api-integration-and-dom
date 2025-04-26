


const loadCategory = async () => {
   const res = await fetch("https://openapi.programming-hero.com/api/news/categories");
   const data = await res.json();
   const categories = data.data.news_category
   showNewsCategoryList(categories)
}

const showNewsCategoryList = (categories) => {
   const categoriesContainer = document.getElementById('all-category-section')
   categories.forEach(item => {
      const category = document.createElement('a');
      category.classList = `all-category-section-a all-category-a`
      category.innerHTML = `<p onclick="showNewsCategoryCard('${item.category_id}')">${item.category_name}</p>`;
      categoriesContainer.appendChild(category);
   });
};

const showNewsCategoryCard = async(id) => {
   const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`);
   const data =await res.json();
   const cardCategory = data.data
   console.log(cardCategory);

   const newsCardSection = document.getElementById("news-card-section");

   newsCardSection.textContent = '';

   cardCategory.forEach(card => {
      console.log(card);
      const newsCard = document.createElement('div');
      newsCard.classList= `news-card`;
      newsCard.innerHTML = `
      
          <!-- news card -->
        <div class="news-card-left">
          <img src="${card.thumbnail_url
          }" alt="">
        </div>

        <div class="news-card-right">
          <h2>${card.title}</h2>
          <p>
            ${card.details.slice(0,500)}...
          </p>

          <div class="card-bellow-section">
            <!-- author corner-->
            <div class="author-corner">
              <div><img class="author-image" src="${card?.author?.img}"></div>
              <div class="author-date">
                <h4>${card?.author?.name?card?.author?.name:"Me"}</h4>
                <p>${card?.author?.published_date} </p>
              </div>
            </div>
            <!-- view count -->
            <div class="view-count">
              <img src="images/carbon_view.svg" alt="">
              <span>${card?.total_view}</span>
            </div>
            <!-- details arrow -->
            <div class="details-arrow">
              <img src="images/Vector.png" alt="">
            </div>
          </div>
        </div>

      `;
      newsCardSection.appendChild(newsCard)

   });


}

const showNewsCardBySearch = ()=>{
   const input = document.getElementById('input-text');
   const inputText = input.value;
   const isNumber = parseInt(inputText)
   if(inputText){
      showNewsCategoryCard(inputText)
      input.value = "";
   }else{
      alert("Enter a Number Value Like, 01")
      showNewsCategoryCard('01')
      input.value = "";
   }
}

showNewsCategoryCard("01")

loadCategory()