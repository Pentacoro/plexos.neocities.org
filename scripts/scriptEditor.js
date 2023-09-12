let jsonBlog = ajaxReturn("GET", "/entries/blog0.json")

jsonBlog.then(jsonData => {
    const editor = new EditorJS({
        holder: 'editorjs',
        readOnly: false,
        data: JSON.parse(jsonData),
        tools: {
            list: {
                class: NestedList,
                inlineToolbar: true,
            },
            /*image: {
                class: ImageTool,
                config: {
                    endpoints: {
                        byFile: 'http://127.0.0.1:5501/uploadFile', // Your backend file uploader endpoint
                        byUrl: 'http://127.0.0.1:5501/fetchUrl', // Your endpoint that provides uploading by Url
                    }
                }
            },*/
            table: {
                class: Table,
                inlineToolbar: true,
                config: {
                    rows: 2,
                    cols: 3,
                },
            },
            linkTool: {
                class: LinkTool,
                config: {
                    endpoint: 'http://127.0.0.1:5501/fetchUrl', // Your backend endpoint for url data fetching,
                }
            },
            /*attaches: {
                class: AttachesTool,
                config: {
                    endpoint: 'http://localhost:8008/uploadFile'
                }
            },*/
            checklist: {
                class: Checklist,
                inlineToolbar: true,
            },
            inlineCode: {
                class: InlineCode,
                shortcut: 'CMD+SHIFT+M',
            },
            footnotes: {
                class: FootnotesTune,
            },
            header: Header,
            warning: Warning,
            raw: RawTool,
            quote: Quote,
            image: SimpleImage,
            embed: Embed,
    
        }
    })

    function saver(){
        editor.save().then((outputData) => {
            console.log('Article data: ', outputData)
            
            downloadObjectAsJson(outputData, "blog")
        }).catch((error) => {
            console.log('Saving failed: ', error)
        })
    }

    function toHTML() {
        editor.save().then((outputData) => {
            let newArticle = document.createElement("article")

            for (let block of outputData.blocks) {
                switch (block.type) {
                    case ("header"):
                        let newH = document.createElement("h"+block.data.level)
                        newH.innerHTML = block.data.text
                        newArticle.appendChild(newH)
                        newArticle.innerHTML += "\n\n\t"
                        break
                    case ("paragraph"):
                        let newP = document.createElement("p")
                        newP.innerHTML = block.data.text
                        newArticle.appendChild(newP)
                        newArticle.innerHTML += "\n\n\t"
                        break
                    case ("image"):
                        let newFigure1 = document.createElement("figure")
                        let newImg = document.createElement("img")
                        newImg.setAttribute("src", block.data.url)
                        let newFigCaption1 = document.createElement("figcaption")
                        newFigCaption1.innerHTML = block.data.caption
                        newFigure1.innerHTML += "\n\t\t"
                        newFigure1.appendChild(newImg)
                        newFigure1.innerHTML += "\n\t\t"
                        newFigure1.appendChild(newFigCaption1)
                        newFigure1.innerHTML += "\n\t"
                        newArticle.appendChild(newFigure1)
                        newArticle.innerHTML += "\n\n\t"
                        break
                    case ("list"):
                        if (block.data.style === "unordered") {
                            let newUl = document.createElement("ul")
                            newUl.innerHTML += "\n\t"
                            for (let item of block.data.items){
                                let newLi = document.createElement("li")
                                newLi.innerHTML = item.content
                                newUl.innerHTML += "\t"
                                newUl.appendChild(newLi)
                                newUl.innerHTML += "\n\t"
                            } 
                            newArticle.appendChild(newUl)
                            newArticle.innerHTML += "\n\n\t"
                        } else {
                            let newOl = document.createElement("ol")
                            newOl.innerHTML += "\n\t"
                            for (let item of block.data.items){
                                let newLi = document.createElement("li")
                                newLi.innerHTML = item.content
                                newOl.innerHTML += "\t"
                                newOl.appendChild(newLi)
                                newOl.innerHTML += "\n\t"
                            }
                            newArticle.appendChild(newOl)
                            newArticle.innerHTML += "\n\n\t"
                        }
                        break 
                    case ("embed"):
                        let newFigure2 = null
                        let regexId = null
                        let tweetId = null
                        let newIframe = null
                        let newFigCaption2 = null
                        switch (block.data.service){
                            case ("twitter"):
                                /**/newFigure2 = document.createElement("figure")
                                /**/regexId = /(?<=twitter\.com\/.*\/.*\/)\d{19}/
                                /**/tweetId = block.data.source.match(regexId)
                                /**/newIframe = document.createElement("iframe")
                                newIframe.setAttribute("class", "embTwitter")
                                newIframe.setAttribute("src", "https://platform.twitter.com/embed/Tweet.html?dnt=false&embedId=twitter-widget-0&features=eyJ0ZndfdHdlZXRfZWRpdF9iYWNrZW5kIjp7ImJ1Y2tldCI6Im9mZiIsInZlcnNpb24iOm51bGx9LCJ0ZndfcmVmc3JjX3Nlc3Npb24iOnsiYnVja2V0Ijoib2ZmIiwidmVyc2lvbiI6bnVsbH0sInRmd190d2VldF9yZXN1bHRfbWlncmF0aW9uXzEzOTc5Ijp7ImJ1Y2tldCI6InR3ZWV0X3Jlc3VsdCIsInZlcnNpb24iOm51bGx9LCJ0Zndfc2Vuc2l0aXZlX21lZGlhX2ludGVyc3RpdGlhbF8xMzk2MyI6eyJidWNrZXQiOiJpbnRlcnN0aXRpYWwiLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X2V4cGVyaW1lbnRzX2Nvb2tpZV9leHBpcmF0aW9uIjp7ImJ1Y2tldCI6MTIwOTYwMCwidmVyc2lvbiI6bnVsbH0sInRmd191c2VyX2ZvbGxvd19pbnRlbnRfMTQ0MDYiOnsiYnVja2V0IjoiZm9sbG93IiwidmVyc2lvbiI6bnVsbH0sInRmd190d2VldF9lZGl0X2Zyb250ZW5kIjp7ImJ1Y2tldCI6Im9mZiIsInZlcnNpb24iOm51bGx9fQ%3D%3D&frame=false&hideCard=false&hideThread=false&id="+tweetId[0]+"&lang=en&origin=https%3A%2F%2Ftwitframe.com%2Fshow%3Furl%3Dhttps%3A%2F%2Ftwitter.com%2Fchibikki_ikki%2Fstatus%2F"+tweetId[0]+"&sessionId=7a11e5352ea0fecd2e838dcf8edd205071764cd1&theme=light&widgetsVersion=b45a03c79d4c1%3A1654150928467&width=550px")
                                /**/newFigCaption2 = document.createElement("figcaption")
                                newFigCaption2.innerHTML = block.data.caption
                                newFigure2.appendChild(newIframe)
                                newFigure2.appendChild(newFigCaption2)
                                newArticle.appendChild(newFigure2)
                                newArticle.innerHTML += "\n\n\t"
                                break
                            //case ("youtube"):
                            //case ("instagram"):
                            default:
                                /**/newFigure2 = document.createElement("figure")
                                /**/newIframe = document.createElement("iframe")
                                newIframe.setAttribute("class", "embIframe")
                                newIframe.setAttribute("src", block.data.embed)
                                /**/newFigCaption2 = document.createElement("figcaption")
                                newFigCaption2.innerHTML = block.data.caption
                                newFigure2.appendChild(newIframe)
                                newFigure2.appendChild(newFigCaption2)
                                newArticle.appendChild(newFigure2)
                                newArticle.innerHTML += "\n\n\t"
                        }
                    //case ():
                }
            }

            console.log(newArticle.innerHTML)
            downloadObjectAsHtml("<article>"+newArticle.innerHTML+"</article>", "blog")

        }).catch((error) => {
            console.log('HTML generation failed: ', error)
        })
    }

    let down = document.getElementById('down')
    let html = document.getElementById('html')
    down.onclick = saver
    html.onclick = toHTML
    
}).catch(err => {
    console.log(err)
})