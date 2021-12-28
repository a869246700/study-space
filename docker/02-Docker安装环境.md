## Nginx

```shell
# 1. 搜索镜像
# 2. 下载镜像
# 3. 创建容器并运行
[root@VM-0-16-centos ~]# docker images
REPOSITORY   TAG       IMAGE ID       CREATED        SIZE
nginx        latest    ea335eea17ab   6 days ago     141MB
centos       latest    5d0da3dc9764   2 months ago   231MB

# -d 后台运行
# --name 命名容器
# -p 宿主机端口:容器内部端口
[root@VM-0-16-centos ~]# docker run -d --name nginx01 -p 8080:80 nginx
d78c74cf841aa92ae2f65be87c59fbb4f712555a2d62eb98b1aad732b752356a
[root@VM-0-16-centos ~]# docker ps
CONTAINER ID   IMAGE     COMMAND                  CREATED         STATUS         PORTS                                   NAMES
d78c74cf841a   nginx     "/docker-entrypoint.…"   7 seconds ago   Up 6 seconds   0.0.0.0:8080->80/tcp, :::8080->80/tcp   nginx01
[root@VM-0-16-centos ~]# curl localhost:8080
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
html { color-scheme: light dark; }
body { width: 35em; margin: 0 auto;
font-family: Tahoma, Verdana, Arial, sans-serif; }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>

# 进入容器
[root@VM-0-16-centos ~]# docker exec -it nginx01 /bin/bash
root@d78c74cf841a:/# ls
bin  boot  dev	docker-entrypoint.d  docker-entrypoint.sh  etc	home  lib  lib64  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
root@d78c74cf841a:/# whereis nginx
nginx: /usr/sbin/nginx /usr/lib/nginx /etc/nginx /usr/share/nginx
root@d78c74cf841a:/# cd /etc/nginx/
root@d78c74cf841a:/etc/nginx# ls
conf.d	fastcgi_params	mime.types  modules  nginx.conf  scgi_params  uwsgi_params

```



## Tomcat

```shell
# 官方使用
docker run -it --rm tomcat:9.0

# 我们之前的启动都是后台，停止了容器之后，容器还可以查到。
# docker run -it -rm 一般用于测试，用完就删除

# 拉取镜像
docker pull tomcat:latest
# 启动运行
docker run -d --name tomcat01 -p 8090:8080 tomcat
# 测试访问
curl localhost:8090
# 进入容器
docker exec -it tomcat01 /bin/bash
# 发现问题： 1.linux命令少了；2.没有webapps，阿里云镜像的原因，默认是最小的镜像，所有不必要的都删除掉
# 保证最小可运行环境
```





## ES + Kibana

```shell
# es 暴露的端口很多
# es 十分的消耗内存
# es 的数据一般需要放置到安全目录！挂载

# --net somenetwork 网络配置

# 启动es
docker run -d --name elasticsearch -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" elasticsearch:7.6.2

# 启动了es后，服务器卡死

# 测试一下es是否成功
[root@VM-0-16-centos ~]# curl localhost:9200
{
  "name" : "a75f390190a2",
  "cluster_name" : "docker-cluster",
  "cluster_uuid" : "OOX3xkCrTI-f0Gn7XbYb2g",
  "version" : {
    "number" : "7.6.2",
    "build_flavor" : "default",
    "build_type" : "docker",
    "build_hash" : "ef48eb35cf30adf4db14086e8aabd07ef6fb113f",
    "build_date" : "2020-03-26T06:34:37.794943Z",
    "build_snapshot" : false,
    "lucene_version" : "8.4.0",
    "minimum_wire_compatibility_version" : "6.8.0",
    "minimum_index_compatibility_version" : "6.0.0-beta1"
  },
  "tagline" : "You Know, for Search"
}

# 查看docker 内存状态
docker stats

[root@VM-0-16-centos ~]# docker stats 
CONTAINER ID   NAME            CPU %     MEM USAGE / LIMIT     MEM %     NET I/O          BLOCK I/O       PIDS
a75f390190a2   elasticsearch   0.49%     1.251GiB / 1.795GiB   69.67%    1.73kB / 1.9kB   204MB / 324kB   42


# 关闭es 增加内存的限制

# 修改配置文件: -e 环境配置
docker run -d --name elasticsearch -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" -e ES_JAVA_OPTS="-Xms64m -Xmx512m" elasticsearch:7.6.2

[root@VM-0-16-centos ~]# docker run -d --name elasticsearch -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" -e ES_JAVA_OPTS="-Xms64m -Xmx512m" elasticsearch:7.6.2
472c1990269e1bd2dc2f4fcbc154b451e0da96bd35d42edc0fcc2af95127eaa6
[root@VM-0-16-centos ~]# docker stats 
CONTAINER ID   NAME            CPU %     MEM USAGE / LIMIT     MEM %     NET I/O     BLOCK I/O        PIDS
472c1990269e   elasticsearch   0.00%     184.1MiB / 1.795GiB   10.02%    586B / 0B   96.6MB / 246kB   18

[root@VM-0-16-centos ~]# curl localhost:9200
{
  "name" : "472c1990269e",
  "cluster_name" : "docker-cluster",
  "cluster_uuid" : "NZyGv2FxQSahr0SOXBlvqQ",
  "version" : {
    "number" : "7.6.2",
    "build_flavor" : "default",
    "build_type" : "docker",
    "build_hash" : "ef48eb35cf30adf4db14086e8aabd07ef6fb113f",
    "build_date" : "2020-03-26T06:34:37.794943Z",
    "build_snapshot" : false,
    "lucene_version" : "8.4.0",
    "minimum_wire_compatibility_version" : "6.8.0",
    "minimum_index_compatibility_version" : "6.0.0-beta1"
  },
  "tagline" : "You Know, for Search"
}

# 使用kibana链接es

```



## 卷