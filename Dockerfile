# 基础镜像
FROM registry-vpc.cn-shanghai.aliyuncs.com/chuxingpay/node14-pulsar:v0.0.2

# copy 文件或目录到镜像
COPY ./ /root/app

# 默认工作目录
WORKDIR /root/app

# 在镜像中执行命令，安装依赖包。RUN 后面执行的命令结果会影响到构建后的镜像
RUN npm i --registry=https://registry.npmmirror.com

ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# 由镜像启动container(实例)时执行的指令
CMD ["npm", "run", "start"]