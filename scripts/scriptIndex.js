let array   = []

function getNextArticle(num) {

    let article = ajaxReturn("GET", "/articles/article"+num+".json")

    article.then(data => {
        let json = JSON.parse(data)

        array.push(json)

        getNextArticle(num+1)

    }).catch(error => {
        console.log("there are "+(num-1)+" blog entries")

        for(i = num-2; i > -1; i--) {
            let newArticle = document.createElement("a")
            newArticle.setAttribute("class", "article")
            //newArticle.setAttribute("href", "/entry.html?blog="+array[i].data)
            newArticle.setAttribute("href", "/entries/blog"+array[i].data+".html")
    
            let newImage = document.createElement("div")
            newImage.setAttribute("class", "image")
            newImage.setAttribute("style", "background-image:url('"+array[i].imag+"');")
    
            let newContent = document.createElement("div")
            newContent.setAttribute("class", "content")
    
            let newSpan1 = document.createElement("span")
            let newSpan2 = document.createElement("span")
            let newH1 = document.createElement("h1")
            let newH4 = document.createElement("h4")
    
            newH1.innerHTML = array[i].name
            newH4.innerHTML = array[i].date
    
            newArticle.appendChild(newImage)
            newArticle.appendChild(newContent)
    
            newContent.appendChild(newSpan1)
            newContent.appendChild(newSpan2)
    
            newSpan1.appendChild(newH1)
            newSpan2.appendChild(newH4)

            document.getElementById("editorjs").appendChild(newArticle)
        }

        let newEnder = document.createElement("div")
        newEnder.setAttribute("id", "ender")

        let newEndline1 = document.createElement("div")
        newEndline1.setAttribute("class", "endline")
        let newEndline2 = document.createElement("div")
        newEndline2.setAttribute("class", "endline")

        let newEndtext = document.createElement("div")
        newEndtext.setAttribute("class", "endtext")
        let newSpan = document.createElement("span")
        newSpan.innerHTML = "That's everything!"

        newEnder.appendChild(newEndline1)
        newEnder.appendChild(newEndtext)
        newEnder.appendChild(newEndline2)
        newEndtext.appendChild(newSpan)

        document.getElementById("editorjs").appendChild(newEnder)
    })
}

getNextArticle(1)

/*
<article>
    <div class="image"></div>
    <div class="content">
        <span><h1>An Introduction to Plexos</h1></span>
        <span><h4>02/02/2022</h4></span>
    </div>
</article>

<div id="ender">
    <div class="endline"></div>
    <div class="endtext"><span>That's everything!</span></div>
    <div class="endline"></div>
</div>
*/



