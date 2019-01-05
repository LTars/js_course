"use strict";

const galleryItems = [
    {
        preview: "../img/module-8/cloudy-forest--s.jpeg",
        fullview: "../img/module-8/cloudy-forest--b.jpeg",
        alt: "cloudy forest"
    },
    {
        preview: "../img/module-8/cozy-cliff--s.jpeg",
        fullview: "../img/module-8/cozy-cliff--b.jpeg",
        alt: "cozy cliff"
    },
    {
        preview: "../img/module-8/far-horizon--s.jpeg",
        fullview: "../img/module-8/far-horizon--b.jpeg",
        alt: "far horizon"
    },
    {
        preview: "../img/module-8/highend-way--s.jpeg",
        fullview: "../img/module-8/highend-way--b.jpeg",
        alt: "highend way"
    },
    {
        preview: "../img/module-8/shiny-cliff--s.jpeg",
        fullview: "../img/module-8/shiny-cliff--b.jpeg",
        alt: "shiny cliff"
    },
    {
        preview: "../img/module-8/high-lake--s.jpeg",
        fullview: "../img/module-8/high-lake--b.jpeg",
        alt: "high lake"
    }
];

const fullImages = document.querySelector(".full-view");
const prevImages = document.querySelector(".preview");

let prevImagesArray;

document.addEventListener('DOMContentLoaded', createGallery);

function createGallery() {
    prevImages.addEventListener('click', show);

    prevImagesArray = createPrevImgGallery(galleryItems, 0);

    prevImages.append(...prevImagesArray);
}

function createPrevImg(elem) {
    let liNode = document.createElement("li");
    let imgNode = document.createElement("img");
    imgNode.setAttribute("src", elem.preview);
    imgNode.setAttribute("alt", elem.alt);
    imgNode.dataset.fullview = elem.fullview;
    liNode.append(imgNode);
    return liNode;
}

function createPrevImgGallery(obj) {
    let imgArray = obj.map(elem => createPrevImg(elem));
    console.log(imgArray, imgArray[0]);
    createFullView(imgArray[0].firstElementChild.dataset.fullview, imgArray[0].firstElementChild.alt);
    imgArray[0].classList.add("active");
    return imgArray;
}

function createFullView(src, alt) {
    let fullImagesNode = document.createElement('img');
    fullImagesNode.setAttribute("src", src);
    fullImagesNode.setAttribute("alt", alt);
    fullImages.append(fullImagesNode);
}

function show({target}) {
    if (target.nodeName !== "IMG")
        return;

    let url = target.dataset.fullview;
    let altText = target.alt;
    fullImages.firstElementChild.src = url;
    fullImages.firstElementChild.alt = altText;


    prevImagesArray.forEach(link => {

        if (link.firstElementChild !== target) {
            link.classList.remove("active");
        } else {
            link.classList.add("active");
        }
    });
}
