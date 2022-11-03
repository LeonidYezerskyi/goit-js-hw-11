export { getScroll };

const galleryList = document.querySelector('.gallery');

function getScroll() {
  const { height: cardHeight } =
    galleryList.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
