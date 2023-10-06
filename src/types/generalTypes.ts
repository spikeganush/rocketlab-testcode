export type User = {
  name: string;
  email: string;
};

export type fakeUsers = {
  address: {
    city: string;
    geo: {
      lat: string;
      lng: string;
    };
    street: string;
    suite: string;
    zipcode: string;
  };
  company: {
    bs: string;
    catchPhrase: string;
    name: string;
  };
  email: string;
  id: string;
  name: string;
  phone: string;
  username: string;
  website: string;
};

export type DatafetchResult = {
  fakeUsers: fakeUsers[];
};
