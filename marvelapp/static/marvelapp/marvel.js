document.addEventListener('DOMContentLoaded', function() {

    //load home page by default
     home()

    sbtn = document.querySelector('#button-addon2')
    sbar = document.querySelector('#charname')
    homebtn = document.querySelector('#home')
    navfavbtn = document.querySelector('#navfavbtn')
    

    document.addEventListener('keydown', function(event){
        if(event.keyCode === 13 && sbar === document.activeElement){
            search();
        }
    })

    sbtn.addEventListener("click", () => {
        search();
    })

    document.body.addEventListener('click', () =>{
        sbar.value = '';
        document.querySelector('#dynamiclist').innerHTML = '';
        document.querySelector('#dynamic_cntr').style.display = "none";
    })

    
    sbar.addEventListener("keyup", async () => { 
        let catlist = document.querySelector('#categorylist')
       // console.log(catlist.value)
        if(sbar.value.length > 0 && sbar === document.activeElement){

            //load start
            const loader = document.querySelector('#searchloading')
            loader.classList.add('display')
            document.querySelector('#dynamic_cntr').style.display = "block";
         
            if(catlist.value === 'all'){
                //characters
                let url = `https://gateway.marvel.com:443/v1/public/characters?ts=1695035480130&limit=9&apikey=dbaf9e59f058845c07d6e792b93bd5e5&hash=08ba6b3cd9d97b7467888a83910655fb&nameStartsWith=${sbar.value}`
                let response = await fetch(url);
                let marvelcharacters = await response.json();
                let htmltitle = `<h4 class="search-title">Top 10 In Characters</h4>`
                let html = ''
                marvelcharacters.data["results"].forEach(element =>{
                    html +=`
                
                    <li >
                    <div class="card cardstyle" data-categ="character" data-titlename="${element.name}" onclick="search(this)">
                        <div class="card-body" style="margin:1%;">
                        ${element.name}
                        </div>
                        <img src="${element.thumbnail.path}.${element.thumbnail.extension}" class="float-right img-thumbnail rounded-circle shadow-4-strong" alt="${element.name}" style="max-width:5rem;max-height:5rem;">
                        </div>
                    </li>
                    
                   `
                })
                //comics
                let url1 = `https://gateway.marvel.com:443/v1/public/comics?ts=1695035480130&limit=9&apikey=dbaf9e59f058845c07d6e792b93bd5e5&hash=08ba6b3cd9d97b7467888a83910655fb&titleStartsWith=${sbar.value}`
                let response1 = await fetch(url1);
                let marvelcomics = await response1.json();
                let htmltitle1 = `<h4 class="search-title">Top 10 In Comics</h4>`
                let html1 = ''
                marvelcomics.data["results"].forEach(element =>{
                    html1 +=`
                
                    <li >
                    <div class="card cardstyle" data-categ="comic" data-id="${element.id}" data-titlename="${element.title}" onclick="search(this)">
                        <div class="card-body" style="margin:1%;">
                        ${element.title}
                        </div>
                        <img src="${element.thumbnail.path}.${element.thumbnail.extension}" class="float-right img-thumbnail rounded-circle shadow-4-strong" alt="${element.name}" style="max-width:5rem;max-height:5rem;">
                        </div>
                    </li>
                    
                   `
                })
                //series
                let url2 = `https://gateway.marvel.com:443/v1/public/series?ts=1695035480130&limit=9&apikey=dbaf9e59f058845c07d6e792b93bd5e5&hash=08ba6b3cd9d97b7467888a83910655fb&titleStartsWith=${sbar.value}`
                let response2 = await fetch(url2);
                let marvelseries = await response2.json();
                let htmltitle2 = `<h4 class="search-title">Top 10 In Series</h4>`
                let html2 = ''
                marvelseries.data["results"].forEach(element =>{
                    html2 +=`
                
                    <li >
                    <div class="card cardstyle" data-categ="series" data-id="${element.id}" data-titlename="${element.title}" onclick="search(this)">
                        <div class="card-body" style="margin:1%;">
                        ${element.title}
                        </div>
                        <img src="${element.thumbnail.path}.${element.thumbnail.extension}" class="float-right img-thumbnail rounded-circle shadow-4-strong" alt="${element.title}" style="max-width:5rem;max-height:5rem;">
                        </div>
                    </li>
                    
                   `
                })
                //events
                let url3 = `https://gateway.marvel.com:443/v1/public/events?ts=1695035480130&limit=9&apikey=dbaf9e59f058845c07d6e792b93bd5e5&hash=08ba6b3cd9d97b7467888a83910655fb&nameStartsWith=${sbar.value}`
                let response3 = await fetch(url3);
                let marvelevents = await response3.json();
                let htmltitle3 = `<h4 class="search-title">Top 10 In Events</h4>`
                let html3 = ''
                //console.log(marvelevents)
                marvelevents.data["results"].forEach(element =>{
                    //console.log(element)
                    //console.log(element.name)
                    
                    html3 +=`
                    
                    <li >
                    <div class="card cardstyle" data-categ="events" data-id="${element.id}" data-titlename="${element.title}" onclick="search(this)">
                        <div class="card-body" style="margin:1%;">
                        ${element.title}
                        </div>
                        <img src="${element.thumbnail.path}.${element.thumbnail.extension}" class="float-right img-thumbnail rounded-circle shadow-4-strong" alt="${element.title}" style="max-width:5rem;max-height:5rem;">
                        </div>
                    </li>
                    
                   `
           })

         
       if(html.length === 0){
            htmltitle =  '<p style="font-weight: bolder;color:white;margin-top:15%;margin-left:40%;">No Result Found In Charaters</p>'
        }
        if(html1.length === 0)
        {
            htmltitle1 =  '<p style="font-weight: bolder;color:white;margin-top:15%;margin-left:40%;">No Result Found In Comics</p>'
        }
        if(html2.length === 0)
        {
            htmltitle2 =  '<p style="font-weight: bolder;color:white;margin-top:15%;margin-left:40%;">No Result Found In Series</p>'
        }
        if(html3.length === 0)
        {
            htmltitle3 =  '<p style="font-weight: bolder;color:white;margin-top:15%;margin-left:40%;">No Result Found In Events</p>'
        }
       
            let dynlist = document.querySelector('#dynamiclist') 
            dynlist.innerHTML = htmltitle+html+htmltitle1+html1+htmltitle2+html2+htmltitle3+html3


            //load end 
            loader.classList.remove('display')
        }
   
            else if(catlist.value === 'character'){
            let url = `https://gateway.marvel.com:443/v1/public/characters?ts=1695035480130&apikey=dbaf9e59f058845c07d6e792b93bd5e5&hash=08ba6b3cd9d97b7467888a83910655fb&nameStartsWith=${sbar.value}`
            let response = await fetch(url);
            let marvelnames = await response.json();
            let html = '';
            
            marvelnames.data["results"].forEach(element =>{
                //console.log(element)
                //console.log(element.name)
                
                html +=`
                
                <li >
                <div class="card cardstyle" data-categ="character" data-titlename="${element.name}" onclick="search(this)">
                    <div class="card-body" style="margin:1%;">
                    ${element.name}
                    </div>
                    <img src="${element.thumbnail.path}.${element.thumbnail.extension}" class="float-right img-thumbnail rounded-circle shadow-4-strong" alt="${element.name}" style="max-width:5rem;max-height:5rem;">
                    </div>
                </li>
                
               `
            });
            if(html.length === 0){
                html =  '<p style="font-weight: bolder;color:white;margin-top:15%;margin-left:40%;">no result found</p>'
            }
                let dynlist = document.querySelector('#dynamiclist') 
                dynlist.innerHTML = html

                //load end 
                loader.classList.remove('display')
            }
            else if (catlist.value === 'comic'){
                let url = `https://gateway.marvel.com:443/v1/public/comics?ts=1695035480130&apikey=dbaf9e59f058845c07d6e792b93bd5e5&hash=08ba6b3cd9d97b7467888a83910655fb&titleStartsWith=${sbar.value}`
                let response = await fetch(url);
                let marvelcomics = await response.json();
                let html = '';
                //console.log(marvelcomics)
                marvelcomics.data["results"].forEach(element =>{
                    //console.log(element)
                    //console.log(element.name)
                    
                    html +=`
                    
                    <li >
                    <div class="card cardstyle" data-categ="comic" data-id="${element.id}" data-titlename="${element.title}" onclick="search(this)">
                        <div class="card-body" style="margin:1%;">
                        ${element.title}
                        </div>
                        <img src="${element.thumbnail.path}.${element.thumbnail.extension}" class="float-right img-thumbnail rounded-circle shadow-4-strong" alt="${element.name}" style="max-width:5rem;max-height:5rem;">
                        </div>
                    </li>
                    
                   `
                });
                //console.log(catlist.value)
                if(html.length === 0){
                    html =  '<p style="font-weight: bolder;color:white;margin-top:15%;margin-left:40%;">no result found</p>'
                }
                let dynlist = document.querySelector('#dynamiclist') 
                dynlist.innerHTML = html
            }
            else if(catlist.value === 'series'){
                let url = `https://gateway.marvel.com:443/v1/public/series?ts=1695035480130&apikey=dbaf9e59f058845c07d6e792b93bd5e5&hash=08ba6b3cd9d97b7467888a83910655fb&titleStartsWith=${sbar.value}`
                let response = await fetch(url);
                let marvelnames = await response.json();
                let html = '';
                
                marvelnames.data["results"].forEach(element =>{
                    //console.log(element)
                    //console.log(element.name)
                    
                    html +=`
                    
                    <li >
                    <div class="card cardstyle" data-categ="series" data-id="${element.id}" data-titlename="${element.title}" onclick="search(this)">
                        <div class="card-body" style="margin:1%;">
                        ${element.title}
                        </div>
                        <img src="${element.thumbnail.path}.${element.thumbnail.extension}" class="float-right img-thumbnail rounded-circle shadow-4-strong" alt="${element.title}" style="max-width:5rem;max-height:5rem;">
                        </div>
                    </li>
                    
                   `
                });
                //console.log(catlist.value)
                if(html.length === 0){
                    html =  '<p style="font-weight: bolder;color:white;margin-top:15%;margin-left:40%;">no result found</p>'
                }
                let dynlist = document.querySelector('#dynamiclist') 
                dynlist.innerHTML = html

                //load end 
                loader.classList.remove('display')
            }
            else if(catlist.value === 'events'){
                let url = `https://gateway.marvel.com:443/v1/public/events?ts=1695035480130&apikey=dbaf9e59f058845c07d6e792b93bd5e5&hash=08ba6b3cd9d97b7467888a83910655fb&nameStartsWith=${sbar.value}`
                let response = await fetch(url);
                let marvelevents = await response.json();
                let html = '';
                //console.log(marvelevents)
                marvelevents.data["results"].forEach(element =>{
                    //console.log(element)
                    //console.log(element.name)
                    
                    html +=`
                    
                    <li >
                    <div class="card cardstyle" data-categ="events" data-id="${element.id}" data-titlename="${element.title}" onclick="search(this)">
                        <div class="card-body" style="margin:1%;">
                        ${element.title}
                        </div>
                        <img src="${element.thumbnail.path}.${element.thumbnail.extension}" class="float-right img-thumbnail rounded-circle shadow-4-strong" alt="${element.title}" style="max-width:5rem;max-height:5rem;">
                        </div>
                    </li>
                    
                   `
                });
               // console.log(catlist.value)
                if(html.length === 0){
                    html =  '<p style="font-weight: bolder;color:white;margin-top:15%;margin-left:40%;">no result found</p>'
                }
                  
                let dynlist = document.querySelector('#dynamiclist') 
                dynlist.innerHTML = html

                //load end 
                loader.classList.remove('display')
            }

        

        }
        else{
            document.querySelector('#dynamiclist').innerHTML = ''
            document.querySelector('#dynamic_cntr').style.display = "none";
        }
    })


 
  
    
 document.querySelectorAll('.navbtn').forEach(btn =>{
    btn.onclick = () =>{
        if (btn.value === 'Fav.Page'){
            favpage(btn)
        }
        else if (btn.value === 'Home'){
            home()
        }
        }
    
 })

 // Get the button:
let topbutton = document.getElementById("topbtn");
 // When the user scrolls down 20px from the top of the document, show the button
window.onscroll = () =>{
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        topbutton.style.display = "block";
      } else {
        topbutton.style.display = "none";
      }
    }

})

