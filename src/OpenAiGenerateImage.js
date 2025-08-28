async function OpenAiGenerateImage(query){
  const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${process.env.REACT_APP_GENERATE_IMAGE_KEY}`);
    const raw = JSON.stringify({
      "model": "dall-e-3",
  "prompt": `${query}`,
  "size": "1024x1024",
  "style": "vivid",
  "quality": "standard",
  "n": 1
});
const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

  try {
    const response = await fetch(process.env.REACT_APP_GENERATE_IMAGE_ENDPOINT, requestOptions)
    if(!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`);  
    }
    const result = await response.json();
    console.log(result);
    return result.data[0].url;
  }catch (error) {
console.error("Image generation failed:", error);
    return null;
   }
}

export default OpenAiGenerateImage;