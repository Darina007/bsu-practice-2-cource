class CommentEvent {
    createCommentArea(postId) {
        let post = document.getElementById(postId);
        let container = post.parentNode;
        let commentArea = document.querySelector('[class = "add-comment"]');
        if (!commentArea) {
            commentEvent.drawCommentContainer(container, postId);
            commentEvent.createCommentMarkButtons();
            commentEvent.initializeCommentForm(postId);
        } else {
            container.classList.remove("post-dedicated");
            commentArea.remove();
        }
    }

    drawCommentContainer(container, postId) {
        container.classList.add("post-dedicated");
        let commentArea = commentEvent.drawCommentArea();
        container.appendChild(commentArea);
        commentEvent._loadComments(postId);
        let addCommentArea = document.querySelector('[class="new-user-comment"]');
        commentEvent.drawAddCommentArea(addCommentArea);
    }

    drawCommentArea() {
        let commentTemplate = document.getElementById("comment-area-template");
        let comment = document.importNode(commentTemplate.content, true);
        let commentArea = document.createElement('div');
        commentArea.className = "add-comment";
        commentArea.appendChild(comment);
        return commentArea;
    }

    drawAddCommentArea(container) {
        if (view.isAuthorized()) {
            let addCommentTemplate = document.getElementById("add-comment-template");
            let addComment = document.importNode(addCommentTemplate.content, true);
            container.appendChild(addComment);
        } else {
            let addCommentMessage = document.createElement("div");
            addCommentMessage.id = "new-comment-form";
            let message = document.createElement("div");
            message.id = "comment-text-input";
            message.textContent = "Sign in to leave a comment";
            addCommentMessage.appendChild(message);
            container.appendChild(addCommentMessage);
        }
    }

    initializeCommentForm(postId) {
        let commentForm = document.getElementById("new-comment-form");
        commentForm.onsubmit = () => {
            return false;
        }
        commentForm.addEventListener("submit", () => {
            let mark = commentEvent.fillCommentMark();
            commentEvent.addComment(postId, mark);
            commentForm.reset();
            commentEvent.redrawReviewButtons(0);
        })
    }

    updateCommentMark() {
        let button = event.target;
        let numb = button.id.substr(button.id.length - 1);
        commentEvent.redrawReviewButtons(numb);
        return numb;
    }

    fillCommentMark() {
        let mark = document.querySelector('[class="review-buttons"]');
        for (let i = 5; i >= 1; i--) {
            let button = mark.childNodes[i - 1];
            if (button.lastChild.alt === "star_pressed") {
                return i;
            }
        }
    }

    addComment(postId, markValue) {
        let commentData = {};
        let text = document.getElementById("comment-text-input");
        commentData.commentText = text.value;
        commentData.commentDate = new Date();
        commentData.commentMark = markValue;
        commentData.commentAuthor = view.getUser();
        let requestObject = commentData;
        requestObject.id = postId;
        commentEvent.postComment(requestObject, "/post/comment").then((response) => {
            if (response !== 200) {
                modals.createErrorModal("Error creating comment");
                return;
            }
            if (postServise.addComment(postId, commentData)) {
                commentEvent._reloadComments(postId);
            }
        })
    }

    async postComment(data, url) {
        return await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.status);
    }

    createCommentMarkButtons() {
        let mark = document.querySelector('[class="review-buttons"]');
        commentEvent.drawReviewButtons(mark);
        mark.addEventListener('click', () => {
            commentEvent.updateCommentMark();
        })
    }

    drawReviewButtons(buttonContainer, mark) {
        let button;
        for (let i = 1; i <= 5; i++) {
            if (i <= mark) {
                button = view.postViewer._drawPostButton("review-button", "star_pressed");
            } else {
                button = view.postViewer._drawPostButton("review-button", "star_unpressed");
            }
            button.lastChild.id = "review-" + i;
            buttonContainer.appendChild(button);
        }
    }

    isClearReviewButton(buttonsContainer) {
        return buttonsContainer.childNodes[0].lastChild.alt === "star_pressed";
    }

    redrawReviewButtons(mark) {
        let buttons = document.querySelector('[class="review-buttons"]');
        let flag = commentEvent.isClearReviewButton(buttons);
        while (buttons.firstChild) {
            buttons.removeChild(buttons.firstChild);
        }
        if (flag && +mark === 1) {
            commentEvent.drawReviewButtons(buttons, 0);
        } else {
            commentEvent.drawReviewButtons(buttons, mark);
        }
    }

    _loadComments(postId) {
        let post = postServise.get(postId);
        let commArr = document.querySelector('[class="user-comments"]');
        if (post.comments) {
            post.comments.reverse();
            post.comments.forEach(comment => {
                let comm = document.createElement("div");
                commArr.appendChild(comm);
                comm.className = "comment-holder";
                let commentTemplate = document.getElementById("comment-template");
                let commentField = document.importNode(commentTemplate.content, true);
                comm.appendChild(commentField);
                comment._fillComment(comment, comm);
            })
        }
    }

    _reloadComments(postId) {
        let commArr = document.querySelector('[class="user-comments"]');
        if (commArr) {
            while (commArr.lastChild) {
                commArr.removeChild(commArr.lastChild);
            }
        }
        commentEvent._loadComments(postId);
    }

    _fillComment(comment, comm) {
        let author = comm.querySelector('[id="comment-author"]');
        if (author) {
            author.textContent = comment.commentAuthor;
        }
        let date = comm.querySelector('[id="date-comment"]');
        if (date) {
            date.textContent = comment.commentDate.toDateString();
        }
        let text = comm.querySelector('[id="comment-text"]');
        if (text) {
            text.textContent = comment.commentText;
        }
        let mark = comm.querySelector('[id="comment-mark"]');
        if (mark) {
            view.postViewer._drawRating(mark, comment.commentMark);
        }
        return comm;
    }
}

(() => {
    window.commentEvent = new CommentEvent();
})();