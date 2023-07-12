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

export default function HomePageCarousel({props}) {
  const [index, setIndex] = useState(0);
  // console.log(props[0].images)
  let img=[]
  console.log("---------------------- line 23",props);
  props.forEach(prop => {
    img.push(...prop.images)
  });
  console.log("image url....................",img[0]?.url)
  function prevSlide() {
    const isFirstSlide = index === 0;
    const newIndex = isFirstSlide ? img.length - 1 : index - 1;
    setIndex(newIndex);
    console.log(index);
  }
  function nextSlide() {
    const isLastSlide = index === img.length - 1;
    const newIndex = isLastSlide ? 0 : index + 1;
    setIndex(newIndex);
  }
  function goToSlide(slideIndex) {
    setIndex(slideIndex);
  }
  return (
    <>
    <div className="h-[360px] w-full m-auto mt-4 py-4 px-4 relative group">
      <div
        style={{ backgroundImage: `url(${img[index]?.url})`, backgroundSize:"contain"}}
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
      <div className="text-center mt-4">
        <h1 className="primaryText">Discover the property that suites you</h1>
      </div>
    </div>
    </>
  );
}
