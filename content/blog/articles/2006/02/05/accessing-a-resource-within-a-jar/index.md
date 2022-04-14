---
title: "Accessing a resource within a .jar"
date: "2006-02-05T18:08:00Z"
author: emanuele.gesuato
author_data:
    username: "emanuele.gesuato"
    fullname: "Emanuele Gesuato"
    email: ""
---
Sometimes it is useful to distribute an application in a jar file through Java Web Start or any other way. So, you could have to read some resource (images or properties file) from inside a jar. 
How can you do it ? It's very simple, here's an example to retrieve an image:

<code lang="java">
ImageIcon image = (new ImageIcon(getClass().getResource("yourpackage/mypackage/image.gif")));  
</code>

In general, you can retrieve an InputStream in the following way:

<code lang="java">
InputStream is = this.getClass().getClassLoader()
&nbsp;&nbsp;&nbsp;.getResourceAsStream("yourpackage/mypackage/myfile.xml");
</code>

It will run inside or outside the jar. Enjoy !

