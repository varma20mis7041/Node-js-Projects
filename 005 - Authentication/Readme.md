Authentication 

## Test Case Results

The solution has successfully passed all test cases. Below are the details:

1. **Express Instance Export**  
   - An Express instance should be exported from the `app.js` file using the default export syntax.

2. **POST /register (Existing User Check)**  
   - The POST request with path `/register` should return "User already exists" as a response if the username already exists.

3. **User Creation Prevention (Existing User)**  
   - A user should not be created if the username already exists in the database.

4. **POST /register (Password Length Check)**  
   - The POST request with path `/register` should return "Password is too short" as a response if the registrant provides a password with less than 5 characters.

5. **POST /register (Successful Registration)**  
   - The POST request with path `/register` should return "User created successfully" text as a response for a successful registration.

6. **Password Encryption**  
   - The password should be encrypted before creating a user in the database.

7. **User Creation (Database Update)**  
   - The user should be created in the database upon the success of the request with path `/register`.

8. **POST /login (Invalid User)**  
   - The POST request with path `/login` should return "Invalid user" text as a response for an unregistered user.

9. **POST /login (Invalid Password)**  
   - The POST request with path `/login` should return "Invalid password" text as a response if the user provides an incorrect password.

10. **POST /login (Login Success)**  
    - The POST request with path `/login` should return "Login success!" text as a response if the user provides correct credentials.

11. **PUT /change-password (Invalid Current Password)**  
    - The PUT request with path `/change-password` should return "Invalid current password" text as a response if the user provides an incorrect current password.

12. **PUT /change-password (New Password Length Check)**  
    - The PUT request with path `/change-password` should return "Password is too short" text as a response if the user provides a new password with less than 5 characters.

13. **PUT /change-password (Successful Update)**  
    - The PUT request with path `/change-password` should return "Password updated" text as a response for a successful password update.

14. **New Password Encryption**  
    - The new password should be encrypted and added to the database.

# Assignment instructions

Given an `app.js` file and a database file `userData.db` consisting of a  table `user`.

Write APIs to perform operations on the table `user` containing the following columns,

**User Table**

| Column   | Type    |
| -------- | ------- |
| username | TEXT |
| name     | TEXT    |
| password | TEXT    |
| gender   | TEXT    |
|location|TEXT|

### API 1

#### Path: `/register`

#### Method: `POST`

**Request**

```
{
  "username": "adam_richard",
  "name": "Adam Richard",
  "password": "richard_567",
  "gender": "male",
  "location": "Detroit"
}
```

- **Scenario 1**

  - **Description**:

    If the username already exists

  - **Response**
    - **Status code**
      ```
      400
      ```
    - **Status text**
      ```
      User already exists
      ```

- **Scenario 2**

  - **Description**:

    If the registrant provides a password with less than 5 characters

  - **Response**
    - **Status code**
      ```
      400
      ```
    - **Status text**
      ```
      Password is too short
      ```

- **Scenario 3**

  - **Description**:

    Successful registration of the registrant

  - **Response**
      - **Status code**
        ```
        200
        ```
      - **Status text**
       ```
       User created successfully
       ```

### API 2

#### Path: `/login`

#### Method: `POST`

**Request**
```
{
  "username": "adam_richard",
  "password": "richard_567"
}
```

- **Scenario 1**

  - **Description**:

    If an unregistered user tries to login

  - **Response**
    - **Status code**
      ```
      400
      ```
    - **Status text**
      ```
      Invalid user
      ```

- **Scenario 2**

  - **Description**:

    If the user provides incorrect password

  - **Response**
    - **Status code**
      ```
      400
      ```
    - **Status text**
      ```
      Invalid password
      ```

- **Scenario 3**

  - **Description**:

    Successful login of the user

  - **Response**
    - **Status code**
      ```
      200
      ```
    - **Status text**
      ```
      Login success!
      ```

### API 3

#### Path: `/change-password`

#### Method: `PUT`

**Request**

```
{
  "username": "adam_richard",
  "oldPassword": "richard_567",
  "newPassword": "richard@123"
}
```

- **Scenario 1**

  - **Description**:

    If the user provides incorrect current password

  - **Response**
    - **Status code**
      ```
      400
      ```
    - **Status text**
      ```
      Invalid current password
      ```

- **Scenario 2**

  - **Description**:

    If the user provides new password with less than 5 characters

  - **Response**
    - **Status code**
      ```
      400
      ```
    - **Status text**
      ```
      Password is too short
      ```

- **Scenario 3**

  - **Description**:

    Successful password update

  - **Response**
    - **Status code**
      ```
      200
      ```
    - **Status text**
      ```
      Password updated
      ```


<br/>

Use `npm install` to install the packages.

**Export the express instance using the default export syntax.**

**Use Common JS module syntax.**
