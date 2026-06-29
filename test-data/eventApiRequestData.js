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

export const newEventData={
  "title": "Test Event 2026",
  "description": "A premier technology conference.",
  "category": "Conference",
  "venue": "Bangalore International Centre",
  "city": "Bangalore",
  "eventDate": "2027-01-15T09:00:00.000Z",
  "price": 1500,
  "totalSeats": 500,
  "imageUrl": "https://example.com/banner.jpg"
}

export const newEventInvalidData={
  "title": "Test Event 2026",
  "description": "A premier technology conference.",
  "category": "Conference",
  "venue": "Bangalore International Centre",
  "city": "Bangalore",
  "eventDate": "2026-03-15T09:00:00.000Z",
  "price": 1500,
  "totalSeats": 500,
  "imageUrl": "https://example.com/banner.jpg"
}

export const invalidEventId=679