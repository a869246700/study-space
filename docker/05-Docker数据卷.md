##            容器数据卷

> 什么容器数据卷？

Docker的理念：将应用和环境打包成一个镜像！

数据是存储在容器中的，如果数据都在容器中，那么我们容器删除时，数据就会丢失！==需求：数据可以持久化==

MYSQL，容器删除了 等同于删库跑路。

容器之间可以有一个数据共享的技术！在Docker容器中产生的数据，同步到本地！

这就是卷技术！实际上就是一个目录挂载，将容器内的目录挂载到宿主机上



**总结一句话: 容器的持久化和同步操作，容器之间也是可以数据共享的**



## 使用数据卷

> 方式一：直接使用命令来挂载

```shell
docker run -it -v 主机目录:容器内目录

# 测试一
[root@VM-0-16-centos home]# docker run -it -v /home/test:/home centos /bin/bash

# 启动起来时候，我们可以通过 docker inspect 容器id 来查看Mount下挂载的信息
# Source源路径，Destination容器内部路径

# 在容器内部创建文件后，可以在宿主机中挂载的卷地址中查找到对应的容器内部文件

# 测试二

# 将容器stop掉之后，在宿主机中挂载卷地址中修改文件内容

# 将容器start起来，进入到容器的映射文件路径下查看文件内容被修改了
```





## 使用数据卷技术：安装mysql

```shell
# 获取镜像
docker pull mysql:5.7

# 运行容器 需要做数据挂载 ps: 安装mysql 需要配置用户名和密码
[root@VM-0-16-centos test]# docker run -d -p 13306:3306 -v /home/mysql/conf:/etc/mysql/conf.d -v /home/mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 --name mysql mysql:5.7

-v 挂载卷，可多个
-e 环境变量
-e MYSQL_ROOT_PASSWORD=123456 # 设置mysql的密码为123456

# 我们在容器中创建一个数据库时，宿主机中的映射目录下也会新增一个数据库文件夹

# 当我们将mysql容器删除时，宿主机映射目录下的文件还存在，实现了持久化
```



## 具名和匿名挂载

```shell
# 匿名挂载
-v 容器内路径
docker run --name nm_nginx -d -P -v /etc/nginx  nginx

# 具名路径
-v 卷名:容器内路径
[root@VM-0-16-centos home]# docker run --name jm_nginx -d -P -v jm-nginx:/etc/nginx  nginx
[root@VM-0-16-centos home]# docker volume ls
DRIVER    VOLUME NAME
local     jm-nginx

# 查看卷
[root@VM-0-16-centos home]# docker volume inspect jm-nginx 
[
    {
        "CreatedAt": "2021-11-26T01:11:35+08:00",
        "Driver": "local",
        "Labels": null,
        "Mountpoint": "/var/lib/docker/volumes/jm-nginx/_data",
        "Name": "jm-nginx",
        "Options": null,
        "Scope": "local"
    }
]
# 所有docker容器内的卷，没有指定目录的情况下，卷都可在/var/lib/docker/volumns/xxx/_data 
# 我们通过具名挂载可以方便的找到我们的一个卷，大多情况使用具名挂载
```



**如何确定具名挂载与匿名挂载、还是指定路径挂载**

```shell
-v 容器内路径				# 匿名挂载
-v 卷名:容器内路径			   # 具名挂载
-v /宿主机路径:容器内路径		 # 指定路径挂载

# 拓展
# 通过 -v 容器内路径:ro :rw 改变读写权限
ro readonly 	# 只读,这个路径只能通过宿主机来操作，容器内是无法修改的
rw readwrite 	# 可读可写

# 一旦这个设置了容器权限，容器对我们挂载出来的内容就有限定了
docker run --name jm_nginx -d -P -v jm-nginx:/etc/nginx:ro nginx
docker run --name jm_nginx -d -P -v jm-nginx:/etc/nginx:rw nginx

```





## 初识Dockerfile

Dockerfile就是用来构建 docker 镜像的构建文件



通过dockerfile脚本可以生产镜像，镜像是一层一层的，脚本就是一个个的命令，每个命令都是一层

```shell
FROM centos

VOLUME ["volume01", "volume02"]

CMD echo "-----end-----"
CMD /bin/bash
```



```shell
# 创建一个Dockerfile文件，名字随机，但是建议为 Dockefile

# 文件中的内容 指令(大写) 参数
FROM centos

VOLUME ["volume01", "volume02"]

CMD echo "-----end-----"
CMD /bin/bash

# 这里的每一个命令都是 docker 中的一层

# 生成镜像
[root@VM-0-16-centos docker-test-column]# docker build -f dockerfile -t codergoo/centos .
Sending build context to Docker daemon  2.048kB
Step 1/4 : FROM centos
 ---> 5d0da3dc9764
Step 2/4 : VOLUME ["volume01", "volume02"]
 ---> Running in 8702c66cd8ff
Removing intermediate container 8702c66cd8ff
 ---> a8b8249ef8f4
Step 3/4 : CMD echo "-----end-----"
 ---> Running in 9bd09647da23
Removing intermediate container 9bd09647da23
 ---> 1da115b1e6c0
Step 4/4 : CMD /bin/bash
 ---> Running in 0722812f0023
Removing intermediate container 0722812f0023
 ---> 9ac52fb4107b
Successfully built 9ac52fb4107b
Successfully tagged codergoo/centos:latest
```



## 数据卷容器

```shell
--volumes-form

# 实现多个容器之间的数据同步; PS：需要注意要在同一个镜像下
[root@VM-0-16-centos docker-test-column]# docker run -it --name docker01 codergoo/centos
[root@VM-0-16-centos docker-test-column]# docker run -it --name docker02 --volumes-from docker01 codergoo/centos
[root@VM-0-16-centos docker-test-column]# docker run -it --name docker03 --volumes-from docker02 codergoo/centos
```

> 结论：容器之间配置信息的传递，数据卷容器的生命周期一直持续到没有容器使用为止
>
> 一旦持久化到本地，这个时候，本地的数据是不会被删除的
