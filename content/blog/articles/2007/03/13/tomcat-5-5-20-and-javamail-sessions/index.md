---
title: "Tomcat 5.5.20 and JavaMail Sessions"
date: "2007-03-13T06:40:00Z"
author:
    username: "lucio.benfante"
    fullname: "Lucio Benfante"
    email: "lucio.benfante@jugpadova.it"
categories:
    - name: "Tips & Tricks"
      permalink: "tips-and-tricks"
    - name: "Programmazione"
      permalink: "programmazione"
tags:
    - name: "tomcat"
      display: "Tomcat"
    - name: "javamail"
      display: "JavaMail"
    - name: "jndi"
      display: "JNDI"
    - name: "bug"
      display: "bug"
---
_You'll find an article in italian on the same topic in [my personal blog](http://benfante.blogspot.com/2007/03/tomcat-castrato.html)._

In [Tomcat](http://tomcat.apache.org) you can define a JNDI Resource for a JavaMail session putting the following code in you Context definition:

```xml
<Resource name="mail/Session" auth="Container"
            type="javax.mail.Session"
            mail.smtp.host="localhost"/>
```
And in you web.xml:

```xml
<resource-ref>
  <res-ref-name>mail/Session</res-ref-name>
  <res-type>javax.mail.Session</res-type>
  <res-auth>Container</res-auth>
</resource-ref>
```

Then you can use it in you code:

```java
Context initCtx = new InitialContext();
Session session =
    (Session) envCtx.lookup("java:comp/env/mail/Session");
```

Using Tomcat 5.5.20 (and 5.5.17, and 5.5.23...and maybe other versions) the last statement will produce a <code>ClassNotFoundException: org.apache.naming.factory.MailSessionFactory</code>. The cause is obviously that class is missing from the <code>common/lib/naming-factory.jar</code> distributed by Tomcat. I don't know if it was a (repeated) problem in building Tomcat. Luckly the source code of that class is still present in the source distribution of Tomcat. Simply it isn't included in the build process if you don't have the [JavaMail](http://java.sun.com/products/javamail/) and the [JavaBeans Activation Framework](http://java.sun.com/products/javabeans/jaf/) in the build classpath. So I re-built the <code>naming-factory.jar</code> file and substituted in <code>common/lib</code>.

You can rebuild your own JAR, or download my new [naming-factory.jar](http://snipurl.com/nfjar).

I discovered this problem (bug?) installing [LifeRay](http://www.liferay.com/) 4.1.2 using the WAR distribution. On the contrary the LifeRay-Tomcat bundle contains the correct <code>naming-factory.jar</code> yet. The LifeRay error in this case is more obscure. It reports a <code>javax.naming.NameNotFoundException: Name mail is not bound in this Context</code>! Of course the JNDI Resource is correctly configured. This happens because LifeRay try to guess the JNDI name of the resource, that changes for the different application servers. So that exception comes from one of the attempts, and the real problem is lost and hidden. So, if you'll see a such message, don't spend time re-re-re-configuring your JNDI resources...but patch Tomcat!
