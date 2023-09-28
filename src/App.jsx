import { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    function lazyLoadImages(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute('data-src');

          if (src) {
            img.setAttribute('src', src);
            img.removeAttribute('data-src');
            img.classList.remove('lazy-load');
            observer.unobserve(img); // Stop observing once loaded
          }
        }
      });
    }

    const observer = new IntersectionObserver(lazyLoadImages, {
      root: null, // Use the viewport as the root
      rootMargin: '0px', // No margins
      threshold: 0.1, // 10% of the image must be in the viewport
    });
    // Select all images with data-src attribute
    const lazyImages = document.querySelectorAll('img[data-src].lazy-load');

    // Start observing each lazy image
    lazyImages.forEach((img) => {
      observer.observe(img);
    });
  }, []);

  return (
    <div className="gallery">
      {[...Array(48)].map((_, i) => (
        <Image
          key={i}
          src={`https://source.unsplash.com/random/200x200?sig=${i}`}
        />
      ))}
    </div>
  );
}

const Image = ({ src }) => {
  return (
    <div className="gallery_image">
      <img
        className="lazy-load"
        src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
        data-src={src}
      />
    </div>
  );
};

export default App;
