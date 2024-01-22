
# Streetdine Assignment


## postman 
- [API LINK](https://documenter.getpostman.com/view/20003749/2s9YsT6U12)

## Installation

#### Clone the Repo

```bash
   git clone https://github.com/ank-2222/streetdine-assignment
```

#### To run the Project 

```bash
  npm i 
```

```bash
  npm start 
```



## DB Table

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `uuid` | **Auto generated**. |
| `employee_id` | `string` | **Required**. |
| `first_name` | `string` | **Required**.  |
| `last_name` | `string` | **Required**.  |
| `email` | `string` | **Required**. |
| `dob` | `string` | **Required**.  |
| `department` | `string` | **Required**. |
| `position` | `string` | **Required**. |
| `created_at` | `date` | **Auto generated**. |







## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

**Already Attached .env file in Email, place it in root folder**

`PORT`

`POSTGRES_USER`

`POSTGRES_HOST`

`POSTGRES_PASSWORD`

`POSTGRES_DATABASE`

`POSTGRES_PORT`

`JWT_SECRET`

