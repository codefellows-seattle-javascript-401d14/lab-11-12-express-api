
# Ken Lab 11/12 </h1>

 This lab was about in-memory storage. No real cloud databases are used in this lab.

##Modules
*server.js* - starts the server
*personconstructor.js* - the constructor that assigns a unique Id of each instance and sets the input for ```name``` and ```hobby```.  
*person-router.js* - parses the body of the POST requests
*stroage.js* - location where POST requests are stored and destroyed.

##How to use 
<p> The user using the terminal interface, can write a story in the fields ```name``` and ```text```   </p>

<li> Turn on the server with the command ```node server.js``` in the terminal  </li>

<p> The user can then POST them to the server with the command ```http POST localhost:3000/api/story name=" " text=" "```<p>

<li> The user will be assigned a database ID upon successful POST.  </li>

<p> If the user would like to retrieve a story, they will enter the following command into the terminal: </p>
<li> ```http GET localhost:3000/api/story?id=idnumber``` </li>
