# User Story
- **Visitor:**

  the visitor can browse between alot of delivery company and their restaurant **but** he can't order unless he register or login. 


- **SignUp:**
1. Single User : The user can Register to my website ,so that he can start order,user able to serach between alot of restaurant and see their offer. 
2. Restaurant : The Restaurant can Register to my website ,so that he can start Adding, Updating and Delete item in his restaurant menu.

- **LogIn:**
1. Login User : if user already signup he can login directly to make his order,user able to serach between alot of restaurant and see their offer.

2. Login Restaurant : if user already signup he can login directly to do CRUD for his menu

- **LogOut:**
  A user or restaurant con logout from the website by click logout Button

- **Company Category:**
1. Jahez
2. Hunger Station
3. To You

- **Resturant:**
for each company it has own Restaurants.

- **Resturant Menu:**
Each restaurant has own category.


# Router Routes

| Path | Component | Permissions | Behavior | 
| ---         |     ---      |          --- |          --- |
| `/`   | Hoem     | Public    | Home page, Contant all Restaurant   | 
| `/login`     | Login       |Public     | Register & login Page    |
| `/signUp`    | Register       |Public     | Register & login Page    |
| `/offers`     | Offers       |Public     | offers Page    |
| `/vAccount`     | VAccount       |Private     | Verify Account Page    |
| `/cart`     | Cart       |Private     | Your cart  Page    |
| `/order`     | Order       |Private     | after you proccess your order and confirme it page    |






# WireFrame
### Main Page
![This is an image](./WF1.png)

### When Click on **Show offers**
![This is an image](./WF2.png)

### Chose the Restaurant


![This is an image](./WF3.png)

### Your Cart

![This is an image](./WF4.png)