import React from 'react';



function App() {

  const [image, setImage] = React.useState("https://consumersiteimages.trustpilot.net/business-units/5d2c243668781900017bc161-198x149-1x.jpg");
  const [imageAnalysys, setImageAnalysis] = React.useState("");

function handleAIRequest(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const query = formData.get('query');
  alert(`You searched for '${query}'`);
  const action = e.nativeEvent.submitter.value;
  if (action ==="analyze"){
    setImage(query);
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
        <p>adsdasda</p>
        </>
      )}
  </div>
}

export default App;
