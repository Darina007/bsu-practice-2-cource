class AddPostEvent {
    async initializeAddPostButton() {
        let button = document.getElementById("add-post");
        button.addEventListener("click", async () => {
            await addPostEvent.initializeAddPostArea();
        })
    }

    async initializeAddPostArea() {
        let addPostArea = document.querySelector('[class = "add-post-form"]');
        if (!addPostArea) {
            addPostArea = addPostEvent.drawPostArea();
            await postEvent.setNewPostEventListener(addPostArea);
            document.getElementById("new-post-form").onsubmit = () => {
                return false;
            }
        } else {
            addPostEvent.removePostArea();
        }
    }

    fillAddPostFields(postForm) {
        let validateUntil = postForm.getElementById('validate-until-field');
        validateUntil.value = view.postViewer.dateForm(new Date());
        let author = postForm.getElementById('author');
        author.textContent = view.getUser();
    }

    drawPostArea() {
        let dataField = document.createElement("div");
        let container = document.getElementById("container");
        let _addPostTemplate = document.getElementById("new-post-template");
        dataField.className = "add-post-form";
        let postForm = document.importNode(_addPostTemplate.content, true);
        addPostEvent.fillAddPostFields(postForm);
        dataField.appendChild(postForm);
        container.insertBefore(dataField, container.firstChild);
        return dataField;
    }

    removePostArea() {
        let dataField = document.querySelector('[class = "add-post-form"]');
        dataField.remove();
    }

    fillNewPostData() {
        const image = document.getElementById('img-file').files[0].name;
        const validateUntil = document.getElementById('validate-until-field').value;
        const description = document.getElementById('description-field').value;
        const discount = document.getElementById('discount-field').value;
        const tagsStr = document.getElementById('hashTags-field').value;
        let tags = tagsStr.split(' ');
        let post = {};
        post.id = Date.now().toString(32) + (Math.random() * Math.pow(2, 20)).toString(32);
        post.description = description;
        post.author = view.getUser();
        post.photoLink = image;
        post.createdAt = new Date();
        post.validateUntil = new Date(validateUntil);
        post.discount = discount;
        post.hashTags = tags;
        post.likes = [];
        post.comments = [];
        return post;
    }

    async postData(postData, url) {
        return await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        }).then(response => response.status);
    }

    async postPhoto(photo, url) {
        let formData = new FormData();
        formData.append("image", photo, photo.name);
        return await fetch(url, {
            method: 'POST',
            body: formData
        }).then(response => response.status);
    }
}

(() => {
    window.addPostEvent = new AddPostEvent();
})();