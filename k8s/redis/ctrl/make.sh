echo "->>Set variables"
storageFolder=/srv/nfs/kubedata
storageFolderCount=12
pvsFolder=./k8s
stsFile=sts.yml

echo "->>Install dependencies"
apt update &>/dev/null
apt install nfs-kernel-server -y &>/dev/null
systemctl enable nfs-server
systemctl start nfs-server

echo "->>Configure nfs & pv "
echo "$storageFolder     *(rw,sync,no_subtree_check,insecure)" >> /etc/exports
mkdir -p "$storageFolder"
mkdir -p $pvsFolder

for (( i = 0; i < $storageFolderCount ; i++))
do
    mkdir "$storageFolder/pv$i"
cat <<EOF >>$pvsFolder/pv$i.yml
apiVersion: v1
kind: PersistentVolume
metadata:
 name: pv-nfs-pv$i
 labels:
  type: local
spec:
 storageClassName: manual
 capacity:
  storage: 8Gi
 accessModes:
  - ReadWriteOnce
 nfs:
  server: $(kubectl get nodes -o=jsonpath='{.items[0].status.addresses[0].address}')
  path: /srv/nfs/kubedata/pv$i
EOF
done
chmod -R 777 $storageFolder
exportfs -rav

echo "->>Apply k8s pvs,statefulset,service"
kubectl apply -f $pvsFolder/


watch kubectl get all -o wide

