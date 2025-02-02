[toc]

# DNS 解析

## 1. 什么是 DNS

是一个分布式数据库，功能是联系域名 和 IP 地址。域名和 IP 的对应关系，被称为记录（record），可分为各种类型

- A： Address， 域名指向的 IP 地址，一个域名可以有多个A 记录
- NS：Name Server，保存下一级域名信息的服务器地址
- MX：Mail eXchange，接受电子邮件的服务器地址
- CNAME: Canonical Name,返回另一个域名

## 2. 域名解析过程

- 浏览器缓存

- 操作系统 dnscache

- Hosts 文件

- 非权威域名服务器

- 根域名服务器

- 顶级域名服务器

- 二级域名服务器

- 权威域名服务器

  >非权威域名服务器
  >
  >许多大公司、网络运行商都会建立自己的 DNS 服务器，作为用户 DNS 查询的代理，代替用户访问核心 DNS 系统。这些“野生”服务器被称为“非权威域名服务器”，可以缓存之前的查询结果，如果已经有了记录，就无需再向根服务器发起查询，直接返回对应的 IP 地址。
  >
  >这些 DNS 服务器的数量要比核心系统的服务器多很多，而且大多部署在离用户很近的地方。比较知名的 DNS 有 Google 的“8.8.8.8”，Microsoft 的“4.2.2.1”，还有 CloudFlare 的“1.1.1.1”等等。

## 3. CDN

使用 CDN 的方法很简单，只需要修改自己的 DNS 解析，设置一个 CNAME 指向 CDN 服务商即可

用户访问未使用 CDN 缓存资源的过程为：

- 浏览器通过前面提到的过程对域名进行解析，以得到此域名对应的IP地址
- 浏览器使用所得到的的 IP 地址，向域名的服务主机发出数据访问请求；
- 服务器向浏览器返回响应数据

通俗点就是用户访问的资源原本是存放在你自己的服务器上，通过修改 DNS 让用户根据 IP 等情况来选择合适的 CDN 缓存服务器来获取资源。

使用CDN后

- 当用户点击网站页面上的内容URL，经过本地 DNS 系统解析，DNS 系统会最终将域名的解析权交给 CNAME 指向的 CDND 专用的 DNS 服务器
- CDN 的 DNS 服务器将 CDN 的全局负载均衡设备 IP 地址返回用户
- 用户向 CDN 的全局负载均衡设备发起内容 URL 访问请求
- CDN 全局负载均衡设备根据用户 IP 地址，以及用户请求的内容 URL，选择一台用户所属区域的区域负载均衡设备，告诉用户向这台设备发起请求。
- 区域负载均衡设备会为用户选择一台合适的缓存服务器提供服务，选择的依据包括：根据用户 IP 地址，判断哪一台服务器距用户最近；根据用户所请求的 URL 中携带的内容名称，判断哪一台服务器上有用户所需要的内容；查询各个服务器当前的负载情况，判断哪一台服务器尚有服务能力。基于以上这些条件的综合分析之后，区域负载均衡设备会向全局负载均衡设备返回一台缓存服务器的 IP 地址。
- 全局负载均衡设备把服务器的 IP 地址返回给用户
- 用户向缓存服务器发起请求，缓存服务器响应用户请求，将用户所需内容传送到用户终端。如果这台缓存服务器上并没有用户想要的内容，而区域均衡设备依然将它分配给了用户，那么这台服务器就要向它的上一级缓存服务器请求内容，直至追溯到网站的源服务器将内容拉到本地。

