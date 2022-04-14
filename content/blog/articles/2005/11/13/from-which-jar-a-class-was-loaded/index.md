---
title: "From which Jar a Class was loaded?"
date: "2005-11-13T08:11:00Z"
author: paolo.dona
author_data:
    username: "paolo.dona"
    fullname: "Paolo Dona'"
    email: "paolo.dona@jugpadova.it"
---
Sometimes in production environments I face problems never encountered during development... It's a general thing.. could happen with jdbc drivers or xml parsers.
 
I just feel classes are loaded from a different jar than expected. 

This of course could happen if you're deploying  to a very different application server or if you've no control over the production server classpath.

I found in _javaalmanac.com_ a code snippet that can help you identify which is the jar containing a specific Class at runtime:
```java
Class cls = MyFoo.class;
ProtectionDomain pDomain = cls.getProtectionDomain();
CodeSource cSource = pDomain.getCodeSource();
URL loc = cSource.getLocation(); 
System.out.println(loc); 
// prints something like "c:/jars/MyFoo.jar"
```

This way you can check if your class is loaded right from the expected jar, not elsewhere :-).
 
This has shown to be really useful during my sad production debug sessions.

Hope it can help you as well.


