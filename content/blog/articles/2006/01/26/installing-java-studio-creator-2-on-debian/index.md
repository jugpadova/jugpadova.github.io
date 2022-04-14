---
title: "Installing Java Studio Creator 2 on Debian"
date: "2006-01-26T18:34:00Z"
author:
    username: "dario.santamaria"
    fullname: "Dario Santamaria"
    email: "dario.santamaria@jugpadova.it"
categories:
    - name: "Tips & Tricks"
      permalink: "tips-and-tricks"
tags:
    - name: "install"
      display: "install"
    - name: "creator"
      display: "creator"
    - name: "debian"
      display: "debian"
---
On Linux, the required distribution for Java Studio Creator 2 (now <a href="http://developers.sun.com/members/promo/freetools/jscreator2.jsp" target="_blank">Free</a> for all SDN members) is Fedora. I'm a Debian user and I succeeded to install it, however.<br />
The first time my installation completes too soon, without correctly installing Java Application Server. I read the FAQs and I found a page saying:<br />
<i>Check if the following RPM packages exist on your system:</i>
<ul>
<li> either <code>libstdc++</code> or <code>compat-libstdc++</code> </li>
<li> either <code>libstdc++-devel</code> or <code>compat-libstdc++-devel</code></li>
</ul>
<i>If these are missing, first install them. Then restart the Java Studio Creator installer.
</i><br/>

The correct Debian (Etch) packages (<i><code>apt-get</code> 'em!</i>) are
<ul>
<li><code>libstdc++2.10-glibc2.2</code> and</li>
<li><code>libstdc++2.10-dev</code></li>
</ul>

I don't know if both are required or only the first one, but now the whole installation of Java Studio Creator 2 is complete.<br /><br/>
Thanks to <a href="http://blogs.sun.com/roller/page/coldrick?entry=using_java_netbeans_and_sun" target="_blank">David Coldrick's Weblog</a> (installation on Ubuntu of JSCreator 1).

