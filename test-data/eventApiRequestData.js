export const  registerUserApiPayload = {
    email: `test${Math.floor(Math.random() * 1000)}@example.com`,
    password: "pistol321"
}

export const  registerUserApiInvalidPayload = {
    email: `test${Math.floor(Math.random() * 1000)}@xyz.com`,
    password: "123"
}

export const  getEventApiPayload = {
        category: 'Conference',
        city: 'Banglore',
        search: 'summit',
        page: 1,
        limit: 10
      }