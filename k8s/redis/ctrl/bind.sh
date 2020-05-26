kubectl exec -it redis-cluster-0 -- redis-cli --cluster create --cluster-replicas 1 $(kubectl get pods -l app=redis-cluster -o jsonpath='{range.items[*]}{.status.podIP}:6379 ')

for ((i=0;i<6;i++))
do
    kubectl exec -it redis-cluster-$i -- redis-cli role >> redis-cluster.info
done