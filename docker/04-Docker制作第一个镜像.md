## Docker镜像加载原理

> UFS 联合文件系统





> Docker镜像加载原理



## 分层理解





## Commit镜像

```shell
docker commit 提交容器成为一个新的版本

# 与git类似
docker commit -m="提交的描述信息" -a="作者" 容器id 目标镜像名[TAG]
```



```shell
# 1. 启动一个默认的tomcat

# 2. 发现这个默认的tomcat 是没有webapps应用，镜像的原因，官方的镜像默认 webapps 下没有文件的

# 3. 自己拷贝了基本文件

# 4. 将我们操作过的容器，通过commit提交为一个新的镜像，我们就使用修改过的镜像，这就是我们自己的修改镜像
```

