const weatherAPIKey = "f76693de5c51675344tdcfds32t";
const weatherAPIUrl = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}`;

const galleryImages = [
{
    src: "./assets/gallery/image1.jpg",
    alt:"Thumbnail Image 1"
},
{
    src: "./assets/gallery/image2.jpg",
    alt:"Thumbnail Image 2"
},
{
    src: "./assets/gallery/image3.jpg",
    alt:"Thumbnail Image 3"
}
]

const products =[
    {
        title: "AstroFiction",
        author: "John Doe",
        price: 49.9,
        image: "./assets/products/img6.png"
    },
    {
        title: "Space Odissey",
        author: "Marie Anne",
        price: 35,
        image: "./assets/products/img1.png"
    },
    {
        title: "Doomed City",
        author: "Jason Cobert",
        price: 0,
        image: "./assets/products/img2.png"
    },
    {
        title: "Black Dog",
        author: "John Doe",
        price: 83.35,
        image: "./assets/products/img3.png"
    },
    {
        title: "My little Robot",
        author: "Pedro Paulo",
        price: 0,
        image: "./assets/products/img5.png"
    },
    {
        title: "Garden Girl",
        author: "Ankit Patel",
        price: 45,
        image: "./assets/products/img4.png"
    },
    {
        title: "Garden Girl",
        author: "Ankit Patel",
        price: 0,
        image: "./assets/products/img4.png"
    }
]


function menuHandler(){
    document.querySelector("#open-nav-menu").addEventListener("click",function(){
        document.querySelector("header nav .wrapper").classList.add("nav-open");
    })
    document.querySelector("#close-nav-menu").addEventListener("click",function(){
        document.querySelector("header nav .wrapper").classList.remove("nav-open");
    });
}
function celsiusToFahr(temperature){
    let result = ((temperature * 9/5) + 32).toFixed(1);
    return result;
}
function greetingHandler(){
    let currentHour = new Date().getHours();
    let greetingText = document.querySelector("#greeting");
    if(currentHour < 12){
        greetingText.innerHTML = "good morning";
    }else if(currentHour < 19){
        greetingText.innerHTML = "good afternoon";
    }else if (currentHour < 24){
        greetingText.innerHTML = "good evening"; 
    } else {
        greetingText.innerHTML = "Welcome to my website!";
    }
}
function weatherHandler(){
    navigator.geolocation.getCurrentPosition(function(position){
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        let url = weatherAPIUrl.replace("{lat}",latitude).replace("{lon}",longitude).replace("{API key}",weatherAPIKey);
        fetch(url)
        .then(function(response){
            console.log(response.json())
            .then(data =>{
                const Condition = weather[0].description;
                const Location = data.name;
                const temperature = data.main.temp;
                try{
                    let calsiusText = `The weather is ${Condition} in ${Location} and it's <b>${temperature.toFixed(1)}c</b> outside.`;
                    let fahrText = `The weather is ${Condition} in ${Location} and it's <b>${celsiusToFahr(temperature.toFixed(1))}f</b> outside.`;
                    document.querySelector("p#weather").innerHTML = calsiusText; 
                
                    document.querySelector(".weather-group").addEventListener("click",function(event){
                        if(event.target.id == "celsius"){
                            document.querySelector("p#weather").innerHTML = calsiusText; 
                        }else if(event.target.id == "fahr"){
                            document.querySelector("p#weather").innerHTML = fahrText; 
                        }
                    });    
                    
                }catch(err){
                    console.log("error",err);
                    document.querySelector('p#weather').innerHTML = "Error getting the weather the temperature..-+"
                }
            });
        });
    
    })    
}
function clockHandler(){
    setInterval(function(){
        let localTime = new Date();
        document.querySelector("span[data-time=hours]").textContent = localTime.getHours().toString().padStart(2,"0");
        document.querySelector("span[data-time=minutes]").textContent = localTime.getMinutes().toString().padStart(2,"0");
        document.querySelector("span[data-time=seconds]").textContent = localTime.getSeconds().toString().padStart(2,"0");
    },1000)
}
function galleryHandler(){
    let mainImage =  document.querySelector('#gallery > img');
    let Thumbnails = document.querySelector('#gallery .thumbnails');
    mainImage.src = galleryImages[0].src;
    mainImage.alt = galleryImages[0].alt;
    galleryImages.forEach((img,index)=>{
        let thumb = document.createElement('img');
        thumb.src = img.src;
        thumb.alt = img.alt;
        thumb.dataset.arrayIndex = index;
        thumb.dataset.selected = index === 0 ? true : false;
        thumb.addEventListener('click',function(e){
            let selectedIndex = e.target.dataset.arrayIndex;
            let selectedImg = galleryImages[selectedIndex];
            mainImage.src = selectedImg.src;
            mainImage.alt = selectedImg.alt;
            Thumbnails.querySelectorAll("img").forEach(function(img){
                img.dataset.selected = false;
            }
          )
          e.target.dataset.selected = true;
        })
        Thumbnails.appendChild(thumb);
    })
}
//products Section
function populateProducts(productList){
    let productSection = document.querySelector(".products-area");
    productSection.textContent = "";
    productList.forEach((product)=>{
        let productElmt = document.createElement('div');
            productElmt.classList.add('product-item');

        let productImage = document.createElement('img');
            productImage.src = product.image;
            productImage.alt = "Image for" + product.title;

            let productDetails = document.createElement('div');
            productDetails.classList.add('product-details');

            let productTitle = document.createElement('h3');
            productTitle.classList.add('product-title');
            productTitle.textContent= product.title;
            productAurther = document.createElement('p');
            productAurther.classList.add('product-author')
            productAurther.innerText = product.author;
            priceTag = document.createElement('p');
            priceTag.classList.add('priceTitle')
            priceTag.innerText = "price";
            productPrice = document.createElement('p');
            productPrice.classList.add('product-price')
            productPrice.innerText = product.price > 0 ? "$"+product.price.toFixed(2): "Free";


            productDetails.appendChild(productTitle);
            productDetails.appendChild(productAurther);
            productDetails.appendChild(priceTag);
            productDetails.appendChild(productPrice);


            productElmt.append(productImage);
            productElmt.append(productDetails);
            productSection.append(productElmt);
    });
}
function productsHandler(){
    let freeProducts = products.filter(function(item){
        return item.price <= 0 || !item.price;
    })
    let paidProducts = products.filter(function(item){
        return item.price > 0; 
    })

    populateProducts(products);
    document.querySelector(".products-filter label[for=all] span.product-amount").textContent = products.length;
    document.querySelector(".products-filter label[for=paid] span.product-amount").textContent = paidProducts.length;
    document.querySelector(".products-filter label[for=free] span.product-amount").textContent = freeProducts.length;

    let productsFilter = document.querySelector('.products-filter');
    
    productsFilter.addEventListener('click',function(e){
        if(e.target.id === 'all'){
            populateProducts(products)
        }else if(e.target.id === 'paid'){
            populateProducts(paidProducts)
        }else if(e.target.id === 'free'){
            populateProducts(freeProducts)
        }else{
            console.log('eror')
        }
    })

}
function footerHandler(){
    let currentYear = new Date().getFullYear();
    document.querySelector("footer").textContent = `@ ${currentYear} - All rights reserved`;
}
//location

//page Load
menuHandler();
greetingHandler();
clockHandler();
galleryHandler();
productsHandler();
footerHandler();
weatherHandler();