# Docker常用命令

## 帮助文档

```shell
docker version    # 显示Docker版本信息
docker info       # 显示Docker的系统信息，包括镜像和容器的数量
docker 命令 --help # 帮助文档
```



## 镜像命令

**docker images** 查看所有镜像

```shell
[root@VM-0-16-centos ~]# docker images -a
REPOSITORY   TAG       IMAGE ID       CREATED       SIZE
nginx        latest    87a94228f133   4 weeks ago   133MB

# 解释
REPOSITORY # 镜像的仓库源
TAG        # 镜像的标签
IMAGE ID   # 镜像的ID
CREATED    # 镜像的创建时间
SIZE       # 镜像的大小

# 可选项
Options:
  -a, --all             # 列出所有的镜像
  -q, --quiet           # 只显示镜像的ID
```



**docker search** 搜索镜像

```shell
[root@VM-0-16-centos ~]# docker search mysql
NAME                              DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
mysql                             MySQL is a widely used, open-source relation…   11667     [OK]       
mariadb                           MariaDB Server is a high performing open sou…   4446      [OK]       
mysql/mysql-server                Optimized MySQL Server Docker images. Create…   867                  [OK]

# 可选项
Options:
 --filter=STARS=3000 # 搜索出来的镜像就是STARS大于3000
 
 [root@VM-0-16-centos ~]# docker search mysql --filter=STARS=5000
NAME      DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
mysql     MySQL is a widely used, open-source relation…   11667     [OK] 
```



**docker pull** 下载镜像

```shell
# docker pull 镜像名[:tag]
[root@VM-0-16-centos ~]# docker pull mysql
Using default tag: latest # 如果不写tag，默认就是latest

latest: Pulling from library/mysql # 分层下载，docker image的核心，联合文件系统
b380bbd43752: Already exists 
f23cbf2ecc5d: Pull complete 
30cfc6c29c0a: Pull complete 
b38609286cbe: Pull complete 
8211d9e66cd6: Pull complete 
2313f9eeca4a: Pull complete 
7eb487d00da0: Pull complete 
4d7421c8152e: Pull complete 
77f3d8811a28: Pull complete 
cce755338cba: Pull complete 
69b753046b9f: Pull complete 
b2e64b0ab53c: Pull complete 
Digest: sha256:6d7d4524463fe6e2b893ffc2b89543c81dec7ef82fb2020a1b27606666464d87 # 签名
Status: Downloaded newer image for mysql:latest
docker.io/library/mysql:latest # 真实地址

# docker pull mysql 等价于 docker pull docker.io/library/mysql:latest


# 指定版本下载
[root@VM-0-16-centos ~]# docker pull mysql:5.7
5.7: Pulling from library/mysql
b380bbd43752: Already exists 
f23cbf2ecc5d: Already exists 
30cfc6c29c0a: Already exists 
b38609286cbe: Already exists 
8211d9e66cd6: Already exists 
2313f9eeca4a: Already exists 
7eb487d00da0: Already exists 
a71aacf913e7: Pull complete 
393153c555df: Pull complete 
06628e2290d7: Pull complete 
ff2ab8dac9ac: Pull complete 
Digest: sha256:2db8bfd2656b51ded5d938abcded8d32ec6181a9eae8dfc7ddf87a656ef97e97
Status: Downloaded newer image for mysql:5.7
docker.io/library/mysql:5.7

```



**docker rmi** 删除镜像

```shell
[root@VM-0-16-centos ~]# docker rmi -f 容器id                 # 删除指定容器
[root@VM-0-16-centos ~]# docker rmi -f 容器id1 容器id2 容器id3  # 删除多个容器
[root@VM-0-16-centos ~]# docker rmi -f $(docker images -q)    # 删除全部容器
```



## 容器命令

**docker run** 新建容器

```shell
docker run [可选参数] image # 启动一个镜像

# 参数说明
--name="Name" 	# 容器名称 container1 container2 用来区分容器
-d 				# 后台方式运行 java nohup
-it				# 使用交互方式运行，进入容器查看内容
-p 				# 指定容器端口 -p 8080:8080
	-p ip:主机端口:容器端口
	-p 主机端口:容器端口 （常用）
	-p 容器端口
	容器端口
-P				# 随机指定端口

# 启动并进入容器
[root@VM-0-16-centos ~]# docker run -it centos /bin/bash
[root@40991b3a542d /]# 

```



