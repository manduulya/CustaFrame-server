# CustaFrame app
````
This web app allows you to see how your art-work will look on specific frame, before commiting any physical purchase. Therefore, you may make the best choice!

Contains functions to enable CRUD operations for client side application. Deployed with Heroku

## LINK TO LIVE APP
````
https://custaframe-client.manduulya.now.sh/

TECHNOLOGIES USED
Node
Express Framework
Chai
Mocha
Knex
FUNCTIONALITY
The app uses GET requests to the stock images of frame selections from static served files to the client. 
The app uses POST requests get sent to the database for:

Adding purchase order with following keys: 

fullname: { type: String, required: true }, 
width: {type: Integer, required: true},
height: {type: Integer, required: true},
email: {type: text, required: true},
frameName: {type: text, required: true},
totalPrice: {type: Integer, required: true}

API Overview
Events GET

@route GET api/frames/ @desc Gets all frame options @access Public
route.get('/');


@route POST api/po/ @desc Allows users to place an order @access Public
route.post('/');


SCREENSHOT
1. Landing Page
logo

2.Upload Page
logo

3.Exit Page
logo
