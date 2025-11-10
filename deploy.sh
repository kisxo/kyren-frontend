npm run build

tar -cvf dist.tar dist 
#configure kyren-aws in .ssh/config with ip and pubkey
scp -r dist.tar kyren-aws:/home/kisxo/kyren-frontend
rm -rf dist.tar
ssh kyren-aws 'cd /home/kisxo/kyren-frontend && tar -xvf dist.tar && rm dist.tar'