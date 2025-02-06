export interface User {
    gender: string
    name: {
        title: string
        first: string
        last: string
    }
    location: {
      street: {
        number: number
        name: string
      }
      city: string
      state: string
      country: string
    }
    email: string
    phone: string
    picture: {
      large: string
      medium: string
      thumbnail: string
    }
    dob: {
        date: string;
        age: number };
  }
  
  