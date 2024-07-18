if (getValue("iframed")=="true") {
    let container = document.getElementById("container")
    let column = document.getElementById("column")
    let header = document.getElementsByTagName("header")[0]

    container.insertBefore(header, container.firstChild)

    header.removeChild(header.children[0])
    header.setAttribute("style", "height:20px;width:100%")

    column.setAttribute("style","grid-template-rows:auto auto;")

    for(link of document.getElementsByTagName("a")) {
        console.log(link.href)
        link.setAttribute("href", link.href + "?&iframed=true")
    }

    document.getElementById("editorjs").style.marginBottom = "20px"
}