let csrftoken = Cookies.get('csrftoken') 


//displaying the home page 
function home() {

    document.querySelector('#dynamic_cntr').style.display = "none";
    document.querySelector('#dynamiclist').innerHTML = ''
    document.querySelector('#searchpage').innerHTML=''
    document.querySelector('#favbtnspace').innerHTML = ''
    document.querySelector('#favpage').innerHTML = ''
    document.querySelector('#favalert').innerHTML = ''
    document.querySelector('#favalert').style.display =  "none";
    document.querySelector('#allinfo').innerHTML =''
    document.querySelector('#page').innerHTML =  ''
    document.querySelector('#charname').value = ''
    document.querySelector('#charname').placeholder = 'Type'
    document.querySelector('#favmenu').innerHTML =''
    document.querySelector('#maintitle').innerHTML = 'The Marvel Gallery'

    let current_user = document.querySelector('#currentuser').value

    //load start
    const loader = document.querySelector('#loading')
    loader.classList.add('display')
    const searchbar = document.querySelector('#searchelement')
    searchbar.style.display =  "none";
    const navfavbtn = document.querySelector('#navfavbtn')
    navfavbtn.disabled = true;

    fetch(`/marvelchars`)
    .then(response => response.json())
    .then(chars => {
        //console.log(chars)
        chars.forEach(element => {
            //console.log(element)

             //create the ul element
             const div = document.createElement('div')
             //fill up the div class
             div.setAttribute("class", "margcards card cardeffect rounded h-100 outershell")
             div.setAttribute("style", "width: 15.95rem;max-height:25.5rem;min-height:25.5rem;")
             //filling up an html var to add it to the li innerHTML
            

            let html = `
            
            <img class=" img-fluid " style="width: 15.5rem;max-height:10rem" src="${element.thumbnail.path}.${element.thumbnail.extension}" alt="card image">
            <div class="card-body">
        
           <p class="card-text">
           <span class="infoname" onclick="search(this)" data-categ="character" data-titlename="${element.name}"> ${element.name}</span>
           </p>
    
        <ul class="list-inline" data-charid="${element.id}" data-titlename="${element.name}">
                <li class="list-inline-item">
                Comics Available: <a class=" text-xs-center info" target="_blank" data-numb="${element.comics.available}" data-name="comics" onclick="info(this)">${element.comics.available}</a>
                </li>
                <li class="list-inline-item">
                Series Available: <a class=" text-xs-center info" target="_blank" data-numb="${element.series.available}" data-name="series" onclick="info(this)">${element.series.available}</a>
                </li>
                <li class="list-inline-item">
                Events Available: <a class=" text-xs-center info" target="_blank" data-numb="${element.events.available}" data-name="events" onclick="info(this)">${element.events.available}</a>
                </li>
                 
        </ul>
        
            </div   class="card-footer">`
            
            if( current_user === 'no_user'){
     
                let html2 = ` <span style="color: red;"><a href="/login">Sign-in/Register</a></span> 
                </div>`

                div.innerHTML = html + html2
             }
             else{
                let html2 = ` <div class="d-flex justify-content-center row margcards" style="padding-bottom:2%">
                        <form  onsubmit="fav(event,this)">
                            <input type="hidden" value="${element.id}" name="wishid">
                            <input type="hidden" value="${element.name}" name="wishname">
                            <input type="hidden" value="${element.thumbnail.path}" name="path">
                            <input type="hidden" value=".${element.thumbnail.extension}" name="extension">
                            <input type="hidden" value="character" name="category">
                            <input id="favbtn" class="marg btn btn-outline-danger" type="submit" value="Add To Fav.Heros">
                        </form>
                    </div>
                </div>
                
           `
           div.innerHTML = html + html2
             }

             //console.log(div)

             document.querySelector('#page').appendChild(div)
            
                
            });
          //load end 
          loader.classList.remove('display')
          searchbar.style.display =  "block";
          navfavbtn.disabled = false;
        });   

}



