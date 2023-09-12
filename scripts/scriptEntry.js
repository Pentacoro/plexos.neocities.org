let jsonBlog = ajaxReturn("GET", "/entries/blog"+getValue("blog")+".json")

jsonBlog.then(jsonData => {
    const editor = new EditorJS({
        logLevel: "WARN",
        holder: 'editorjs',
        readOnly: true,
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

    editor.isReady.then( () => {
        document.getElementsByClassName("codex-editor__redactor")[0].removeAttribute("style")
    })
    
}).catch(err => {
    console.log(err)
})