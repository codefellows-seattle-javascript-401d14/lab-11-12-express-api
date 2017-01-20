
<h1> Ken Lab 11/12 </h1>

<h2> This lab was about in memory storage.</h2>

<p> The user using the terminal interface, can write a story in the fields ```name``` and ```text```   </p>

<li> Turn on the server with the command ```node server.js``` in the terminal  </li>

<p> The user can then POST them to the server with the command ```http POST localhost:3000/api/story name=" " text=" "```<p>

<li> The user will be assigned a database ID upon successful POST.  </li>

<p> If the user would like to retrieve a story, they will enter the following command into the terminal: </p>
<li> ```http GET localhost:3000/api/story?id=idnumber``` </li>
