import {test,expect,request} from '@playwright/test';
import{registerUserApiPayload,newEventData,invalidEventId} from '../../test-data/eventApiRequestData';
import {EventApiCalls} from '../../utils/api/eventApiCalls';

let extractedToken;
let createdEventId;

test.beforeAll('Setup for delete event API tests', async ({request}) => {
    const apicalls=new EventApiCalls(request);
    const response = await apicalls.registerNewUser(registerUserApiPayload());
    await expect(response.status()).toBe(201);
    const respJson=await response.json();   
    extractedToken = respJson.token;
    const createEvenetResponse = await apicalls.createNewEvent(extractedToken,newEventData);
    await expect(createEvenetResponse.status()).toBe(201);
    const createEventRespJson=await createEvenetResponse.json();
    createdEventId=createEventRespJson.data.id;
    
})

test('validate delete event api return success as true and delete event successfully when valid and correct event id is given',async ({request})=>{
 const apicalls=new EventApiCalls(request);
 const deleteEventResponse = await apicalls.deleteEventApiCall(extractedToken,createdEventId);
 await expect(deleteEventResponse.status()).toBe(200);
 const deleteEventRespJson=await deleteEventResponse.json();
 await expect(deleteEventRespJson).toHaveProperty('success');
 await expect(deleteEventRespJson.success).toBe(true);
 await expect (deleteEventRespJson).toHaveProperty('message');
 await expect(deleteEventRespJson.message).toBe("Event deleted successfully");

})

test('validate delete event api return success as false  when invalid event id is given',async ({request})=>{
 const apicalls=new EventApiCalls(request);
 const deleteEventResponse = await apicalls.deleteEventApiCall(extractedToken,invalidEventId);
 await expect(deleteEventResponse.status()).toBe(404);
 const deleteEventRespJson=await deleteEventResponse.json();
 await expect(deleteEventRespJson).toHaveProperty('success');
 await expect(deleteEventRespJson.success).toBe(false);
 await expect (deleteEventRespJson).toHaveProperty('error');
 await expect(deleteEventRespJson.error).toContain("not found");

})

