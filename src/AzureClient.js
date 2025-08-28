import { AzureKeyCredential } from '@azure/core-auth';
import createClient from '@azure-rest/ai-vision-image-analysis';


function AzureClient(){

  const endpoint = process.env.REACT_APP_VISION_ENDPOINT || 'https://exercise-add-image-analysis-capabilities-to-your-react-app.cognitiveservices.azure.com/';
  const key = process.env.REACT_APP_VISION_KEY ;
  console.log('Using endpoint:', process.env.REACT_APP_VISION_ENDPOINT);
  const credential = new AzureKeyCredential(key);
  const client = createClient(endpoint, credential);
  return client;
}

export default AzureClient;