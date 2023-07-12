import { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
const images = [
  {
    url: "https://images.pexels.com/photos/1486785/pexels-photo-1486785.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    url: "https://images.pexels.com/photos/87223/pexels-photo-87223.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    url: "https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    url: "https://images.pexels.com/photos/208736/pexels-photo-208736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

export default function SinglePropertyCarousel({images}) {
  const [index, setIndex] = useState(0);
  // console.log(props[0].images
  function prevSlide() {
    const isFirstSlide = index === 0;
    const newIndex = isFirstSlide ? images.length - 1 : index - 1;
    setIndex(newIndex);
    console.log(index);
  }
  function nextSlide() {
    const isLastSlide = index === images.length - 1;
    const newIndex = isLastSlide ? 0 : index + 1;
    setIndex(newIndex);
  }
    // console.log(images[0].url)
  function goToSlide(slideIndex) {
    setIndex(slideIndex);
  }
  return (
    <div className="max-w-[1400px] h-[470px] pb-4 w-full m-auto mt-2 px-4 relative group">
      <div
        style={{ backgroundImage: `url(${images[index]?.url})`, backgroundSize:"contain"}}
        className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
      ></div>
      <div
        onClick={prevSlide}
        className="hidden group-hover:block absolute top-[50%] -translate-x-0 -translate-y-[50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
      >
        <BsChevronCompactLeft />
      </div>
      <div
        onClick={nextSlide}
        className="hidden group-hover:block absolute top-[50%] -translate-x-0 -translate-y-[50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
      >
        <BsChevronCompactRight />
      </div>
      <div className="flex top-4 justify-center py-2">
        {images.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className="text-xl cursor-pointer"
          >
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>
  );
}
