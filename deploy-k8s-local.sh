

docker build -t merchants-frontend .

kind load docker-image merchants-frontend:latest --name food-delivery-cluster

kubectl delete -f manifest.yml --context kind-food-delivery-cluster
kubectl create -f manifest.yml --context kind-food-delivery-cluster
