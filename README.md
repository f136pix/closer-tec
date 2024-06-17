# Technicians adminstration app
Add, visualize and manage technicians.

## Run locally :
    The app is in Dockerization process, you can run locally using npm and dotnet,just apply the following kubectl commands to run the PGSQL
    'kubectl apply -f np-srv.yaml'
    'kubectl apply -f pgsql-configmap.yaml'
    'kubectl apply -f pgsql-depl.yaml'
    'kubectl apply -f '
    Then update the db with `dotnet ef database update`
    and run it in production with `dotnet run --environment Production`
