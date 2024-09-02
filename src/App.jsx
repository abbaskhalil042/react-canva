import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  async function imageLoaded(query = "") {
    setLoading(true);
    try {
      const response = await fetch(
        `https://pixabay.com/api/?key=44752097-41670b06ba91a7e569811294f&q=${encodeURIComponent(
          query
        )}&image_type=photo`
      );
      const data = await response.json();
      console.log(data);
      setImages(data.hits.slice(0, 20)); // Fetch the first 20 images
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    imageLoaded();
  }, []);

  const handleSearch = () => {
    imageLoaded(search);
  };

  const handleAddCaption = (image) => {
    navigate("/canva", { state: { imageUrl: image.webformatURL } });
  };

  return (
<div>
    <div className="main">
      <div>
        <h1><span>Name :</span>Abbas khalil</h1>
        <h1><span>Email :</span>khalilabbas389@gmail.com</h1>
      </div>
      <div className="input">
        <input
          type="text"
          placeholder="search image..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="button" onClick={handleSearch}>
          Search
        </button>
      </div>

      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="image">
          {images.map((image, index) => (
            <div key={index}>
              <img
              className="image-img"
                src={image.webformatURL}
                alt={image.tags}
                // style={{ maxWidth: "100px" }}
              />
             <div>
             <button onClick={() => handleAddCaption(image)}>
                Add Caption
              </button>
             </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default App;
