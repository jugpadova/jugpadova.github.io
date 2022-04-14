---
title: "JDBC url for oracle RAC"
date: "2007-04-11T18:07:00Z"
author:
    username: "enrico.giurin"
    fullname: "Enrico Giurin"
    email: "enrico.giurin@jugpadova.it"
categories:
    - name: "Tips & Tricks"
      permalink: "tips-and-tricks"
tags:
    - name: "jdbc"
      display: "jdbc"
    - name: "oracle"
      display: "oracle"
---

If you have to connect to oracle RAC (Real Application Cluster) using
JDBC with thin driver, the classic url:\

```xml
jdbc:oracle:thin:`<HOST>:1521:<SID>
```

doesn't work and you get the error ORA - 12505.<br>
Instead, you must use this url:

```xml
jdbc:oracle:thin:`(DESCRIPTION=(LOAD\_BALANCE=on)
(ADDRESS=(PROTOCOL=TCP)(HOST=host1) (PORT=1521))
(ADDRESS=(PROTOCOL=TCP)(HOST=host2) (PORT=1521))
(CONNECT\_DATA=(SERVICE\_NAME=service)))
```

If you have an oracle client, like
<a href="http://www.toadsoft.com">toad</a>, check the tsnames.ora for
the correct values of SERVICE\_NAME and host.
