# Technicians adiminstration app
Add, visualize and manage technicians.

The technicians coordinates are provided in the creation, using Google Maps api that collects it from the addres provided, it is then rendered in the screen through google-maps-react-api, in a interface where the user can filter the technician by role, name, or location.

GraphQl is used for server-client communication and a JWT user authentication implemented in a dotnet backend using postgres as DB

## Run locally :

- Using Make : 
` make run-app`

- If you do not have make installed, use Kubectl to run all the commands in [K8S](./K8S) folder.
` kubectl apply -f ${filename}`

- The web nodePort will be avaible in [localhost:30009](./K8S)

## App demo : 
![img.png](img.png)

![img_1".png](img_1.png)

