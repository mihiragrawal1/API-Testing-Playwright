import {test,expect} from '@playwright/test';
import { getEventApiPayload,registerUserApiPayload } from '../test-data/eventApiRequestData'
import { EventApiCalls } from '../utils/api/eventApiCalls';

let extractedToken;

test.beforeAll(async ({request}) => {
    const apiCalls = new EventApiCalls(request);
    const response = await apiCalls.registerNewUser(registerUserApiPayload);
    await expect(response.status()).toBe(201);
    const respJson = await response.json();
    extractedToken = respJson.token;
});

test('validate get event api return success as true and events data in response when valid token and query params are passed - positive scenario', async ({request}) => {
const apicalls=new EventApiCalls(request);
const reponse = await apicalls.getEventApiCall(extractedToken,getEventApiPayload);
await expect(reponse.status()).toBe(200);
const respJson=await reponse.json();
await expect(respJson).toHaveProperty('success');
await expect(respJson.success).toBe(true);
await expect(respJson).toHaveProperty('data');
await expect(respJson.data.length).toBe(0);

})
