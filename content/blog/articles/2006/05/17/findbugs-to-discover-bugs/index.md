---
title: "findbugs to discover bugs"
date: "2006-05-17T10:15:00Z"
author:
    username: "enrico.giurin"
    fullname: "Enrico Giurin"
    email: "enrico.giurin@jugpadova.it"
categories:
    - name: "Software"
      permalink: "software"
tags:
    - name: "bug"
      display: "bug"
    - name: "tool"
      display: "tool"
---
<a href="http://findbugs.sourceforge.net/index.html"><img src="http://findbugs.sourceforge.net/umdFindbugs.png" alt="FindBugs" width="100" border="0" align="left" HSPACE="10" VSPACE="10" /></a>  

I was investigating about a good tool for profiling when I met with <a href="http://findbugs.sourceforge.net/">findbugs</a>.
To be honest I found discussion about this tool in a thread of <a href="http://www.jugmilano.it">jug milano</a> mailing list.
<b>findbugs</b> is a free software  which looks for bugs in Java code.
In order to execute this program is enough you have installed on your machine <a href="http://java.sun.com/products/javawebstart/">Java Web Start</a>. Thereby try to click <a href="http://findbugs.sourceforge.net/jnlp/findbugs.jnlp">here</a>  , after set parameter of your project (src, jar, etc) and finally push on 'Find Bugs' button.<br> 
I was amazed at how many bugs it found like comparison of String objects using == or != instead of using <i>equals()</i> method. <br>
By the way...I didn't generate that code :-)