**exit** 退出容器

```shell
exit 			# 容器直接停止并退出
ctrl + P + Q 	# 容器不停止退出

[root@40991b3a542d /]# exit
exit

[root@VM-0-16-centos home]# docker run -it centos /bin/bash
[root@4d51224c3b42 /]# [root@VM-0-16-centos home]# docker ps
CONTAINER ID   IMAGE     COMMAND       CREATED          STATUS         PORTS     NAMES
4d51224c3b42   centos    "/bin/bash"   10 seconds ago   Up 9 seconds             awesome_wiles
```



**docker ps** 查看容器

```shell
docker ps [可选参数]

# 参数说明
	   	# 列出当前正在运行的容器
 -a 	# 列出当前正在运行的容器，包含历史运行过的容器
 -n=?	# 显示最近创建的容器, ? 为数量
 -q		# 只显示容器编号
 	
[root@VM-0-16-centos home]# docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
[root@VM-0-16-centos home]# docker ps -a
CONTAINER ID   IMAGE          COMMAND                  CREATED         STATUS                     PORTS     NAMES
40991b3a542d   centos         "/bin/bash"              4 minutes ago   Exited (0) 2 minutes ago             naughty_ellis
400ec71cd047   87a94228f133   "/docker-entrypoint.…"   12 days ago     Exited (0) 11 days ago               nginx-test
```



**docker rm** 删除容器

```shell
docker rm 容器id 				    # 删除指定id的容器，不能删除正在运行的容器，如果要强制删除需使用-f
docker rm -f $(docker ps -aq) 	 # 删除所有容器
docker ps -a -q|xargs docker rm  # 删除所有容器

[root@VM-0-16-centos home]# docker rm 4d51224c3b42
Error response from daemon: You cannot remove a running container 4d51224c3b42514cb14e513dfba689b1f58085780a60d64cc1fe1032. Stop the container before attempting removal or force remove
[root@VM-0-16-centos home]# docker rm -f 4d51224c3b42
4d51224c3b42
```



**docker start** 启动和停止容器

```shell
docker start 容器id 	# 启动容器
docker restart 容器id # 重启容器
docker stop 容器id 	# 停止当前正在运行的容器
docker kill 容器id 	# 强制停止当前容器

[root@VM-0-16-centos home]# docker start 1d4633db62a9
1d4633db62a9
[root@VM-0-16-centos home]# docker ps
CONTAINER ID   IMAGE     COMMAND       CREATED              STATUS         PORTS     NAMES
1d4633db62a9   centos    "/bin/bash"   About a minute ago   Up 5 seconds             eager_haibt

[root@VM-0-16-centos home]# docker stop 1d4633db62a9
1d4633db62a9
[root@VM-0-16-centos home]# docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES

[root@VM-0-16-centos home]# docker restart 1d4633db62a9
1d4633db62a9

[root@VM-0-16-centos home]# docker kill 1d4633db62a9
1d4633db62a9
[root@VM-0-16-centos home]# docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```



## 常用的其他命令

**后台启动容器**

```shell
docker run -d 镜像名

[root@VM-0-16-centos home]# docker run -d centos
654b2eafb64f49b347abe97bdd4a4429e2929afe09924ddaf9cd35666cb1a0a5

# 问题docker ps，发现 centos 停止了

# 常见的坑，docker 容器使用后台运行，就必须要有一个前台进程，docker发现没有应用，就会自动停止
# nginx，容器启动后，发现自己没有提供服务，就会立即停止

```



**查看日志**

```shell
docker logs -f -t --tail n 容器id # 查看指定容器日志

# 配置信息
-f			# 显示后面执行的日志
-t			# 显示时间戳
--tail n	# 显示的日志条数


# 自己编写一段shell脚本
while true;do echo coderGoo;sleep 1;done

[root@VM-0-16-centos home]# docker run -d centos /bin/bash -c "while true;do echo coderGoo;sleep 1;done"
```



**查看容器中进程信息**

```shell
docker ps
docker top

[root@VM-0-16-centos home]# docker top 24b393218d9c
UID       PID       PPID      C         STIME     TTY       TIME
root      21140     21122     0         15:55     ?         00:00:00
root      22656     21140     0         16:02     ?         00:00:00  
```



