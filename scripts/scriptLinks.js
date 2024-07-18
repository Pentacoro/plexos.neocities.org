let array = 
[
    {
        name: "Work Outlets",
        rows: true,
        link: 
        [
            {data: ["https://plexos.neocities.org/","assets/links/png/norrum.png","DevLog"], styl: {color: "#00A2E8", size: "50%"}},
            {data: ["https://github.com/pentacoro","assets/links/github-svgrepo-com.svg","GitHub"], styl: {color: "#24292D", size: "50%"}},
            {data: ["https://www.deviantart.com/norrum","assets/links/deviantart-svgrepo-com.svg","DeviantArt"], styl: {color: "#25D366", size: "50%"}},   
        ] 
    },
    {
        name: "Business Inquiries",
        rows: true,
        link: 
        [
            {data: ["https://www.linkedin.com/in/pentacoro/","assets/links/linkedin-svgrepo-com.svg","LinkedIn"], styl: {color: "#0E76A8", size: "50%"}},
            {data: ["mailto:valdezesco@hotmail.com","assets/links/email-svgrepo-com.svg","E-Mail"], styl: {color: "#24292D", size: "50%"}},
            {data: ["https://api.whatsapp.com/send?phone=5491130323918","assets/links/whatsapp-svgrepo-com.svg","WhatsApp"], styl: {color: "#25D366", size: "50%"}},
        ]
    },
    {
        name: "Social Media",
        rows: false,
        link: 
        [
            {data: ["https://www.twitter.com/pentacoro","assets/links/twitter-svgrepo-com.svg","Twitter"], styl: {color: "#36c1d9", size: "50%"}},
            {data: ["https://www.facebook.com/pentacoro","assets/links/facebook-svgrepo-com.svg","Facebook"], styl: {color: "#3B5998", size: "50%"}},
            {data: ["https://www.instagram.com/pentacoro","assets/links/instagram-svgrepo-com.svg","Instagram"], styl: {color: "#d455d4", size: "60%"}},
        ]
    },
    {
        name: "Norrum Plexus",
        rows: true,
        link: 
        [
            {data: ["https://discord.gg/SSmQWzzW","assets/links/discord-svgrepo-com.svg","Discord"], styl: {color: "#7289da", size: "50%"}},
            {data: ["https://steamcommunity.com/id/NorrumPlexus/","assets/links/steam-svgrepo-com.svg","Steam"], styl: {color: "#24292D", size: "50%"}},
            {data: ["https://www.youtube.com/channel/UCM98ZXt-LmDfttFZULXi5gg","assets/links/youtube-svgrepo-com.svg","Youtube"], styl: {color: "#c4302b", size: "50%"}},
        ]
    },
    {
        name: "Youtube Channels",
        rows: false,
        link: 
        [
            {data: ["https://www.youtube.com/channel/UCrP14Ec_49f7haVic8Yzf5g","assets/links/yt/pentacoro.jpg","Pentacoro"], styl: {color: "#FFFFFF", size: "100%"}},
            {data: ["https://www.youtube.com/channel/UCLH_vcf1lVXmA8wM5zcMCqQ","assets/links/yt/sebastian.jpg","Sebastian"], styl: {color: "#FFFFFF", size: "100%"}},
            {data: ["https://www.youtube.com/channel/UCwww0wC-lRMrmMvGjgU7Dhg","assets/links/yt/intiposting.jpg","Intiposting"], styl: {color: "#FFFFFF", size: "100%"}},
        ]
    },
]


for (section of array) {
    let newSection = document.createElement("div")
    newSection.setAttribute("class", "linkSection")

    let newEnder = document.createElement("div")
    newEnder.setAttribute("id", "ender")
    let newEndline1 = document.createElement("div")
    newEndline1.setAttribute("class", "endline")
    let newEndline2 = document.createElement("div")
    newEndline2.setAttribute("class", "endline")
    let newEndtext = document.createElement("div")
    newEndtext.setAttribute("class", "endtext")
    let newSpan = document.createElement("span")
    newSpan.innerHTML = section.name
    newEnder.appendChild(newEndline1)
    newEnder.appendChild(newEndtext)
    newEnder.appendChild(newEndline2)
    newEndtext.appendChild(newSpan)

    let newBox = document.createElement("div")
    newBox.setAttribute("class", "linkBox")
    newBox.classList.add((section.rows) ? "rows" : "columns")

    newSection.appendChild(newEnder)
    newSection.appendChild(newBox)

    for(let item of section.link) {
        let newLink = document.createElement("a")
        newLink.setAttribute("class", "link")
        newLink.setAttribute("target", "_blank")
        newLink.setAttribute("href", item.data[0])

        if (section.link.indexOf(item) < 2 && !section.rows) newLink.classList.add("marginRight")

        let newImag = document.createElement("div")
        newImag.setAttribute("class", "linkImage")
        newImag.setAttribute("style", "background-image:url('"+item.data[1]+"');")
        newImag.style.backgroundColor = item.styl.color
        newImag.style.backgroundSize  = item.styl.size

        let newText = document.createElement("span")
        newText.innerHTML = item.data[2]
        if (!section.rows) newText.setAttribute("class", "row")

        newLink.appendChild(newImag)
        newLink.appendChild(newText)
        if(item.data[3] && section.rows){
            let newImag2 = document.createElement("div")
            newImag2.setAttribute("class", "image")
            newImag2.setAttribute("style", "background-image:url('"+item.data[3]+"');")
            newLink.appendChild(newImag2)
        }
        newBox.appendChild(newLink)
    }

    document.getElementById("list").appendChild(newSection)
}

/*
<a href="" class="link">
    <div class="image"></div>
    <span>Something</span>
</a>

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



