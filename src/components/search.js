import { useState } from 'react';
import axios from 'axios';

export default function App() {
    const [word, setWord] = useState("");
    const [hits, setHits] = useState([]); // Initialize hits as an empty array

    const handleChange = (event) => {
        setWord(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const apiUrl = `http://localhost:9200/flickerphotos/_search?q=${word}`;

       
          
          try {
            const response = await fetch(apiUrl);
            const responseData = await response.json();
          
            // Access the hits data
            const hitsData = responseData.hits.hits;
          
            // Update the state with the hits array
            setHits(hitsData);
          } catch (error) {
            console.error('Error:', error);
          }
    };

    return (
        <main>
            <div class="container">
                <h1>ElasticSearch</h1>
                <h2>Type your keyword</h2>
                <div class="search-box">
                    <div class="search-icon"><i class="fa fa-search search-icon"></i></div>
                    <form onSubmit={handleSubmit} class="search-form">
                        <input type="text" onChange={handleChange} placeholder="Search" id="search" autocomplete="off" />
                    </form>
                    <svg
                        className="search-border"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        xmlnsA="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
                        x="0px"
                        y="0px"
                        viewBox="0 0 671 111"
                        style={{ enableBackground: 'new 0 0 671 111' }}
                    >
                        <path className="border" d="M335.5,108.5h-280c-29.3,0-53-23.7-53-53v0c0-29.3,23.7-53,53-53h280" />
                        <path className="border" d="M335.5,108.5h280c29.3,0,53-23.7,53-53v0c0-29.3-23.7-53-53-53h-280" />
                    </svg>
                    <div class="go-icon"><i class="fa fa-arrow-right"></i></div>
                    
                </div>
                {hits.length > 0 && (
                <div>
                    
                    <ul>
                        {hits.length > 0 && (
                            <div>
                                <br></br>
                                <h2>Search Results:</h2>
                                <ul className="image-list">
                                    {hits.map((hit, index) => (
                                        <li key={index} className="image-item">
                                            {/* Display the hit data, modify this part as needed */}
                                            <img
                                                src={`http://farm${hit._source.flickr_farm}.staticflickr.com/${hit._source.flickr_server}/${hit._source.id}_${hit._source.flickr_secret}.jpg`}
                                                alt={`Image ${index}`}
                                                className="image"
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </ul>
                </div>
            )}

            </div>

        </main>
    );
}
