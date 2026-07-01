import {test,expect} from '@playwright/test';
import { registerUserApiPayload,newEventData, newEventInvalidData } from '../../test-data/eventApiRequestData';
import { EventApiCalls } from '../../utils/api/eventApiCalls';

let extractedToken; 

test.beforeAll(async ({request}) => {
    const apiCalls = new EventApiCalls(request);
    const response = await apiCalls.registerNewUser(registerUserApiPayload());    
    const respJson=await response.json();
    await expect(response.status()).toBe(201);
    extractedToken = respJson.token;
})

test('validate create new event api return success as true and event data in response when valid token and payload is passed - positive scenario', async ({request}) => {
    const apiCalls = new EventApiCalls(request);
    const response = await apiCalls.createNewEvent(extractedToken,newEventData);
    await expect(response.status()).toBe(201);
    const respJson=await response.json();
    await expect(respJson).toHaveProperty('success');
    await expect(respJson.success).toBe(true);  
    await expect(respJson).toHaveProperty('data');
    await expect(respJson.data.id).toBeGreaterThan(0);
    await expect(respJson.data.title).toBe(newEventData.title);
    await expect(respJson.data.description).toBe(newEventData.description);
    await expect(respJson).toHaveProperty('message');
    await expect(respJson.message).toBe("Event created successfully");
})  

test('validate create new event api return success as false and error in response when invalid event date(past date)  is passed - negative scenario', async ({request}) => {
    const apiCalls = new EventApiCalls(request);
    const response = await apiCalls.createNewEvent(extractedToken,newEventInvalidData);
    await expect(response.status()).toBe(400);
    const respJson=await response.json();
    await expect(respJson).toHaveProperty('success');
    await expect(respJson.success).toBe(false);  
    await expect(respJson).toHaveProperty('error');
    await expect(respJson.details[0].message).toBe("Event date must be in the future");
})  