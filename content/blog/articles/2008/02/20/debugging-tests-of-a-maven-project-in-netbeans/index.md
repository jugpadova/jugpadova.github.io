---
title: "Debugging tests of a Maven project in NetBeans"
date: "2008-02-20T10:30:00Z"
author: lucio.benfante
author_data:
    username: "lucio.benfante"
    fullname: "Lucio Benfante"
    email: "lucio.benfante@jugpadova.it"
---

Occasionally I experienced some problems in debugging test classes using
NetBeans with Maven projects. Simply, the debugger started but didn't
attach to the running tests.

Eventually I discovered the reason!

I used to configure the surefire plugin with:

```xml\
<plugin>\
<groupId>org.apache.maven.plugins</groupId>\
<artifactId>maven-surefire-plugin</artifactId>\
<configuration>\
<skip>false</skip>\
<useFile>true</useFile>\
<forkMode>once</forkMode> <!-- always, once or never -->

<!-- <reportFormat>plain</reportFormat> -->

<argLine>-Xmx512M</argLine>\
</configuration>\
</plugin>\
```

The problem is the <code>argLine</code> parameter. It will override the
parameters the Mevenide plugin will pass for debugging tests. So, I
commented it in my configuration:

```xml\
<plugin>\
<groupId>org.apache.maven.plugins</groupId>\
<artifactId>maven-surefire-plugin</artifactId>\
<configuration>\
<skip>false</skip>\
<useFile>true</useFile>\
<forkMode>once</forkMode> <!-- always, once or never -->

<!-- <reportFormat>plain</reportFormat> -->
<!--argLine>-Xmx512M</argLine-->
<!-- don't use if you want to debug tests in NetBeans -->

</configuration>\
</plugin>\
```

...and now I can debug my tests!
