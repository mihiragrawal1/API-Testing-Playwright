import { url } from '../../baseFile.js';

export class EventApiCalls {
   constructor(request) {
      this.request = request;
   }

   async registerNewUser(requestPayload) {
    return await this.request.post(`${url.qaBaseURL}/auth/register`, {
      data: requestPayload,
      headers: {
        'Content-Type': 'application/json',
        'accept' : 'application/json'
      }
    });
   }

   async getEventApiCall(token,qParam){
    return await this.request.get(`${url.qaBaseURL}/events`, {
    
      headers: {
        'accept' : 'application/json',
        'Authorization' : 'Bearer ' + token
      },
      params: qParam
    });
   }
   
}