**查看镜像元数据**

```shell
docker inspect 容器id # 查看容器元数据

[root@VM-0-16-centos home]# docker inspect  24b393218d9c
[
    {
        "Id": "24b393218d9c518321c96e5486298b5b8041bb009effb9a377d2686a47b78a2a",
        "Created": "2021-11-22T07:55:13.020815102Z",
        "Path": "/bin/bash",
        "Args": [
            "-c",
            "while true;do echo coderGoo;sleep 1;done"
        ],
        "State": {
            "Status": "running",
            "Running": true,
            "Paused": false,
            "Restarting": false,
            "OOMKilled": false,
            "Dead": false,
            "Pid": 21140,
            "ExitCode": 0,
            "Error": "",
            "StartedAt": "2021-11-22T07:55:13.346794772Z",
            "FinishedAt": "0001-01-01T00:00:00Z"
        },
        "Image": "sha256:5d0da3dc976460b72c77d94c8a1ad043720b0416bfc16c52c45d4847e53fadb6",
        "ResolvConfPath": "/var/lib/docker/containers/24b393218d9c518321c96e5486298b5b8041bb009effb9a377d2686nf",
        "HostnamePath": "/var/lib/docker/containers/24b393218d9c518321c96e5486298b5b8041bb009effb9a377d2686a4
        "HostsPath": "/var/lib/docker/containers/24b393218d9c518321c96e5486298b5b8041bb009effb9a377d2686a47b7
        "LogPath": "/var/lib/docker/containers/24b393218d9c518321c96e5486298b5b8041bb009effb9a377d2686a47b78a21c96e5486298b5b8041bb009effb9a377d2686a47b78a2a-json.log",
        "Name": "/cranky_shtern",
        "RestartCount": 0,
        "Driver": "overlay2",
        "Platform": "linux",
        "MountLabel": "",
        "ProcessLabel": "",
        "AppArmorProfile": "",
        "ExecIDs": null,
        "HostConfig": {
            "Binds": null,
            "ContainerIDFile": "",
            "LogConfig": {
                "Type": "json-file",
                "Config": {}
            },
            "NetworkMode": "default",
            "PortBindings": {},
            "RestartPolicy": {
                "Name": "no",
                "MaximumRetryCount": 0
            },
            "AutoRemove": false,
            "VolumeDriver": "",
            "VolumesFrom": null,
            "CapAdd": null,
            "CapDrop": null,
            "CgroupnsMode": "host",
            "Dns": [],
            "DnsOptions": [],
            "DnsSearch": [],
            "ExtraHosts": null,
            "GroupAdd": null,
            "IpcMode": "private",
            "Cgroup": "",
            "Links": null,
            "OomScoreAdj": 0,
            "PidMode": "",
            "Privileged": false,
            "PublishAllPorts": false,
            "ReadonlyRootfs": false,
            "SecurityOpt": null,
            "UTSMode": "",
            "UsernsMode": "",
            "ShmSize": 67108864,
            "Runtime": "runc",
            "ConsoleSize": [
                0,
                0
            ],
            "Isolation": "",
            "CpuShares": 0,
            "Memory": 0,
            "NanoCpus": 0,
            "CgroupParent": "",
            "BlkioWeight": 0,
            "BlkioWeightDevice": [],
            "BlkioDeviceReadBps": null,
            "BlkioDeviceWriteBps": null,
            "BlkioDeviceReadIOps": null,
            "BlkioDeviceWriteIOps": null,
            "CpuPeriod": 0,
            "CpuQuota": 0,
            "CpuRealtimePeriod": 0,
            "CpuRealtimeRuntime": 0,
            "CpusetCpus": "",
            "CpusetMems": "",
            "Devices": [],
            "DeviceCgroupRules": null,
            "DeviceRequests": null,
            "KernelMemory": 0,
            "KernelMemoryTCP": 0,
            "MemoryReservation": 0,
            "MemorySwap": 0,
            "MemorySwappiness": null,
            "OomKillDisable": false,
            "PidsLimit": null,
            "Ulimits": null,
            "CpuCount": 0,
            "CpuPercent": 0,
            "IOMaximumIOps": 0,
            "IOMaximumBandwidth": 0,
            "MaskedPaths": [
                "/proc/asound",
                "/proc/acpi",
                "/proc/kcore",
                "/proc/keys",
                "/proc/latency_stats",
                "/proc/timer_list",
                "/proc/timer_stats",
                "/proc/sched_debug",
                "/proc/scsi",
                "/sys/firmware"
            ],
            "ReadonlyPaths": [
                "/proc/bus",
                "/proc/fs",
                "/proc/irq",
                "/proc/sys",
                "/proc/sysrq-trigger"
            ]
        },
        "GraphDriver": {
            "Data": {
                "LowerDir": "/var/lib/docker/overlay2/12e6f2e0070001326b563d5c706fbafbda78ad42fe558674704dde0:/var/lib/docker/overlay2/a044f340ae54a56c2c74aaaa3e1145c7d26f6a571c8f67ea0e5efaa6bb1fc318/diff",
                "MergedDir": "/var/lib/docker/overlay2/12e6f2e0070001326b563d5c706fbafbda78ad42fe558674704dde
                "UpperDir": "/var/lib/docker/overlay2/12e6f2e0070001326b563d5c706fbafbda78ad42fe558674704dde0
                "WorkDir": "/var/lib/docker/overlay2/12e6f2e0070001326b563d5c706fbafbda78ad42fe558674704dde0c
            },
            "Name": "overlay2"
        },
        "Mounts": [],
        "Config": {
            "Hostname": "24b393218d9c",
            "Domainname": "",
            "User": "",
            "AttachStdin": false,
            "AttachStdout": false,
            "AttachStderr": false,
            "Tty": false,
            "OpenStdin": false,
            "StdinOnce": false,
            "Env": [
                "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
            ],
            "Cmd": [
                "/bin/bash",
                "-c",
                "while true;do echo coderGoo;sleep 1;done"
            ],
            "Image": "centos",
            "Volumes": null,
            "WorkingDir": "",
            "Entrypoint": null,
            "OnBuild": null,
            "Labels": {
                "org.label-schema.build-date": "20210915",
                "org.label-schema.license": "GPLv2",
                "org.label-schema.name": "CentOS Base Image",
                "org.label-schema.schema-version": "1.0",
                "org.label-schema.vendor": "CentOS"
            }
        },
        "NetworkSettings": {
            "Bridge": "",
            "SandboxID": "62045ee0958f2cae92c44f9de363c5a873b994b5119008116685a25c867ca2e3",
            "HairpinMode": false,
            "LinkLocalIPv6Address": "",
            "LinkLocalIPv6PrefixLen": 0,
            "Ports": {},
            "SandboxKey": "/var/run/docker/netns/62045ee0958f",
            "SecondaryIPAddresses": null,
            "SecondaryIPv6Addresses": null,
            "EndpointID": "99c8f1c4e8fe4b43bd0c18bb94f9c07fcdaef4dd165cc365023512844dacbb0c",
            "Gateway": "172.18.0.1",
            "GlobalIPv6Address": "",
            "GlobalIPv6PrefixLen": 0,
            "IPAddress": "172.18.0.2",
            "IPPrefixLen": 16,
            "IPv6Gateway": "",
            "MacAddress": "02:42:ac:12:00:02",
            "Networks": {
                "bridge": {
                    "IPAMConfig": null,
                    "Links": null,
                    "Aliases": null,
                    "NetworkID": "2b4d4ca6eff36a716b21e640338a2adf9c1e9897818ee4355b2ebb44a4fc090d",
                    "EndpointID": "99c8f1c4e8fe4b43bd0c18bb94f9c07fcdaef4dd165cc365023512844dacbb0c",
                    "Gateway": "172.18.0.1",
                    "IPAddress": "172.18.0.2",
                    "IPPrefixLen": 16,
                    "IPv6Gateway": "",
                    "GlobalIPv6Address": "",
                    "GlobalIPv6PrefixLen": 0,
                    "MacAddress": "02:42:ac:12:00:02",
                    "DriverOpts": null
                }
            }
        }
    }
]

```



