import React from 'react';
import AzureClient from './AzureClient.js';
import OpenAiGenerateImage from './OpenAiGenerateImage.js';



async function analyzeImage(client, imageUrl, features) {
  const result = await client.path('/imageanalysis:analyze').post({
  body: {
      url: imageUrl
  },
  queryParameters: {
      features: features,
      'language': 'en',
      'gender-neutral-captions': 'true',
      'smartCrops-aspect-ratios': [0.9, 1.33]
  },
  contentType: 'application/json'
});
return JSON.stringify(result.body);
}


function App() {

  const [image, setImage] = React.useState("https://static.vecteezy.com/system/resources/thumbnails/008/951/892/small_2x/cute-puppy-pomeranian-mixed-breed-pekingese-dog-run-on-the-grass-with-happiness-photo.jpg");
  const [imageAnalysys, setImageAnalysis] = React.useState("");

async function handleAIRequest(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const query = formData.get('query');
  alert(`You searched for '${query}'`);
  const action = e.nativeEvent.submitter.value;
  const client = AzureClient();
    const features = [
  'Caption',
  'DenseCaptions',
  'Objects',
  'People',
  'Read',
  'SmartCrops',
  'Tags'
  ];
  if (action ==="analyze"){
    setImage(query);
    

    setImageAnalysis(await analyzeImage(client, query, features));
  }
  if(action ==="generate"){
    const generatedImageURL = await OpenAiGenerateImage(query);
    setImage(generatedImageURL);
    setImageAnalysis(await analyzeImage(client, generatedImageURL, features));
  }
}



  return  <div> 
  <h1>Computer Vision</h1>
  <p>Insert URL ot type prompt : </p>
  <form onSubmit={handleAIRequest}>
    <input name="query"/>
    <button type="submit" value="generate">Generate</button>
    <button type="submit" value="analyze">Analyze</button>
  </form>
        <img
          src={image}
          alt="AI generated or analyzed"
          style={{ maxWidth: '500px', marginTop: '20px' }}
        />
      {imageAnalysys && (
        <>
        <h1>Your analysys results will appear here</h1>
        <p>{imageAnalysys}</p>
        </>
      )}
  </div>
}

export default App;
