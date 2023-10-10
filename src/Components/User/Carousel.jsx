import React ,{useState,useEffect} from "react";

const Carousel = () => {
  // Define an array of image URLs for your carousel
  const images = [
      'http://www.norwegianfashion.net/slide_images/1486377558_slider.jpg',
      'https://www.stylior.com/site/images/home/slider_2.jpg',
      'https://www.jssor.com/premium/fashion/img/plaza.jpg',
      'https://www.jssor.com/premium/fashion/img/attitude.jpg'
    // Add more image URLs as needed
  ];

  // Initialize state to keep track of the current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Function to advance to the next image
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Use useEffect to automatically advance the carousel every 4 seconds
  useEffect(() => {
    const interval = setInterval(nextImage, 4000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      {images.map((imageUrl, index) => (
        <img
          key={index}
          src={imageUrl}
          alt={`Image ${index + 1}`}
          className={`w-full  h-72 absolute top-0 left-0 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-1000 ease-in-out`}
        />
      ))}
    </div>
  );
};

export default Carousel;