**进入正在运行的容器**

```shell
# 方式一
docker exec -it 容器id /bin/bash

[root@VM-0-16-centos home]# docker exec -it 24b393218d9c /bin/bash
[root@24b393218d9c /]# ps -ef
UID        PID  PPID  C STIME TTY          TIME CMD
root         1     0  0 07:55 ?        00:00:00 /bin/bash -c while true;do echo coderGoo;sleep 1;done
root      1300     0  0 08:16 pts/0    00:00:00 /bin/bash
root      1384     1  0 08:17 ?        00:00:00 /usr/bin/coreutils --coreutils-prog-shebang=sleep /usr/bin/s
root      1385  1300  0 08:17 pts/0    00:00:00 ps -ef

# 方式二
docker attach 容器id
```



> docker exec  	进入容器后，开启一个新的终端，可以在里面操作（常用）
>
> docker attach   进入容器正在执行的终端，不会启动新的进程



**从容器中拷贝文件**

```shell
docker cp 容器id:容器内路径 目的的主机路径

# 进入docker容器内部
[root@VM-0-16-centos home]# docker attach abc0edbf3a2c
# 新建文件
[root@abc0edbf3a2c home]# touch docker_container.java
[root@abc0edbf3a2c home]# ls
docker_container.java

# 从docker容器内部复制文件至主机中
[root@VM-0-16-centos home]# docker cp abc0edbf3a2c:/home/docker_container.java /home
[root@VM-0-16-centos home]# ls
coderGoo  docker_container.java

# PS: 拷贝是一个手动过程，未来我们使用-v卷的技术，可以实现文件同步
```



