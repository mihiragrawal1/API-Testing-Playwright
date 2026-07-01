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
    }
  )}

   async getEventApiCall(token,qParam){
    return await this.request.get(`${url.qaBaseURL}/events`, {
    
      headers: {
        'accept' : 'application/json',
        'Authorization' : 'Bearer ' + token
      },
      params: qParam
    });
   }
   
   async createNewEvent(token,requestPayload){

    return await this.request.post(`${url.qaBaseURL}/events`, {
      data:requestPayload,
      headers: {
        'Authorization' : 'Bearer ' + token
      }
    })
   }

   async deleteEventApiCall(token,eventID){
    return await this.request.delete(`${url.qaBaseURL}/events/${eventID}`, {
      headers: {
        'accept' : 'application/json',
        'Authorization' : 'Bearer ' + token
      },
      
    });
   }

   async createBookingApiCall(token,eventID,bookingDetails){
    return await this.request.post(`${url.qaBaseURL}/bookings`, {
      data:{
        "eventId": eventID,
        ...bookingDetails

      },
      headers:{
        accept : 'application/json',
        contentType : 'application/json',
        Authorization : 'Bearer ' + token 
      }
    })
   }

   async getBookingDetailsApiCall(token,eventID){
    return await this.request.get(`${url.qaBaseURL}/events/bookings`, {
      headers:{
        accept : 'application/json'
      },
      params:{
        eventId : eventID,
        page: 1,
        limit: 10,
        status: 'confirmed'
      }
    })
    }




      
  
}