// 2 functions for open and close the alert msg
function alertmsg(){
    document.querySelector('#favalert').innerHTML = ''
    document.querySelector('#favalert').style.display = "block";
    document.querySelector('#favalert').innerHTML = 'You should Sign-in/Register to view this page'
}
function closealert(){
    document.querySelector('#favalert').innerHTML = ''
    document.querySelector('#favalert').style.display =  "none";
}


//fetching the info from the api and then displaying the response data in the page element
function search(element){
    
    document.querySelector('#dynamic_cntr').style.display = "none";
    document.querySelector('#dynamiclist').innerHTML = ''
    document.querySelector('#favalert').innerHTML = ''

    if(element){
        let name = element.getAttribute("data-titlename")
        //console.log(name)
        let category = element.getAttribute("data-categ")
        decider(name,category)
        }
    else{
            if(sbar.value.length < 1){
            location.reload()
            }
            else{
                let query = sbar.value
                let category = document.querySelector('#categorylist').value
                decider(query,category)
            }
        
        }
    
    async function decider(query,catlist){
            
            window.scrollTo({top: 0, behavior: 'smooth'});

           switch(catlist){
            case "character":
            
            let url = `https://gateway.marvel.com:443/v1/public/characters?ts=1695035480130&name=${query}&apikey=dbaf9e59f058845c07d6e792b93bd5e5&hash=08ba6b3cd9d97b7467888a83910655fb`
          
            let  response = await fetch(url)
            let result = await response.json()
            let data = result.data.results[0]
        
            document.querySelector('#maintitle').innerHTML = `The Marvel Gallery(${data.name})`
            
            document.querySelector('#favbtnspace').innerHTML = ''
            document.querySelector('#allinfo').innerHTML =''
            sbar.value=''
            document.querySelector('#page').innerHTML = ''
            document.querySelector('#searchpage').innerHTML=''

            let html2 = `
                    <br>
                      <div class="d-flex justify-content-center row">
                      <p class="card-text" data-charid="${data.id}" data-titlename="${data.name}"><b>Comics Available: &nbsp;<span class="info" onclick="info(this)" data-numb="${data.comics.available}" data-name="comics">${data.comics.available}</span></b></p>
                    </div>
                    <div class="d-flex justify-content-center row">
                      <p class="card-text" data-charid="${data.id}" data-titlename="${data.name}"><b>Series Available: &nbsp;<span class="info" onclick="info(this)" data-numb="${data.series.available}" data-name="series">${data.series.available}</span></b></p>
                    </div>
                    <div class="d-flex justify-content-center row">
                      <p class="card-text" data-charid="${data.id}" data-titlename="${data.name}"><b>Events Available: &nbsp;<span class="info" onclick="info(this)" data-numb="${data.events.available}" data-name="events">${data.events.available}</span></b></p>
                    </div>
              
                    <br>
                    <div id="favbtnspace_search">
  
                    </div>
                </div>
            </div>
            <br>`

            if(`${data.description}`=== 'null' || `${data.description}`=== ''){
                let html1  = `<div class="card mb-3"  style="color:white;background:black">
                <div class="d-flex justify-content-center row">
                  <img src=${data.thumbnail.path}.${data.thumbnail.extension} class="card-img-top" style="height: 250px;width: 250px;">
                </div>
                    <div class="card-body">
                      <div class="d-flex justify-content-center row">
                        <h5 class="card-title"><b>${data.name}</b></h5>
                      </div>
                        
                        <br>
                        <div class="d-flex justify-content-center row">
                          <p class="card-text"><b>There Is No Description Available For This Character</b></p>
                        </div>`
                document.querySelector('#searchpage').innerHTML = html1 + html2
            }
            else{
                let html1 = `<div class="card mb-3"  style="color:white;background:black">
                <div class="d-flex justify-content-center row">
                  <img src=${data.thumbnail.path}.${data.thumbnail.extension} class="card-img-top" style="height: 250px;width: 250px;">
                </div>
                    <div class="card-body">
                      <div class="d-flex justify-content-center row">
                        <h5 class="card-title"><b>${data.name}</b></h5>
                      </div>
                        
                        <br>
                        <div class="d-flex justify-content-center row">
                          <p class="card-text"><b>${data.description}</b></p>
                        </div>`
                document.querySelector('#searchpage').innerHTML = html1 + html2
            }


            if(document.querySelector('#currentuser').value === 'no_user'){
                document.querySelector('#favbtnspace_search').innerHTML = ''
                document.querySelector('#favbtnspace_search').innerHTML = `<span style="color: white;">You Want To Add Characters To Your Fav Page ? <a href="/login">Sign-in/Register</a></span> `
            }
            else{
                fetch(`/check`,{
                    method:'POST',
                    headers:{"X-CSRFToken":csrftoken},
                    body: JSON.stringify({
                    wishid: `${data.id}`,
                })
             })
                .then(response =>response.json())
                .then(result => {
                    //console.log(result)
                    if(result[0] === 'you already have this char in ur fav model'){
                        document.querySelector('#favbtnspace_search').innerHTML = ''
                        document.querySelector('#favbtnspace_search').innerHTML =` 
                        <div class="d-flex justify-content-center row">
                        <input id="favbtn" class="btn btn-danger" value="Add To Fav.Heros">
                        </div>
                        `
                       
                        document.querySelector("#favbtn").classList.remove('btn-danger');
                        document.querySelector("#favbtn").classList.add('btn-success');
                        
                        document.querySelector("#favbtn").value = 'This character is in ur fav'
                        document.querySelector("#favbtn").disabled = true;
                    }
                    else{
                        document.querySelector('#favbtnspace_search').innerHTML = ''
                        document.querySelector('#favbtnspace_search').innerHTML =`
                        <div class="d-flex justify-content-center row">
                        <form id="favform" onsubmit="fav(event)">
                        <input type="hidden" value="${data.id}" name="wishid">
                        <input type="hidden" value="${data.name}" name="wishname">
                        <input type="hidden" value="${data.thumbnail.path}" name="path">
                        <input type="hidden" value=".${data.thumbnail.extension}" name="extension">
                        <input type="hidden" value="character" name="category">
                        <input id="favbtn" class="marg btn btn-danger" type="submit" value="Add To Fav.Heros">
                    </form>
                    `
                    }
                })
            }
                
            break;

            case "comic":
                try{
                    
                    //console.log(parentel)
                    let id = element.getAttribute("data-id")
                    let comicname = element.getAttribute("data-titlename")
        
                    let url = `https://gateway.marvel.com:443/v1/public/comics/${id}?ts=1695035480130&limit=100&apikey=dbaf9e59f058845c07d6e792b93bd5e5&hash=08ba6b3cd9d97b7467888a83910655fb`
                    let response = await fetch(url)
                    let result = await response.json()
                
                    let data = result.data.results[0]

                    document.querySelector('#favbtnspace').innerHTML = ''
                    document.querySelector('#allinfo').innerHTML =''
                    sbar.value=''
                    document.querySelector('#page').innerHTML = ''
                    document.querySelector('#searchpage').innerHTML=''
        
                    document.querySelector('#maintitle').innerHTML = `<span  data-titlename="${comicname}">${comicname}</span>`

                    let html1 = `<div class="card mb-3"  style="color:white;background:black">
                    <div class="d-flex justify-content-center row">
                      <img src=${data.thumbnail.path}.${data.thumbnail.extension} class="card-img-top" style="height: 250px;width: 250px;">
                    </div>
                        <div class="card-body">
                          <div class="d-flex justify-content-center row">
                            <h5 class="card-title"><b>${data.title}</b></h5>
                          </div>
                            
                            <br>`

                    if(`${data.description}` === 'null' || `${data.description}` === ''){

                        let html2 =  `<div class="d-flex justify-content-center row">
                        <p class="card-text"><b>There Is No Description Available For This Comic</b></p>
                      </div>
          
                        <br>

                        <div id="favbtnspace_search">
        
                        </div>
                    </div>
                    </div>
                <br>`
                document.querySelector('#searchpage').innerHTML = html1 + html2
                    }
                    else{

                            let html2 = ` <div class="d-flex justify-content-center row">
                            <p class="card-text"><b>${data.description}</b></p>
                                </div>
                    
                                <br>

                                <div id="favbtnspace_search">
                
                                </div>
                            </div>
                            </div>
                        <br>`
                        document.querySelector('#searchpage').innerHTML = html1 + html2

                    }        

                    
                    
                    
                           
                    if(document.querySelector('#currentuser').value === 'no_user'){
                        document.querySelector('#favbtnspace_search').innerHTML = ''
                        document.querySelector('#favbtnspace_search').innerHTML = `<span style="color: white;">You Want To Add Characters To Your Fav Page ? <a href="/login">Sign-in/Register</a></span> `
                    }
                    else{
                        fetch(`/check`,{
                            method:'POST',
                            headers:{"X-CSRFToken":csrftoken},
                            body: JSON.stringify({
                            wishid: `${data.id}`,
                        })
                     })
                        .then(response =>response.json())
                        .then(result => {
                            //console.log(result)
                            if(result[0] === 'you already have this char in ur fav model'){
                                document.querySelector('#favbtnspace_search').innerHTML = ''
                                document.querySelector('#favbtnspace_search').innerHTML =` 
                                <div class="d-flex justify-content-center row">
                                <input id="favbtn" class="btn btn-danger" value="Add To Fav.Heros">
                                </div>
                                `
                               
                                document.querySelector("#favbtn").classList.remove('btn-danger');
                                document.querySelector("#favbtn").classList.add('btn-success');
                                
                                document.querySelector("#favbtn").value = 'This character is in ur fav'
                                document.querySelector("#favbtn").disabled = true;
                            }
                            else{
                                document.querySelector('#favbtnspace_search').innerHTML = ''
                                document.querySelector('#favbtnspace_search').innerHTML =`
                                <div class="d-flex justify-content-center row">
                                <form id="favform" onsubmit="fav(event)">
                                <input type="hidden" value="${data.id}" name="wishid">
                                <input type="hidden" value="${data.title}" name="wishname">
                                <input type="hidden" value="${data.thumbnail.path}" name="path">
                                <input type="hidden" value=".${data.thumbnail.extension}" name="extension">
                                <input type="hidden" value="comic" name="category">
                                <input id="favbtn" class="marg btn btn-danger" type="submit" value="Add To Fav.Comics">
                            </form>
                            `
                            }
                        })
                   
                }
            }
                catch(err){
                    alert('there was an error please try again!')
                }
                //console.log('we are in comic:',catlist,query)
            break;

            case "series":
                try{
                    
                    //console.log(parentel)
                    let id = element.getAttribute("data-id")
                    let seriesname = element.getAttribute("data-titlename")
        
                    let url = `https://gateway.marvel.com:443/v1/public/series/${id}?ts=1695035480130&limit=100&apikey=dbaf9e59f058845c07d6e792b93bd5e5&hash=08ba6b3cd9d97b7467888a83910655fb`
                    let response = await fetch(url)
                    let result = await response.json()
                
                    let data = result.data.results[0]

                    document.querySelector('#favbtnspace').innerHTML = ''
                    document.querySelector('#allinfo').innerHTML =''
                    sbar.value=''
                    document.querySelector('#page').innerHTML = ''
                    document.querySelector('#searchpage').innerHTML=''
                    
        
                    document.querySelector('#maintitle').innerHTML = `<span  data-titlename="${seriesname}">${seriesname}</span>`

                    let html1 = `  <div class="card mb-3"  style="color:white;background:black">
                    <div class="d-flex justify-content-center row">
                      <img src=${data.thumbnail.path}.${data.thumbnail.extension} class="card-img-top" style="height: 250px;width: 250px;">
                    </div>
                        <div class="card-body">
                          <div class="d-flex justify-content-center row">
                            <h5 class="card-title"><b>${data.title}</b></h5>
                          </div>`

                          if(`${data.description}` === 'null' || `${data.description}` === ''){
                            let html2 = ` 
                            <br>
                            <div class="d-flex justify-content-center row">
                              <p class="card-text"><b>There Is No Description Available For This Series</b></p>
                            </div>
                
                            <br>

                            <div id="favbtnspace_search">
          
                            </div>
                        </div>
                        </div>
                    <br>`
                    document.querySelector('#searchpage').innerHTML = html1 + html2
                          }
                          else{
                            let html2 = ` 
                            <br>
                            <div class="d-flex justify-content-center row">
                              <p class="card-text"><b>${data.description}</b></p>
                            </div>
                
                            <br>

                            <div id="favbtnspace_search">
          
                            </div>
                        </div>
                        </div>
                    <br>`
                    document.querySelector('#searchpage').innerHTML = html1 + html2
                          }
                    

                    if(document.querySelector('#currentuser').value === 'no_user'){
                        document.querySelector('#favbtnspace_search').innerHTML = ''
                        document.querySelector('#favbtnspace_search').innerHTML = `<span style="color: white;">You Want To Add Characters To Your Fav Page ? <a href="/login">Sign-in/Register</a></span> `
                    }
                    else{
                        fetch(`/check`,{
                            method:'POST',
                            headers:{"X-CSRFToken":csrftoken},
                            body: JSON.stringify({
                            wishid: `${data.id}`,
                        })
                     })
                        .then(response =>response.json())
                        .then(result => {
                            //console.log(result)
                            if(result[0] === 'you already have this char in ur fav model'){
                                document.querySelector('#favbtnspace_search').innerHTML = ''
                                document.querySelector('#favbtnspace_search').innerHTML =` 
                                <div class="d-flex justify-content-center row">
                                <input id="favbtn" class="btn btn-danger" value="Add To Fav.Heros">
                                </div>
                                `
                               
                                document.querySelector("#favbtn").classList.remove('btn-danger');
                                document.querySelector("#favbtn").classList.add('btn-success');
                                
                                document.querySelector("#favbtn").value = 'This character is in ur fav'
                                document.querySelector("#favbtn").disabled = true;
                            }
                            else{
                                document.querySelector('#favbtnspace_search').innerHTML = ''
                                document.querySelector('#favbtnspace_search').innerHTML =`
                                <div class="d-flex justify-content-center row">
                                <form id="favform" onsubmit="fav(event)">
                                <input type="hidden" value="${data.id}" name="wishid">
                                <input type="hidden" value="${data.title}" name="wishname">
                                <input type="hidden" value="${data.thumbnail.path}" name="path">
                                <input type="hidden" value=".${data.thumbnail.extension}" name="extension">
                                <input type="hidden" value="series" name="category">
                                <input id="favbtn" class="marg btn btn-danger" type="submit" value="Add To Fav.Series">
                            </form>
                            `
                            }
                        })
                   
                }
                }
                catch(err){
                    alert('there was an error please try again!')
                }
                //console.log('we are in series:',catlist,query)
            break;

            case "events":
                try{
                    
                    //console.log(parentel)
                    let id = element.getAttribute("data-id")
                    let eventname = element.getAttribute("data-titlename")
        
                    let url = `https://gateway.marvel.com:443/v1/public/events/${id}?ts=1695035480130&limit=100&apikey=dbaf9e59f058845c07d6e792b93bd5e5&hash=08ba6b3cd9d97b7467888a83910655fb`
                    let response = await fetch(url)
                    let result = await response.json()
                
                    let data = result.data.results[0]

                    document.querySelector('#favbtnspace').innerHTML = ''
                    document.querySelector('#allinfo').innerHTML =''
                    sbar.value=''
                    document.querySelector('#page').innerHTML = ''
                    document.querySelector('#searchpage').innerHTML=''
        
                    document.querySelector('#maintitle').innerHTML = `<span  data-titlename="${eventname}">${eventname}</span>`

                    let html1 = ` <div class="card mb-3"  style="color:white;background:black">
                    <div class="d-flex justify-content-center row">
                      <img src=${data.thumbnail.path}.${data.thumbnail.extension} class="card-img-top" style="height: 250px;width: 250px;">
                    </div>
                        <div class="card-body">
                          <div class="d-flex justify-content-center row">
                            <h5 class="card-title"><b>${data.title}</b></h5>
                          </div>
                            `

                    if(`${data.description}` === 'null' || `${data.description}` === ''){
                                let html2 = ` 
                                <br>
                                <div class="d-flex justify-content-center row">
                                  <p class="card-text"><b>There Is No Description Available For This Event</b></p>
                                </div>
                    
                                <br>
    
                                <div id="favbtnspace_search">
              
                                </div>
                            </div>
                            </div>
                        <br>`
                        document.querySelector('#searchpage').innerHTML = html1 + html2
                              }
                              else{
                               let html2 =  ` 
                            <br>
                            <div class="d-flex justify-content-center row">
                              <p class="card-text"><b>${data.description}</b></p>
                            </div>
                
                            <br>

                            <div id="favbtnspace_search">
          
                            </div>
                        </div>
                    </div>
                    <br>`
                    document.querySelector('#searchpage').innerHTML = html1 + html2
                              }        


                    if(document.querySelector('#currentuser').value === 'no_user'){
                        document.querySelector('#favbtnspace_search').innerHTML = ''
                        document.querySelector('#favbtnspace_search').innerHTML = `<span style="color: white;">You Want To Add Characters To Your Fav Page ? <a href="/login">Sign-in/Register</a></span> `
                    }
                    else{
                        fetch(`/check`,{
                            method:'POST',
                            headers:{"X-CSRFToken":csrftoken},
                            body: JSON.stringify({
                            wishid: `${data.id}`,
                        })
                     })
                        .then(response =>response.json())
                        .then(result => {
                            //console.log(result)
                            if(result[0] === 'you already have this char in ur fav model'){
                                document.querySelector('#favbtnspace_search').innerHTML = ''
                                document.querySelector('#favbtnspace_search').innerHTML =` 
                                <div class="d-flex justify-content-center row">
                                <input id="favbtn" class="btn btn-danger" value="Add To Fav.Heros">
                                </div>
                                `
                               
                                document.querySelector("#favbtn").classList.remove('btn-danger');
                                document.querySelector("#favbtn").classList.add('btn-success');
                                
                                document.querySelector("#favbtn").value = 'This character is in ur fav'
                                document.querySelector("#favbtn").disabled = true;
                            }
                            else{
                                document.querySelector('#favbtnspace_search').innerHTML = ''
                                document.querySelector('#favbtnspace_search').innerHTML =`
                                <div class="d-flex justify-content-center row">
                                <form id="favform" onsubmit="fav(event)">
                                <input type="hidden" value="${data.id}" name="wishid">
                                <input type="hidden" value="${data.title}" name="wishname">
                                <input type="hidden" value="${data.thumbnail.path}" name="path">
                                <input type="hidden" value=".${data.thumbnail.extension}" name="extension">
                                <input type="hidden" value="event" name="category">
                                <input id="favbtn" class="marg btn btn-danger" type="submit" value="Add To Fav.Events">
                            </form>
                            `
                            }
                        })
                   
                }
                }
                catch(err){
                    alert('there was an error please try again!')
                }
                //console.log('we are in events:',catlist,query)
            break;

            default:
            document.querySelector('#favalert').innerHTML = ''
            document.querySelector('#favalert').style.display = "block";
            document.querySelector('#favalert').innerHTML = 'Please Choose a Category'
            break;
           }

            
          
        }

   
       
    } 
      


