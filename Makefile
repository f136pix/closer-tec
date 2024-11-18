.PHONY : run-app

run-app: open-nps run-db run-server run-web

open-nps : 
	cd K8S && kubectl apply -f np-srv.yaml
	
run-db : 
	cd K8S  && kubectl apply -f pgsql-pvc.yaml && kubectl apply -f pgsql-configmap.yaml && kubectl apply -f pgsql-depl.yaml
	
run-server: 
	cd K8S && kubectl apply -f server-depl.yaml
	
run-web: 
	cd K8S && kubectl apply -f web-depl.yaml
	
