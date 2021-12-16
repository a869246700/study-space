# Docker-Compose

## 一、简介

Docker

DockerFile -> build -> run

Docker Compose 来轻松高效的管理容器，定义运行多个容器



> 官方介绍

Compose is a tool for defining and running multi-container Docker applications. With Compose, you use a YAML file to configure your application’s services. Then, with a single command, you create and start all the services from your configuration. To learn more about all the features of Compose, see [the list of features](https://docs.docker.com/compose/#features).

Compose 是一个用于定义和运行多容器 Docker 应用程序的工具。借助 Compose，您可以使用 YAML 文件来配置应用程序的服务。然后，使用单个命令，从配置中创建并启动所有服务。要了解有关 Compose 的所有功能的更多信息，请参阅[功能列表](https://docs.docker.com/compose/#features)。



Compose works in all environments: production, staging, development, testing, as well as CI workflows. You can learn more about each case in [Common Use Cases](https://docs.docker.com/compose/#common-use-cases).

Compose 适用于所有环境：生产、登台、开发、测试以及 CI 工作流。您可以在[Common Use Cases 中](https://docs.docker.com/compose/#common-use-cases)了解有关每个案例的更多信息。



Using Compose is basically a three-step process:

1. Define your app’s environment with a `Dockerfile` so it can be reproduced anywhere.
2. Define the services that make up your app in `docker-compose.yml` so they can be run together in an isolated environment.
3. Run `docker compose up` and the [Docker compose command](https://docs.docker.com/compose/cli-command/) starts and runs your entire app. You can alternatively run `docker-compose up` using the docker-compose binary.

使用 Compose 基本上是一个三步过程：

1. 使用 定义您的应用程序的环境，`Dockerfile`以便它可以在任何地方复制。
2. 定义组成您的应用程序的服务，`docker-compose.yml` 以便它们可以在隔离的环境中一起运行。
3. 运行`docker compose up`和[码头工人组成命令](https://docs.docker.com/compose/cli-command/)启动并运行你的整个应用程序。您也可以`docker-compose up`使用 docker-compose 二进制文件运行。



**作用**: 批量容器编排



> 自我理解

Compose 是 Docker官方的开源项目，需要安装！

`DockerFile` 让程序在任何地方运行。

```yaml
version: "3.9"  # optional since v1.27.0
services:
  web:
    build: .
    ports:
      - "5000:5000"
    volumes:
      - .:/code
      - logvolume01:/var/log
    links:
      - redis
  redis:
    image: redis
volumes:
  logvolume01: {}
```

compose: 重要概念

* 服务services：容器，应用（web、Redis、mysql...）
* 项目project：一组关联的容器



## 二、安装

1. 下载

   ```shell
   sudo curl -L https://get.daocloud.io/docker/compose/releases/download/1.25.5/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
   ```

   

2. 授权

   ```shell
   sudo chmod +x docker-compose
   
   [root@VM-0-16-centos bin]# sudo chmod +x docker-compose
   [root@VM-0-16-centos bin]# docker-compose version
   docker-compose version 1.25.5, build 8a1c60f6
   docker-py version: 4.1.0
   CPython version: 3.7.5
   OpenSSL version: OpenSSL 1.1.0l  10 Sep 2019
   
   ```

   

3. 起步

   

4. 流程

   ```shell
   1. 创建网络
   2. 执行 docker-compose.yml 文件
   3. 启动服务
   	Starting compose_web_1   ... done
   	Starting compose_redis_1 ... done
   	
   	3.1 文件名 compose
   	3.2 服务
   	
   
   ```

   

   >  docker images 查看镜像

   ```shell
   [root@VM-0-16-centos ~]# docker images
   REPOSITORY    TAG          IMAGE ID       CREATED        SIZE
   compose_web   latest       e4503a08e20e   7 hours ago    183MB
   redis         alpine       3900abf41552   7 days ago     32.4MB
   python        3.7-alpine   a1034fd13493   7 days ago     41.8MB
   hello-world   latest       feb5d9fea6a5   2 months ago   13.3kB
   
   ```

   

   > docker service 查看所有服务

   ```shell
   Error response from daemon: This node is not a swarm manager. Use "docker swarm init" or "docker swarm join" to connect this node to swarm and try again.
   
   ```

   默认的服务器，文件名_服务名__number

   `_number`代表副本数量

   

   > docker network 查看网络

   ```shell
   [root@VM-0-16-centos ~]# docker network ls
   NETWORK ID     NAME              DRIVER    SCOPE
   e9edac799718   bridge            bridge    local
   72c48c27be12   compose_default   bridge    local
   21a56b6a32f6   host              host      local
   7b706a17316b   none              null      local
   ```

   **项目中的内容，都在同一个网络下**

   > 停止docker-compose 
   >
   > 1. 在容器目录下使用`docker-compose down`
   > 2. 直接使用Ctrl+C
   > 3. 





## 三、yaml规则

`docker-compose.yml` 是核心

```yaml
# 3层！

version: '' # 版本

services: # 服务
	服务1: web
		# 服务配置
		images
		build
		network
		
	服务2: redis
		....
	
	服务3: mysql
		....

# 其他配置 网络、卷、全局规则
volumns:
networks:
configs: 
```



## 四、一键部署WP博客

https://docs.docker.com/samples/wordpress/

1. 创建项目文件夹
2. 

