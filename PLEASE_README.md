# Prerequisites

The application is fetching data from local storage. 
In order to see the result with data and implement actions.
Please save this mocked data into your local storage.


`RUN BELOW CODE INSIDE APP.JSX TO STORE DATA IN LOCAL STORAGE`
### The mocked data is: 


```
const data = [
  {
    id: "751684923",
    type: "INCOME",
    createdAt: "2022-03-10T15:38:42.377Z",
    amount: "5436",
    note: "Ahmad Saman",
    category: "TECH",
    currency: "USD",
  },
  {
    id: "123456789",
    note: "HyperCloud II Headset",
    category: "TECH",
    createdAt: "2022-03-10T10:23:24.000Z",
    type: "EXPENSE",
    amount: 75,
    currency: "USD",
  },
  {
    id: "987546321",
    note: "Salary after promotion",
    category: "SALARY",
    createdAt: "2022-03-10T10:23:24.000Z",
    type: "INCOME",
    amount: 5000000,
    currency: "IQD",
  },
  {
    id: "887788770",
    note: "Borrowed from Muhammad",
    category: "LOAN",
    createdAt: "2022-03-10T10:23:24.000Z",
    type: "INCOME",
    amount: 100000,
    currency: "IQD",
  },
  {
    id: "435873458",
    note: "HyperCloud II Headset",
    category: "GIFT",
    createdAt: "2022-03-09T10:23:24.000Z",
    type: "INCOME",
    amount: 51,
    currency: "USD",
  },
  {
    id: "937582938",
    note: "HyperCloud II Headset",
    category: "FOOD",
    createdAt: "2022-03-08T10:23:24.000Z",
    type: "EXPENSE",
    amount: 29.99,
    currency: "USD",
  },
  {
    id: "883377446",
    note: "HyperCloud II Headset",
    category: "SPORTS",
    createdAt: "2022-03-05T10:23:24.000Z",
    type: "EXPENSE",
    amount: 19,
    currency: "USD",
  },
  {
    id: "824723857",
    note: "HyperCloud II Headset",
    category: "HEALTH",
    createdAt: "2022-03-02T10:23:24.000Z",
    type: "EXPENSE",
    amount: 250000,
    currency: "IQD",
  },
  {
    id: "664353878",
    note: "HyperCloud II Headset",
    category: "BILLS",
    createdAt: "2022-02-27T10:23:24.000Z",
    type: "EXPENSE",
    amount: 1250,
    currency: "USD",
  },
  {
    id: "243634998",
    note: "HyperCloud II Headset",
    category: "CLOTHS",
    createdAt: "2019-05-20T10:23:24.000Z",
    type: "EXPENSE",
    amount: 678,
    currency: "USD",
  },
  {
    id: "321233399",
    note: "HyperCloud II Headset",
    category: "SALARY",
    createdAt: "2018-05-20T10:23:24.000Z",
    type: "INCOME",
    amount: 150000,
    currency: "USD",
  },
  {
    id: "999888777",
    note: "HyperCloud II Headset",
    category: "LOAN",
    createdAt: "2015-12-20T10:23:24.000Z",
    type: "INCOME",
    amount: 1000000,
    currency: "USD",
  },
  {
    id: "344566789",
    note: "HyperCloud II Headset",
    category: "TECH",
    createdAt: "2017-12-20T10:23:24.000Z",
    type: "EXPENSE",
    amount: 399,
    currency: "USD",
  },
  {
    id: "321234555",
    note: "HyperCloud II Headset",
    category: "BILLS",
    createdAt: "2021-10-20T10:23:24.000Z",
    type: "EXPENSE",
    amount: 2250000,
    currency: "IQD",
  },
  {
    id: "598436399",
    note: "HyperCloud II Headset",
    category: "TECH",
    createdAt: "2022-03-10T03:22:53.566Z",
    type: "EXPENSE",
    amount: 85,
    currency: "USD",
  },
  {
    id: "999999999",
    note: "HyperCloud II Headset",
    category: "TECH",
    createdAt: "2022-03-10T03:22:53.566Z",
    type: "EXPENSE",
    amount: 109,
    currency: "USD",
  },
  {
    id: "785651697",
    type: "EXPENSE",
    createdAt: "2022-03-10T03:23:10.731Z",
    amount: "45364",
    note: "bought budget pc",
    category: "TECH",
    currency: "USD",
  },
  {
    id: "610137339",
    type: "EXPENSE",
    createdAt: "2022-03-10T03:23:10.731Z",
    amount: "1500",
    note: "Noctua NH-15D cpu cooler",
    category: "TECH",
    currency: "USD",
  },
  {
    id: "938834889",
    type: "EXPENSE",
    createdAt: "2022-03-10T12:24:02.283Z",
    amount: "25.99",
    note: "Abdulmajeed Jaafer",
    category: "HEALTH",
    currency: "USD",
  },
  {
    id: "222690917",
    type: "EXPENSE",
    createdAt: "2022-03-10T12:25:25.869Z",
    amount: "48.56",
    note: "Revan Sarbast",
    category: "BILLS",
    currency: "USD",
  },
  {
    id: "356704645",
    type: "INCOME",
    createdAt: "2022-03-10T12:28:07.537Z",
    amount: "1250000",
    note: "monthly salary",
    category: "SALARY",
    currency: "USD",
  },
  {
    id: "636478599",
    type: "INCOME",
    createdAt: "2022-03-10T12:33:39.812Z",
    amount: "44",
    note: "gifted money from AKAM foad",
    category: "GIFT",
    currency: "USD",
  },
  {
    id: "461482010",
    type: "EXPENSE",
    createdAt: "2022-03-10T12:40:38.802Z",
    amount: "3.5654",
    note: "UK Pizza Burger",
    category: "FOOD",
    currency: "USD",
  },
  
  {
    id: "455686909",
    type: "INCOME",
    createdAt: "2022-03-10T13:16:15.048Z",
    amount: "2000",
    note: "from revan",
    category: "GIFT",
    currency: "USD",
  },
];
```

```
  const walletData = [
  { id: 1, type: "income", value: 1000 },
  { id: 2, type: "balance", value: 25000 },
  { id: 3, type: "expense", value: 1500 },
];
```


## The code line for saving into `localStorage`
```
    localStorage.setItem("transactions", JSON.stringify(data));
    localStorage.setItem("wallet", JSON.stringify(walletData));
```



 