//displaying the comics events stories and series for each char in the allinfo element 
async function info(element){
    if(element){
        let targetnumb = element.getAttribute("data-numb")
        //console.log(targetname)
        if(targetnumb > 0){
            document.querySelector('#dynamic_cntr').style.display = "none";
            document.querySelector('#dynamiclist').innerHTML = ''
            document.querySelector('#favalert').innerHTML = ''
        
            document.querySelector('#page').innerHTML = ''
            document.querySelector('#allinfo').innerHTML =''
            document.querySelector('#searchpage').innerHTML=''
            document.querySelector('#favpage').innerHTML = ''
          

            let targetname = element.getAttribute("data-name")
            //console.log(targetname)

            //load start
            const loader = document.querySelector('#loading')
            loader.classList.add('display')
            const searchbar = document.querySelector('#searchelement')
            searchbar.style.display =  "none";
            const navfavbtn = document.querySelector('#navfavbtn')
            navfavbtn.disabled = true;
        
            if(targetname === 'comics'){
                try{
                    let parentel = element.parentElement.parentElement
                    //console.log(parentel)
                    let charid = parentel.getAttribute("data-charid")
                    let charname = parentel.getAttribute("data-titlename")

                    document.querySelector('#maintitle').innerHTML = `<span class="infoname" onclick="search(this)"  data-categ="character" data-titlename="${charname}">${charname}</span> Comic Gallery`
        
                    let url = `https://gateway.marvel.com:443/v1/public/characters/${charid}/comics?ts=1695035480130&limit=100&apikey=dbaf9e59f058845c07d6e792b93bd5e5&hash=08ba6b3cd9d97b7467888a83910655fb`
                    let response = await fetch(url)
                    let result = await response.json()
                
                    let data = result.data.results
        
                    
                    Object.keys(data).forEach(element =>{
                        let html1 = `
                        <div class="col marg">
                            <div class="card h-100 cardeffect" style="background:black;color:white;cursor: pointer;">
                            <div data-id="${data[element].id}" data-categ="comic" data-titlename="${data[element].title}" onclick="search(this)">
                            <img src=${data[element].thumbnail.path}.${data[element].thumbnail.extension} class="card-img-top" alt="${data[element].title}" style="height:350px;">
                                <div class="card-body">
                                    <h5 class="card-title">${data[element].title}</h5>
                                </div>   
                            </div>
                                
                    `

                    if(document.querySelector('#currentuser').value === 'no_user'){
                                let html2 = `  <div id="favbtnspace_search">
                                <span style="color: white;">You Want To Add It To Your Fav Page ? <a href="/login">Sign-in/Register</a></span>  
                                </div>
                            </div>
                        </div>`
                        document.querySelector('#allinfo').innerHTML += html1 + html2 
                    }
                    else{
                        fetch(`/check`,{
                            method:'POST',
                            headers:{"X-CSRFToken":csrftoken},
                            body: JSON.stringify({
                            wishid: `${data[element].id}`,
                        })
                     })
                        .then(response =>response.json())
                        .then(result => {
                            //console.log(result)
                            if(result[0] === 'you already have this char in ur fav model'){

                                let html2 = `  <div id="favbtnspace_search">
                                            <div class="d-flex justify-content-center row">
                                            <input id="favbtn" disabled class="btn btn-outline-success" value="This comic is in ur fav">
                                            </div>
                                        </div>
                                        </div>
                                    </div>`
                                document.querySelector('#allinfo').innerHTML += html1 + html2 

                            }
                            else{
                                let html2 = `  <div id="favbtnspace_search">
                                            <div class="d-flex justify-content-center row">
                                            <form id="favform" onsubmit="fav(event,this)">
                                            <input type="hidden" value="${data[element].id}" name="wishid">
                                            <input type="hidden" value="${data[element].title}" name="wishname">
                                            <input type="hidden" value="${data[element].thumbnail.path}" name="path">
                                            <input type="hidden" value=".${data[element].thumbnail.extension}" name="extension">
                                            <input type="hidden" value="comic" name="category">
                                            <input id="favbtn" class="marg btn btn-outline-danger" type="submit" value="Add To Fav.Comics">
                                        </form>
                                        </div>
                                    </div>
                                </div>
                            </div>`
                            document.querySelector('#allinfo').innerHTML += html1 + html2 

                            }
                        })
                   
                      }
                    //load end 
                    loader.classList.remove('display')
                    searchbar.style.display =  "block";
                    navfavbtn.disabled = false;
                    })
        
                }
                catch(err){
                    console.log('there was an error please try again!')
                    //load end 
                    loader.classList.remove('display')
                    searchbar.style.display =  "block";
                    navfavbtn.disabled = false;
                }
        
            }
            else if(targetname === 'series'){
                try{
                    let parentel = element.parentElement.parentElement
                    let charid = parentel.getAttribute("data-charid")
                    let charname = parentel.getAttribute("data-titlename")

                    document.querySelector('#maintitle').innerHTML = `<span class="infoname" onclick="search(this)"  data-categ="character" data-titlename="${charname}">${charname}</span> Series Gallery`
        
                    let url = `https://gateway.marvel.com:443/v1/public/characters/${charid}/series?ts=1695035480130&limit=100&apikey=dbaf9e59f058845c07d6e792b93bd5e5&hash=08ba6b3cd9d97b7467888a83910655fb`
                    let response = await fetch(url)
                    let result = await response.json()
                
                    let data = result.data.results
        
                    Object.keys(data).forEach(element =>{
                        let html1 = `
                        <div class="col marg">
                            <div class="card h-100 cardeffect" style="background:black;color:white;cursor: pointer;" >
                            <div data-id="${data[element].id}" data-categ="series" data-titlename="${data[element].title}" onclick="search(this)">
                            <img src=${data[element].thumbnail.path}.${data[element].thumbnail.extension} class="card-img-top" alt="${data[element].title}" style="height:350px;" >
                                <div class="card-body">
                                    <h5 class="card-title">${data[element].title}</h5>
                                </div> 
                            </div>
                                  
                    `

                    if(document.querySelector('#currentuser').value === 'no_user'){
                                let html2 = `  <div id="favbtnspace_search">
                                <span style="color: white;">You Want To Add It To Your Fav Page ? <a href="/login">Sign-in/Register</a></span>  
                                </div>
                            </div>
                        </div>`
                        document.querySelector('#allinfo').innerHTML += html1 + html2 
                    }
                    else{
                        fetch(`/check`,{
                            method:'POST',
                            headers:{"X-CSRFToken":csrftoken},
                            body: JSON.stringify({
                            wishid: `${data[element].id}`,
                        })
                     })
                        .then(response =>response.json())
                        .then(result => {
                            //console.log(result)
                            if(result[0] === 'you already have this char in ur fav model'){

                                let html2 = `  <div id="favbtnspace_search">
                                            <div class="d-flex justify-content-center row">
                                            <input id="favbtn" disabled class="btn btn-outline-success" value="This Series is in ur fav">
                                            </div>
                                        </div>
                                        </div>
                                    </div>`
                                document.querySelector('#allinfo').innerHTML += html1 + html2 

                            }
                            else{
                                let html2 = `  <div id="favbtnspace_search">
                                            <div class="d-flex justify-content-center row">
                                            <form id="favform" onsubmit="fav(event,this)">
                                            <input type="hidden" value="${data[element].id}" name="wishid">
                                            <input type="hidden" value="${data[element].title}" name="wishname">
                                            <input type="hidden" value="${data[element].thumbnail.path}" name="path">
                                            <input type="hidden" value=".${data[element].thumbnail.extension}" name="extension">
                                            <input type="hidden" value="series" name="category">
                                            <input id="favbtn" class="marg btn btn-outline-danger" type="submit" value="Add To Fav.Series">
                                        </form>
                                        </div>
                                    </div>
                                </div>
                            </div>`
                            document.querySelector('#allinfo').innerHTML += html1 + html2 

                            }
                        })
                   
                      }
                     
                      //load end 
                      loader.classList.remove('display')
                      searchbar.style.display =  "block";
                      navfavbtn.disabled = false;
                    })
        
                }
                catch(err){
                    console.log('there was an error please try again!')
                    //load end 
                    loader.classList.remove('display')
                    searchbar.style.display =  "block";
                    navfavbtn.disabled = false;
                }
            }
            else if(targetname === 'events'){
                try{
                    let parentel = element.parentElement.parentElement
                    let charid = parentel.getAttribute("data-charid")
                    let charname = parentel.getAttribute("data-titlename")

                    document.querySelector('#maintitle').innerHTML = `<span class="infoname" onclick="search(this)"  data-categ="character" data-titlename="${charname}">${charname}</span> Events Gallery`
        
                    let url = `https://gateway.marvel.com:443/v1/public/characters/${charid}/events?ts=1695035480130&limit=100&apikey=dbaf9e59f058845c07d6e792b93bd5e5&hash=08ba6b3cd9d97b7467888a83910655fb`
                    let response = await fetch(url)
                    let result = await response.json()
                
                    let data = result.data.results
        
                    Object.keys(data).forEach(element =>{
                        let html1 = `
                        <div class="col marg">
                            <div class="card h-100 cardeffect" style="background:black;color:white;cursor: pointer;" >
                            <div  data-id="${data[element].id}" data-categ="events" data-titlename="${data[element].title}" onclick="search(this)">
                            <img src=${data[element].thumbnail.path}.${data[element].thumbnail.extension} class="card-img-top" alt="${data[element].title}" style="height:350px;">
                                <div class="card-body">
                                    <h5 class="card-title">${data[element].title}</h5>
                                </div>   
                            </div>
                                
                    `

                    if(document.querySelector('#currentuser').value === 'no_user'){
                                let html2 = `  <div id="favbtnspace_search">
                                <span style="color: white;">You Want To Add It To Your Fav Page ? <a href="/login">Sign-in/Register</a></span>  
                                </div>
                            </div>
                        </div>`
                        document.querySelector('#allinfo').innerHTML += html1 + html2 
                    }
                    else{
                        fetch(`/check`,{
                            method:'POST',
                            headers:{"X-CSRFToken":csrftoken},
                            body: JSON.stringify({
                            wishid: `${data[element].id}`,
                        })
                     })
                        .then(response =>response.json())
                        .then(result => {
                            //console.log(result)
                            if(result[0] === 'you already have this char in ur fav model'){

                                let html2 = `  <div id="favbtnspace_search">
                                            <div class="d-flex justify-content-center row">
                                            <input id="favbtn" disabled class="btn btn-outline-success" value="This Event is in ur fav">
                                            </div>
                                        </div>
                                        </div>
                                    </div>`
                                document.querySelector('#allinfo').innerHTML += html1 + html2 

                            }
                            else{
                                let html2 = `  <div id="favbtnspace_search">
                                            <div class="d-flex justify-content-center row">
                                            <form id="favform" onsubmit="fav(event,this)">
                                            <input type="hidden" value="${data[element].id}" name="wishid">
                                            <input type="hidden" value="${data[element].title}" name="wishname">
                                            <input type="hidden" value="${data[element].thumbnail.path}" name="path">
                                            <input type="hidden" value=".${data[element].thumbnail.extension}" name="extension">
                                            <input type="hidden" value="event" name="category">
                                            <input id="favbtn" class="marg btn btn-outline-danger" type="submit" value="Add To Fav.Comics">
                                        </form>
                                        </div>
                                    </div>
                                </div>
                            </div>`
                            document.querySelector('#allinfo').innerHTML += html1 + html2 

                            }
                        })
                   
                      }
                    
                    //load end 
                    loader.classList.remove('display')
                    searchbar.style.display =  "block";
                    navfavbtn.disabled = false;
                    })
        
                }
                catch(err){
                    console.log('there was an error please try again!')
                    //load end 
                    loader.classList.remove('display')
                    searchbar.style.display =  "block";
                    navfavbtn.disabled = false;
                }
            }
        }
    }
    else{
        console.log('Element Not Found')
    }
}

