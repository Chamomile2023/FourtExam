"use strict";
const elTemplateBook = document.querySelector(".templete_2");
const elListBook = document.querySelector(".second__list");
const elSpan = document.querySelector(".span");
const elInputSearch = document.querySelector(".input");
const elSpanAll = document.querySelector(".all");
const elSortByYear = document.querySelector(".button_mid");
const elSortBtn = document.querySelector(".mid__btn");
const elBookmarkList = document.querySelector(".first__list");
const elBookmarkBtn = document.querySelector(".bookmark");
const elDeletIcon=document.querySelector(".deleteIcon");
const elRead=document.querySelector(".Read");
const elReadBookmark=document.querySelector(".read");
const elModal=document.querySelector(".modal__modal");
const elOverlay = document.querySelector(".modal__overlay");

let search = "panda";
let page = "1";
let maxResult = "12";
let orderBy = "relevance";
elSpan.textContent = maxResult;

let bookmarkArr=[];
let fullArr=[];

//SORT
mid__btn.addEventListener("click", function (e) {
    orderBy = "newest";
    getBooks();
});

const renderBook = function (array, htmlElement) {
    elListBook.innerHTML = null;

    array.forEach((book) => {
        const html = `
        <li class="second__item">
        <div class="second__image">
            <img src="${book.volumeInfo?.imageLinks.smallThumbnail}" alt="" class="second__img">
        </div>
        <h4 class="title">${book.volumeInfo?.title}</h4>
        <p class="writer">${book.volumeInfo?.authors}</p>
        <span class="year">${book.volumeInfo?.publishedDate}</span>
        <div class="second__btns">
            <button class="bookmark" data-delete='${book?.id}'>Bookmark</button>
            <button class="MoreInfo">More Info</button>
            <a class="link" href="${book.volumeInfo.previewLink}><button class="Read">Read</button></a>
        </div>
    </li>
        `;
        elListBook.insertAdjacentHTML("beforeend", html);
    });
};

const renderBookmark = function (arr, htmlElement) {
    elBookmarkList.innerHTML = null;

    arr.forEach((bookmark) => {
        const html = `
        <li class="first__item">
        <div class="text">
            <h4 class="first__tite">${bookmark.volumeInfo?.title}</h4>
            <p class="author">${bookmark.volumeInfo?.authors}</p>
        </div>
        <div class="icons">
        <a href="${bookmark.volumeInfo.previewLink}" class="links"> <img class="read" src="./img/read.png" alt=""></a>
            <img src="./img/delete.png" alt="" class="deleteIcon" data-delete='${bookmark?.id}'>
        </div>
    </li>
        `;
        elBookmarkList.insertAdjacentHTML("beforeend", html); 
    });
};

// RENDER CLOSE MODAL
let closeModal = () => {
    elModal.classList.remove('modal__modal--active');
    elOverlay.classList.remove('modal__overlay--active')
}
//MODAL
const renderModal=(element, htmlElement)=>{
    htmlElement.innerHTML="";

    let modalInfo=document.createElement("div");
    let modalTitle=document.createElement("h4")
    let modalXimg=document.createElement("img")
    let modalBookImg=document.createElement("img")
    let modalText=document.createElement("p");
    let modalAutho=document.createElement("p");
    let modalPublished=document.createElement("p");
    let modalPublisher=document.createElement("p");
    let modalCategories=document.createElement("p");
    let modalPage=document.createElement("p");
    let modalWrapper=document.createElement("div");
    let modalBtn=document.createElement("a");
    let modalPublishedWrapper=document.createElement("span");
    let modalPublisherWrapper=document.createElement("span");
    let modalPageWrapper=document.createElement("span");

    modalInfo.setAttribute("class", "modal__info");
    modalTitle.setAttribute("class", "modal__title");
    modalXimg.setAttribute("class", "modal__x");
    modalXimg.setAttribute("src", "./img/x.png");
    modalBookImg.setAttribute("src", element.volumeInfo.imageLinks?.thumbnail);
    modalBookImg.setAttribute("class", "modal__img");
    modalBookImg.setAttribute("alt", "something went wrong");
    modalText.setAttribute("class", "modal__text");
    modalAutho.setAttribute("class", "modal__author");
    modalPublished.setAttribute("class", "modal__published");
    modalPublisher.setAttribute("class", "modal__publisher");
    modalCategories.setAttribute("class", "modal__categories");
    modalPage.setAttribute("class", "modal__page");
    modalBtn.setAttribute("class", "modal__btn");
    modalBtn.setAttribute('href',item.volumeInfo.previewLink)
    modalWrapper.setAttribute('class','modal__wrapper')

    modalTitle.textContent=element.volumeInfo?.title;
    modalText.textContent=element.volumeInfo?.description;

    modalAutho.textContent="Authors :";
    modalPublished.textContent="Published :";
    modalPublisher.textContent="Publishers :";
    modalCategories.textContent="Categories :";
    modalPage.textContent="Pages Count :"
    modalBtn.textContent="Read"

    element.volumeInfo.authors?.forEach(item=>{
        let name=document.createElement("span");
        name.setAttribute("class", "modal__author-name");
        name.textContent=item;
        modalAutho.appendChild(name);
    })
    element.volumeInfo.categories?.forEach(item=>{
        let name=document.createElement("span");
        name.setAttribute("class", "modal__author-name");
        name.textContent=item;
        modalCategories.appendChild(name);
    })
    modalPublishedWrapper.setAttribute('class','modal__author-name')
    modalPublishedWrapper.textContent=element.volumeInfo?.publishedDate;
    modalPublished.appendChild(modalPublishedWrapper)

    modalPublisherWrapper.setAttribute('class','modal__author-name')
    modalPublisherWrapper.textContent=element.volumeInfo?.publisher;
    modalPublisher.appendChild(modalPublisherWrapper);

    modalPageWrapper.setAttribute('class','modal__author-name');
    modalPageWrapper.textContent=element.volumeInfo?.pageCount;
    modalPage.appendChild(modalPageWrapper)

    htmlElement.appendChild(modalInfo);
    modalInfo.append(modalTitle)
    modalInfo.append(modalXimg);
    htmlElement.appendChild(modalBookImg);
    htmlElement.appendChild(modalText);
    htmlElement.appendChild(modalAutho);
    htmlElement.appendChild(modalPublished);
    htmlElement.appendChild(modalPublisher);
    htmlElement.appendChild(modalCategories);
    htmlElement.appendChild(modalPage);
    htmlElement.appendChild(modalWrapper)
    modalWrapper.appendChild(modalBtn)
}