## 小结

```shell
attach 	Attach to a running container 				# 当前 shell 下 attach 连接指定运行镜像
bulid 	Build an image from a Dockerfile			# 通过 Dockerfile 定制镜像
commit	Create a new image from a container changes # 提交当前容器为新的镜像
cp		Copy files/folders from the containers filesystem to the host path # 从容器中拷贝指定文件或者目录到宿主机下
create	Create a new container						# 创建一个新的容器，同run，但不启动容器
diff	Inspect changes on a container's filesystem	# 查看 docker 容器编号
events	Get real time events from the server		# 从 docker 服务获取容器实时事件
exec	Run a command in an existing container		# 运行已存在的容器
export 	Stream the contents of a container as a tar archive	# 导出容器的内容流作为一个 tar 归档文件[对应import]
history	Show the history of an image				# 展示一个镜像的形成历史
images	List images									# 列出系统当前镜像
import	Create a new filesystem image from the contents of a tarball # 从tar包中的内容创建一个新的文件系统映像[对应export]
info	Display system-wide information				# 显示系统相关信息
inspect	Return low-level information on a container	# 查看容器详细信息
kill	Kill a running container					# kill指定的容器
load	Load an image from a tar archive			# 从一个tar包中加载一个镜像[对应save]
login	Register or Login to the docker registry server	# 注册或者登陆一个docker源服务器
logout	Log out from a Docker registry server		# 从当前 Docker registry 退出
logs	Fetch the logs of a container				# 输出当前容器日志信息
port 	Lookuo the public-facing port which is NAT-ed to PRIVATE_PORT # 查看映射端口对应的容器内部源端口
pause	Pause all processes within a container		# 暂停容器
ps		List containers								# 列出容器列表
pull	Pull an image or a repository from the docker registry server # 从docker镜像源服务器拉取 指定镜像 或者 库镜像
push	Push an image or a repository from the docker registry server # 推送指定镜像或者库镜像值docker源服务器
restart	Restart a running container					# 重启运行的容器
rm		Remove one or more contaienrs				# 移除一个或者多个容器
rmi		Remove one or more images					# 移除一个或多个镜像[无容器使用该镜像才可删除，否则需删除相关容器才可继续；-f强制删除]
run		Run a command in a new container			# 创建一个新的容器并运行一个命令
save	Save an image to a tar archive				# 保存一个镜像为一个tar包[对应load]
search	Search for an image on the Docker Hub		# 在 Docker Hub 中搜索镜像
start	Start a stooped container					# 启动容器
stop	Stop a running container					# 停止容器
tag		Tag an image into a repository				# 给源中镜像打标签
top		Lookup the running processes of a container	# 查看容器中运行的进程信息
unpause	Unpause a paused container					# 取消暂停容器
version	Show the docker version information			# 查看 docker 版本号
wait	Block until a container stops, then print its exit code	# 截取容器停止时的退出状态值
```

