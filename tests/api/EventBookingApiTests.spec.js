import {test,expect} from '@playwright/test';
import{registerUserApiPayload,newEventData,createBookingDetails} from '../../test-data/eventApiRequestData';
import {EventApiCalls} from '../../utils/api/eventApiCalls';

let extractedToken;
let createdEventId;

test.beforeAll(async ({request}) => {
    const apiCalls = new EventApiCalls(request);
    const response = await apiCalls.registerNewUser(registerUserApiPayload());
    await expect(response.status()).toBe(201);
    const respJson = await response.json();
    extractedToken = respJson.token;
    const createEventResponse = await apiCalls.createNewEvent(extractedToken, newEventData);
    await expect(createEventResponse.status()).toBe(201);
    const createEventRespJson = await createEventResponse.json();
    createdEventId = createEventRespJson.data.id;
    console.log("Created Event ID: " + createdEventId);
    console.log("Extracted Token: " + extractedToken);
})

test('validate create booking api return success as true and booking data in response when valid token and payload is passed - positive scenario', async ({request}) => {
    const apiCalls = new EventApiCalls(request);
    console.log(createBookingDetails);
    const response = await apiCalls.createBookingApiCall(extractedToken,createdEventId,createBookingDetails);   
    const respJson = await response.json();
    await expect(response.status()).toBe(201);
    await expect(respJson).toHaveProperty('success');
    await expect(respJson.success).toBe(true);  
    await expect(respJson).toHaveProperty('data');
    await expect(respJson.data.eventId).toBe(createdEventId);
    await expect(respJson.data.userId).toBeGreaterThan(0);
    await expect(respJson.data.numberOfSeats).toBe(createBookingDetails.numberOfSeats);
    await expect(respJson.data.customerName).toBe(createBookingDetails.customerName);
    await expect(respJson).toHaveProperty('message');
    await expect(respJson.message).toBe("Booking confirmed!");
})





test('validate create booking api return success as false and error data in response when invalid token and payload is passed - positive scenario', async ({request}) => {
    const apiCalls = new EventApiCalls(request);
    console.log(createBookingDetails);
    const response = await apiCalls.createBookingApiCall(extractedToken+"invalid",createdEventId,createBookingDetails);   
    const respJson= await response.json();
    await expect(respJson).toHaveProperty('success');
    await expect(respJson.success).toBe(false);  
    await expect(respJson).toHaveProperty('error');
    await expect(respJson.error).toBe("Invalid or expired token");
    await expect(response.status()).toBe(401);
})

