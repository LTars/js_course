"use strict"

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

document.addEventListener('DOMContentLoaded', createGallery);

function createGallery() {

    const fullImages = document.querySelector(".fullview");
    const prevImages = document.querySelector(".preview");

    prevImages.addEventListener('click', show);

    function createPrevImg(elem) {
        let liNode = document.createElement("li");
        let imgNode = document.createElement("img");
        imgNode.setAttribute("src", elem.preview);
        imgNode.setAttribute("alt", elem.alt);
        imgNode.dataset.fullview = elem.fullview;
        liNode.append(imgNode);
        return liNode;
    }

    function createPrevImgGallery(obj, number = 1) {
        let imgArray = obj.map(el => createPrevImg(el));

        createFullview(imgArray[number - 1].firstElementChild.dataset.fullview, imgArray[number].firstElementChild.alt);
        imgArray[number - 1].classList.add("active");
        return imgArray;
    }

    function createFullview(src = 'img/fullview-1.jpg', alt = 'alt text 1') {
        let fullImagesNode = document.createElement('img');
        fullImagesNode.setAttribute("src", src);
        fullImagesNode.setAttribute("alt", alt);
        fullImages.append(fullImagesNode);
    }

    let prevImagesArray = createPrevImgGallery(galleryItems, 1);

    prevImages.append(...prevImagesArray);

    function show({target}) {
        if (target.nodeName !== "IMG")
            return;

        let uri = target.dataset.fullview;
        let altText = target.alt;
        fullImages.firstElementChild.src = uri;
        fullImages.firstElementChild.alt = altText;


        prevImagesArray.forEach(link => {

            if (link.firstElementChild !== target) {
                link.classList.remove("active");
            } else {
                link.classList.add("active");
            }
        });
    }

}