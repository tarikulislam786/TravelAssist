                           # ******************************************** TravelAssist Deployment Steps ********************************************* #

 There are 4 projects in this application. i) AngApi (Web API project) ii) AngApi.BLL (Business Logic Layer) iii) AngApi.DAL (Data Access Layer) iv) Angular (Angular Frontend Project)

Deployment process:

1.) Database Setup:

Open appsettings.json file from AngApi( web api project) and edit IdentityConnection parameter with your own (sql server name) then save it. 
(Cautious): Before build the solution, make sure the frontend angular project is unloaded. To do this right click on Angular (Frontend Project) -> unload project, then you can build the solution.

( follow step A )

Step A (Recommended):

Let's open SQL server Management Studio and log in. As the application furnished with Code First Approach, look at package manager console in visual studio. In console just type 'update-database'. The database will automatically be created with your given name and all the necessary tables as well. Once the database with all the tables is ready, do one more thing - In SQL server database in AspnetRoles table add atleast 1 role named with User.

2.) Run application:

i) Run backend project: Among these 4 projects, AngApi is our startup project. Let's run the project from visual studio. 
ii) Run frontend project: Among these 4 projects, Angular is our frontend prject and inside that project, look at the devramp folder. Just right click on devramp folder and choose open folder in file explorer. Then click on the address bar of this file explorer and write cmd then press enter. Here you just write ng serve --open and hit enter.

		*********************************   DONE   *****************************************
