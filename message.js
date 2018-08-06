!function () {
    var model = Model({resourceName:'message'})

    var view = document.querySelector('div.weisha')

    var controller = Controller({
        messagelist:null,
        form:null,
        init: function (view, controller) {
            this.messagelist = view.querySelector('#messagelist')
            this.form = view.querySelector('form')
            this.loadmessages()
        },
        loadmessages: function () {
            this.model.fetch().then(
                (m) => {
                    let ol = document.querySelector('#messagelist'),
                    docfrag = document.createDocumentFragment();
                    let array = m.map((item) => item.attributes)
                    array.forEach((item) => {
                        let li = document.createElement("li");
                        li.innerText = `${item.name2}:${item.content}`;
                        docfrag.appendChild(li);
                    });
                    
                    ol.appendChild(docfrag);
                    
                })
                    /*let array = m.map((item) => item.attributes)
                    let str = ""
                    array.forEach((item) => {
                        str += `<li>${item.name2}:${item.content}</li>`
                    })
                    document.getElementById('messagelist').innerHTML = str;
                    })*/
        },
        
        bindevents: function () {
            this.form.addEventListener('submit', function (e) {
                e.preventDefault()
                let myform = this.form
                if(myform.querySelector('input[name=content]').value!==''||myform.querySelector('input[name=name]').value!==''){
                    this.savemessage()
                }

                
            }.bind(this))
        },
        savemessage: function () {
            let myform = this.form
            let content = myform.querySelector('input[name=content]').value
            let name = myform.querySelector('input[name=name]').value
            this.model.save({'name2':name,'content':content})
                .then(function (object) {
                    let li = document.createElement('li')
                    li.innerText = `${object.attributes.name2}:${object.attributes.content} `
                    messagelist.appendChild(li)
                    myform.querySelector('input[name=content]').value= ''
                    myform.querySelector('input[name=name]').value= ''
                })
                
        }
    })
   

    controller.init(view, model)
   
}.call()
