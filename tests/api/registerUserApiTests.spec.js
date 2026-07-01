import {test,expect} from '@playwright/test';
import { registerUserApiPayload ,registerUserApiInvalidPayload } from '../../test-data/eventApiRequestData';
import { EventApiCalls } from '../../utils/api/eventApiCalls';

test("Validate register new user api return success as true and token in response when valid payload is passed- positive scenario", async ({request}) => {
    const apiCalls = new EventApiCalls(request);
    const response = await apiCalls.registerNewUser(registerUserApiPayload());
    await expect(response.status()).toBe(201);
    const respJson=await response.json();
    await expect(respJson).toHaveProperty('success');
    await expect(respJson).toHaveProperty('token');
});

test("Validate register new user api return success as false and no token in response when invalid payload is passed- negative scenario", async ({request}) => {
    const apiCalls = new EventApiCalls(request);
    const response = await apiCalls.registerNewUser(registerUserApiInvalidPayload);
    await expect(response.status()).toBe(400);
    const respJson=await response.json();
    await expect(respJson).toHaveProperty('success');
    await expect(respJson.success).toBe(false);
    await expect(respJson).toHaveProperty('error');
   

});