elListBook.addEventListener("click", function(event){
    if(event.terget.matches(".MoreInfo")){
        let moreInfoBtnId = e.target.dataset.more;
        let findElement = array.find(item => item.id === moreInfoBtnId);
        elModal.classList.add('modal__modal--active');
        elOverlay.classList.add('modal__overlay--active')
        renderMoreInfoModal(findElement, elModal)
    }
    else if (e.target.matches('.bookmark')) {
        let bookmarkId = e.target.dataset.bookmark;
        let findElement = array.find(item => item.id === bookmarkId);
        if (!bookmarkArr.includes(findElement)) bookmarkArr.push(findElement);
        window.localStorage.setItem('bookmarks',JSON.stringify(bookmarkArr));
        renderBookmark(bookmarkArr, elBookmarkList);
    }
})

elModal.addEventListener('click',(e)=>{
    if(e.target.matches('.modal__x')){
        closeModal();
    }
})

elOverlay.addEventListener('click', closeModal)

document.addEventListener('keydown', (e) => {
    if (e.keyCode === 9) {
        elModal.classList.remove('modal__modal--active');
        elOverlay.classList.remove('modal__overlay--active')
    }
})

elInputSearch.addEventListener("change", function () {
    const inputValue = elInputSearch.value;

    search = inputValue;

    getBooks();
});

prev.addEventListener("click", function () {
    page--;
    getBooks();
});

next.addEventListener("click", function () {
    page++;
    getBooks();
});

btn.addEventListener("click", function () {
    window.localStorage.removeItem("token");
    window.location.replace("index.html");
});

elListBook.addEventListener("click", function (evt){
    if(evt.target.matches(".bookmark")){
        let bookmarkId=evt.target.dataset.delete;
        var foundBookmark=fullArr.find(item=>item.id===bookmarkId)
        if(!bookmarkArr.includes(foundBookmark)){
            bookmarkArr.push(foundBookmark)
        }
        elBookmarkList.innerHTML="";
        renderBookmark(bookmarkArr, elBookmarkList)
    }
})
elBookmarkList.addEventListener("click", function (evt){
    if(evt.target.matches(".deleteIcon")){
        let bookmarkId=evt.target.dataset.deleteId;
        var foundBookmark=fullArr.find(item=>item.id===bookmarkId)
        bookmarkArr.splice(foundBookmark,1)
        elBookmarkList.innerHTML="";
        renderBookmark(bookmarkArr, elBookmarkList)
    }
})

const getBooks = async function () {
    const request = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=${maxResult}&startIndex=${page}&orderBy=${orderBy}`
    );
    const data = await request.json();
    elSpanAll.textContent = data.totalItems;
    fullArr=data.items;
    if (data.items && data.items.length > 0) {
        renderBook(data.items, elListBook);
    }
};
getBooks();
