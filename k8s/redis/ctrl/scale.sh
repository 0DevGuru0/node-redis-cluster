# scale sts to 12
k scale sts redis-cluster --replicas 12

# add master
redis-cli --cluster add-node 127.0.0.1:7006 127.0.0.1:7000

# resharding hash to new node
redis-cli --cluster reshard redis-cluster0 # target new masterNode

# add slave to master
redis-cli --cluster \
add-node 127.0.0.1:7006 \
127.0.0.1:7000 \
--cluster-slave \
--cluster-master-id 3c3a0c74aae0b56170ccb03a76b60cfe7dc1912e