//adding new fav char to the fav model
function fav(event,element){

    document.querySelector('#dynamic_cntr').style.display = "none";
    document.querySelector('#dynamiclist').innerHTML = ''
    document.querySelector('#favalert').innerHTML = ''

    if (element){
        const wishid = element.querySelector('[name="wishid"]').value;
        //console.log(wishid)
        const wishname = element.querySelector('[name="wishname"]').value;
        //console.log(wishname)
        const path = element.querySelector('[name="path"]').value;
        //console.log(path)
        const extension = element.querySelector('[name="extension"]').value;
        //console.log(extension)
        const category = element.querySelector('[name="category"]').value;
        //console.log(extension)
        
        event.preventDefault()

        fetch(`/check`,{
            method:'POST',
            headers:{"X-CSRFToken":csrftoken},
            body: JSON.stringify({
            wishid: `${wishid}`,
        })
     })
        .then(response =>response.json())
        .then(result => {
            //console.log(result)
            if(result[0] === 'you already have this char in ur fav model'){
                element.querySelector("#favbtn").classList.remove('btn-outline-danger');
                element.querySelector("#favbtn").classList.add('btn-outline-success');
                
                element.querySelector("#favbtn").value = 'Already in ur fav'
                element.querySelector("#favbtn").disabled = true;
            }
            else{
                fetch('/addfav',{
                    method:'POST',
                    headers:{"X-CSRFToken":csrftoken},
                    body: JSON.stringify({
                    wishid: wishid,
                    wishname: wishname,
                    path: path,
                    extension: extension,
                    category: category
                })
             })
              //console.log(result);
              element.querySelector("#favbtn").classList.remove("btn-outline-danger");
              element.querySelector("#favbtn").classList.add("btn-outline-success");
              element.querySelector("#favbtn").value = 'Added To Your Fav'
              element.querySelector("#favbtn").disabled = true;

              let parentel = element.parentElement.parentElement
              //console.log(parentel)
              parentel.style.animationPlayState = 'running';
              parentel.addEventListener('animationend', () => {
                  parentel.remove();
                 });
            }
        }); 

    }
    else{

        const wishid = document.querySelector('[name="wishid"]').value;
        //console.log(wishid)
        const wishname = document.querySelector('[name="wishname"]').value;
        //console.log(wishname)
        const path = document.querySelector('[name="path"]').value;
        //console.log(path)
        const extension = document.querySelector('[name="extension"]').value;
        // console.log(extension)
        const category = document.querySelector('[name="category"]').value;
        // console.log(extension)
        
        event.preventDefault()

        fetch(`/check`,{
            method:'POST',
            headers:{"X-CSRFToken":csrftoken},
            body: JSON.stringify({
            wishid: `${wishid}`,
        })
     })
        .then(response =>response.json())
        .then(result => {
            //console.log(result)
            if(result[0] === 'you already have this char in ur fav model'){

                document.querySelector("#favbtn").classList.remove('btn-danger');
                document.querySelector("#favbtn").classList.add('btn-success');
                
                document.querySelector("#favbtn").value = 'Already in ur fav'
                document.querySelector("#favbtn").disabled = true;
            }
            else{
                
                fetch('/addfav',{
                    method:'POST',
                    headers:{"X-CSRFToken":csrftoken},
                    body: JSON.stringify({
                    wishid: wishid,
                    wishname: wishname,
                    path: path,
                    extension: extension,
                    category: category
                })
            })                
                //console.log(result);
                document.querySelector("#favbtn").classList.remove("btn-danger");
                document.querySelector("#favbtn").classList.add("btn-outline-success");
                document.querySelector("#favbtn").value = 'Added To Your Fav'
                document.querySelector("#favbtn").disabled = true;          
            }
        }); 
    }

 //console.log('done')
}


