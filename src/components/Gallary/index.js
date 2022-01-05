import "./style.css";
import { Carousel } from "./lib";

function Gallary() {
  const data = [
    {
      image:
        "https://www.bayut.sa/blog/wp-content/uploads/2020/06/Best-Burger-In-RiyadhENAR06022020.jpg",
      caption: `<div>
      Burger      </div>`,
    },
    {
      image:
        "https://tarket3mal.com/Content/Admin/Uploads/Articles/View/161/02b6862e-3e14-44e2-bf2b-a7efa76b87cb.jpg",
      caption: "<div>Burger</div>",
    },
    {
      image:
        "https://media-cdn.tripadvisor.com/media/photo-s/13/dc/62/15/stake.jpg",
      caption: "<div>Stake</div>",
    },
    {
      image:
        "https://thumbor.thedailymeal.com/cpwm_3hf7CzseLljTzcr9vJ0XR4=/870x565/https://www.thedailymeal.com/sites/default/files/slideshows/3873/2223448/2-firstsubs-yelp.JPG",
      caption: "<div>Sandwich</div>",
    },
    {
      image:
        "https://simply-delicious-food.com/wp-content/uploads/2019/07/Basil-cream-sauce-1.jpg",
      caption: "<div>Pasta</div>",
    },
    {
      image:
        "https://www.comunicaffe.com/wp-content/uploads/2016/07/coffee-cup.jpg",
      caption: "Coffee",
    },
    {
      image:
        "https://images.immediate.co.uk/production/volatile/sites/30/2021/04/Pasta-alla-vodka-f1d2e1c.jpg",
      caption: "<div>Pasta</div>",
    },
    {
      image:
        "https://lh3.googleusercontent.com/I01UYtUs-gFRrvPKwwLkNdUbGEV-QbiDpI67DZVmjVc6YfGZq2w0nK2R1jAr1ensxdpnQjkRudE6rsr2aQmWlUa2D1BqC_xwuA0jVLmsVw=h450",
      caption: "<div>Ice Coffee</div>",
    },
    {
      image:
        "https://static.toiimg.com/thumb/72273915.cms?width=680&height=512&imgsize=2446987",
      caption: "<div>Shawarma</div>",
    },
  ];

  const captionStyle = {
    fontSize: "2em",
    fontWeight: "bold",
  };
  const slideNumberStyle = {
    fontSize: "20px",
    fontWeight: "bold",
  };
  return (
    <div className="App">
      <div style={{ textAlign: "center" }}>
        {/* <h2>React Carousel Minimal</h2>
        <p>
          Easy to use, responsive and customizable carousel component for React
          Projects.
        </p> */}
        <div
          style={{
            padding: "0 20px",
          }}
        >
          <Carousel
            data={data}
            time={2000}
            width="1000px"
            height="550px"
            captionStyle={captionStyle}
            radius="10px"
            slideNumber={true}
            slideNumberStyle={slideNumberStyle}
            captionPosition="bottom"
            automatic={true}
            dots={true}
            pauseIconColor="white"
            pauseIconSize="40px"
            slideBackgroundColor="darkgrey"
            slideImageFit="cover"
            thumbnails={true}
            thumbnailWidth="100px"
            showNavBtn={true}
            style={{
              textAlign: "center",
              maxWidth: "1000px",
              margin: "40px auto",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Gallary;
