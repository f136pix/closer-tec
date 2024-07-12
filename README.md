# Technicians adminstration app
Add, visualize and manage technicians.

The technicians coordinates are provided in the creation, using Google Maps api that collects it from the addres provided, it is then rendered in the screen through google-maps-react-api, in a interface where the user can filter the Technician by role, name, city or location.

## Run locally :
    The app is in Dockerization process, you can run locally using npm and dotnet,just apply the following kubectl commands to run the PGSQL
    'kubectl apply -f np-srv.yaml'
    'kubectl apply -f pgsql-configmap.yaml'
    'kubectl apply -f pgsql-depl.yaml'
    Then update the db with `dotnet ef database update`
    and run it in production with `dotnet run --environment Production`