// loads the fav page for user
function favpage(element){
    //console.log(1)
    //console.log(element)

    document.querySelector('#dynamic_cntr').style.display = "none";
    document.querySelector('#dynamiclist').innerHTML = ''
    document.querySelector('#searchpage').innerHTML=''
    document.querySelector('#favbtnspace').innerHTML = ''
    document.querySelector('#allinfo').innerHTML =''
    document.querySelector('#page').innerHTML =  ''
    document.querySelector('#favpage').innerHTML = '' 
    document.querySelector('#charname').value = ''
    document.querySelector('#charname').placeholder = 'Type';

    document.querySelector('#favmenu').innerHTML =`<ul class="nav nav-tabs justify-content-center" style="background-color: transparent;color: red; border-color:transparent;">
    <li class="nav-item">
    <a class="nav-link" id="charactersmenu" onclick="favpage(this)"  data-fav="favcharacters">Characters</a>
    </li>
    <li class="nav-item" >
    <a class="nav-link" id="comicsmenu" onclick="favpage(this)"  data-fav="favcomics">Comics</a>
    </li>
    <li class="nav-item">
    <a class="nav-link" id="seriesmenu" onclick="favpage(this)" data-fav="favseries">Series</a>
    </li>
    <li class="nav-item">
    <a class="nav-link" id="eventsmenu" onclick="favpage(this)" data-fav="favevents">Events</a>
    </li>
</ul>
`
    
   

    let fav_page = element.getAttribute("data-fav")

    if(fav_page === 'favcharacters'){

        document.querySelector('#maintitle').innerHTML = `Fav Marvel Character Gallery`
        document.querySelector('#charactersmenu').classList.add('active');
        let pagecateg = 'character'
        fetch(`/favpage/${pagecateg}`)
        .then(response => response.json())
        .then(favchars =>{
            //console.log(favchars)
            if(favchars.length > 0){

            favchars.forEach(element => {
                //create the ul element
                const div = document.createElement('div')
                //fill up the div class
                div.setAttribute("class", "outershell card cardeffect margcards")
                div.setAttribute("style", "width: 15.5rem;max-height:26rem ; ")
                //filling up an html var to add it to the li innerHTML
                let html=`
                <div class="innershell">
                <img src="${element.imgpath}${element.imgext}" class="card-img-top" alt="${element.charname}" style="height: 250px;">
                </div>
                <div class="card-body">
                    <h5 class="card-title"  data-categ="character" data-titlename="${element.charname}">${element.charname}</h5>
                </div>
                <div class="card-body">
                    <span class="infoname card-text remove-btn " data-titlename="${element.charname}" data-charid="${element.id}">Remove</span>
                </div>
                `
                
                //adding the html to the li
                div.innerHTML=html;
                //appending the li to ul as a child 
                document.querySelector('#favpage').appendChild(div);
                
               
               
            });


            //get all the buttons with remove-btn class
            let all_remove = document.querySelectorAll(".remove-btn")

            //get all the fav cards
            let all_cards = document.querySelectorAll(".innershell")
            
            all_remove.forEach(btn =>{
                btn.addEventListener('click', () => {
                    let charid = btn.getAttribute("data-charid")
                    removefavchar(charid)
                    //console.log(charid)
                    btn.innerHTML = 'Removed'
                    let target = btn.parentElement.parentElement
                    //console.log(target)
                    target.style.animationPlayState = 'running';
                    target.addEventListener('animationend', () => {
                        target.remove();
                        
                    });  
                });
                
            });

            all_cards.forEach(card =>{
                card.addEventListener('click', ()=>{

                    //console.log(card)
                    //console.log(card.querySelector('.card-title'))
                    let parentel = card.parentElement
                    let name_element = parentel.querySelector('.card-title')
                    search(name_element)
                    //console.log(name)

                });
            });



    }
            
    else{
                document.querySelector('#maintitle').innerHTML = `You Dont Have Any Fav Chars Yet`
                
        }
            
       
    })
    }

    else if (fav_page === 'favcomics'){

        document.querySelector('#maintitle').innerHTML = `Fav Marvel Comic Gallery`
        document.querySelector('#comicsmenu').classList.add('active');
        //console.log(element)
        
        let pagecateg = 'comic'
        fetch(`/favpage/${pagecateg}`)
        .then(response => response.json())
        .then(favchars =>{
            //console.log(favchars)
            if(favchars.length > 0){

            favchars.forEach(element => {
                //create the ul element
                const div = document.createElement('div')
                //fill up the div class
                div.setAttribute("class", "outershell card cardeffect margcards")
                div.setAttribute("style", "width: 15.5rem;max-height:26rem ; ")
                //filling up an html var to add it to the li innerHTML
                let html=`
                <div class="innershell">
                <img src="${element.imgpath}${element.imgext}" class="card-img-top" alt="${element.charname}" style="height: 250px;">
                </div>
                <div class="card-body">
                    <h5 class="card-title" data-id="${element.charid}" data-categ="comic" data-titlename="${element.charname}">${element.charname}</h5>
                </div>
                <div class="card-body">
                    <span class="infoname card-text remove-btn " data-titlename="${element.charname}" data-charid="${element.id}">Remove</span>
                </div>
                `
                
                //adding the html to the li
                div.innerHTML=html;
                //appending the li to ul as a child 
                document.querySelector('#favpage').appendChild(div);
            
              
            });


            //get all the buttons with remove-btn class
            let all_remove = document.querySelectorAll(".remove-btn")

            //get all the fav cards
            let all_cards = document.querySelectorAll(".innershell")
            
            all_remove.forEach(btn =>{
                btn.addEventListener('click', () => {
                    let charid = btn.getAttribute("data-charid")
                    removefavchar(charid)
                    //console.log(charid)
                    btn.innerHTML = 'Removed'
                    let target = btn.parentElement.parentElement
                    //console.log(target)
                    target.style.animationPlayState = 'running';
                    target.addEventListener('animationend', () => {
                        target.remove();
                        
                    });  
                });
                
            });

            all_cards.forEach(card =>{
                card.addEventListener('click', ()=>{

                    //console.log(card)
                    //console.log(card.querySelector('.card-title'))
                    let parentel = card.parentElement
                    let name_element = parentel.querySelector('.card-title')
                    search(name_element)
                    //console.log(name)

                });
            });



    }
            
    else{
                document.querySelector('#maintitle').innerHTML = `You Dont Have Any Fav Comics Yet`
               
        }
            
       
    })

    }
    else if(fav_page === 'favseries'){
        document.querySelector('#maintitle').innerHTML = `Fav Marvel Series Gallery`
        document.querySelector('#seriesmenu').classList.add('active');
        //console.log(element)
        
        let pagecateg = 'series'
        fetch(`/favpage/${pagecateg}`)
        .then(response => response.json())
        .then(favchars =>{
            //console.log(favchars)
            if(favchars.length > 0){

            favchars.forEach(element => {
                //create the ul element
                const div = document.createElement('div')
                //fill up the div class
                div.setAttribute("class", "outershell card cardeffect margcards")
                div.setAttribute("style", "width: 15.5rem;max-height:26rem ; ")
                //filling up an html var to add it to the li innerHTML
                let html=`
                <div class="innershell">
                <img src="${element.imgpath}${element.imgext}" class="card-img-top" alt="${element.charname}" style="height: 250px;">
                </div>
                <div class="card-body">
                    <h5 class="card-title" data-id="${element.charid}" data-categ="series" data-titlename="${element.charname}">${element.charname}</h5>
                </div>
                <div class="card-body">
                    <span class="infoname card-text remove-btn " data-titlename="${element.charname}" data-charid="${element.id}">Remove</span>
                </div>
                `
                
                //adding the html to the li
                div.innerHTML=html;
                //appending the li to ul as a child 
                document.querySelector('#favpage').appendChild(div);
            
                 
            });


            //get all the buttons with remove-btn class
            let all_remove = document.querySelectorAll(".remove-btn")

            //get all the fav cards
            let all_cards = document.querySelectorAll(".innershell")
            
            all_remove.forEach(btn =>{
                btn.addEventListener('click', () => {
                    let charid = btn.getAttribute("data-charid")
                    removefavchar(charid)
                    //console.log(charid)
                    btn.innerHTML = 'Removed'
                    let target = btn.parentElement.parentElement
                    //console.log(target)
                    target.style.animationPlayState = 'running';
                    target.addEventListener('animationend', () => {
                        target.remove();
                        
                    });  
                });
                
            });

            all_cards.forEach(card =>{
                card.addEventListener('click', ()=>{

                    //console.log(card)
                    //console.log(card.querySelector('.card-title'))
                    let parentel = card.parentElement
                    let name_element = parentel.querySelector('.card-title')
                    search(name_element)
                    //console.log(name)

                });
            });



    }
            
    else{
                document.querySelector('#maintitle').innerHTML = `You Dont Have Any Fav Series Yet`
                
        }
            
       
    })

    }
    else if(fav_page === 'favevents'){
        document.querySelector('#maintitle').innerHTML = `Fav Marvel Events Gallery`
        document.querySelector('#eventsmenu').classList.add('active');
        //console.log(element)

        let pagecateg = 'event'
        fetch(`/favpage/${pagecateg}`)
        .then(response => response.json())
        .then(favchars =>{
            //console.log(favchars)
            if(favchars.length > 0){

            favchars.forEach(element => {
                //create the ul element
                const div = document.createElement('div')
                //fill up the div class
                div.setAttribute("class", "outershell card cardeffect margcards")
                div.setAttribute("style", "width: 15.5rem;max-height:26rem ; ")
                //filling up an html var to add it to the li innerHTML
                let html=`
                <div class="innershell">
                <img src="${element.imgpath}${element.imgext}" class="card-img-top" alt="${element.charname}" style="height: 250px;">
                </div>
                <div class="card-body">
                    <h5 class="card-title" data-id="${element.charid}"  data-categ="events" data-titlename="${element.charname}">${element.charname}</h5>
                </div>
                <div class="card-body">
                    <span class="infoname card-text remove-btn " data-titlename="${element.charname}" data-charid="${element.id}">Remove</span>
                </div>
                `
                
                //adding the html to the li
                div.innerHTML=html;
                //appending the li to ul as a child 
                document.querySelector('#favpage').appendChild(div);
                
              
            
            });


            //get all the buttons with remove-btn class
            let all_remove = document.querySelectorAll(".remove-btn")

            //get all the fav cards
            let all_cards = document.querySelectorAll(".innershell")
            
            all_remove.forEach(btn =>{
                btn.addEventListener('click', () => {
                    let charid = btn.getAttribute("data-charid")
                    removefavchar(charid)
                    //console.log(charid)
                    btn.innerHTML = 'Removed'
                    let target = btn.parentElement.parentElement
                    //console.log(target)
                    target.style.animationPlayState = 'running';
                    target.addEventListener('animationend', () => {
                        target.remove();
                        
                    });  
                });
                
            });

            all_cards.forEach(card =>{
                card.addEventListener('click', ()=>{

                    //console.log(card)
                    //console.log(card.querySelector('.card-title'))
                    let parentel = card.parentElement
                    let name_element = parentel.querySelector('.card-title')
                    search(name_element)
                    //console.log(name)

                });
            });



    }
            
    else{
                document.querySelector('#maintitle').innerHTML = `You Dont Have Any Fav Events Yet`
               
        }
            
       
    })
    }
    
    
}


function removefavchar(id){
    fetch(`/removefav/${id}`)
    .then(response =>response.json())
    .then(result => {
        console.log(result)
    })
}
