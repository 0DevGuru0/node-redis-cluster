doc run \
--name redis \
-v $(pwd)/redisvolume:/data \
-p 6379:6379 \
-d redis redis-server --appendonly yes  --requirepass "930611040"