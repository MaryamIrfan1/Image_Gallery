const btns = document.querySelectorAll('.buttons button');
const imgs = document.querySelectorAll('.images img');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const captionText = document.getElementById('caption');
const closeBtn = document.querySelector('.modal .close');
const prevBtn = document.querySelector('.modal .prev');
const nextBtn = document.querySelector('.modal .next');

let currentImgIndex = 0;
let filteredImgs = Array.from(imgs); 

btns.forEach((btn, index) => {
  btn.addEventListener('click', (e) => {
    if (index === 0) { 
      filteredImgs = Array.from(imgs);
    } else {
      const btnType = parseInt(e.target.dataset.btn);
      filteredImgs = Array.from(imgs).filter(img => parseInt(img.dataset.img) === btnType);
    }
    setActiveBtn(e);
    filterImg();
  });
});

function setActiveBtn(e) {
  btns.forEach((btn) => {
    btn.classList.remove('btn-clicked');
  });
  e.target.classList.add('btn-clicked');
}

function filterImg() {
  imgs.forEach((img) => {
    img.classList.remove('filtered-in', 'img-shrink');
  });

  filteredImgs.forEach((img) => {
    img.classList.add('filtered-in');
  });

  imgs.forEach((img) => {
    if (!filteredImgs.includes(img)) {
      img.classList.add('img-shrink');
    }
  });
}

imgs.forEach((img, index) => {
  img.addEventListener('click', () => {
    currentImgIndex = filteredImgs.indexOf(img);
    openModal();
  });
});

function openModal() {
  modal.style.display = "block";
  updateModalContent();
}

function closeModal() {
  modal.style.display = "none";
}

function showNext() {
  currentImgIndex = (currentImgIndex + 1) % filteredImgs.length;
  updateModalContent();
}

function showPrev() {
  currentImgIndex = (currentImgIndex - 1 + filteredImgs.length) % filteredImgs.length;
  updateModalContent();
}

function updateModalContent() {
  modalImg.src = filteredImgs[currentImgIndex].src;
  captionText.innerHTML = filteredImgs[currentImgIndex].alt;
}

closeBtn.addEventListener('click', closeModal);
nextBtn.addEventListener('click', showNext);
prevBtn.addEventListener('click', showPrev);

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

