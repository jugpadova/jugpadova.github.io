---
title: "Serialize a bean using jdbc"
date: "2006-01-10T17:19:00Z"
author:
    username: "enrico.giurin"
    fullname: "Enrico Giurin"
    email: "enrico.giurin@jugpadova.it"
categories:
    - name: "Tips & Tricks"
      permalink: "tips-and-tricks"
tags:
    - name: "blob"
      display: "blob"
    - name: "jdbc"
      display: "jdbc"
    - name: "bean"
      display: "bean"
---
Sometimes,  in my work as programmer, I need to serialize an object (bean) into a table, in a BLOB field, as well as retrieves bean from a ResultSet.
I have realized a simple example that, using JDBC, allows to obtain this.

Here the method to fill PreparedStatement :

```java
public static void fillPreparedStatement(PreparedStatement pst, int index,
         Serializable obj) throws Exception {

      if (obj != null) {
         ByteArrayOutputStream regStore = new ByteArrayOutputStream();

         ObjectOutputStream regObjectStream = new ObjectOutputStream(regStore);
         regObjectStream.writeObject(obj);
         byte[] regBytes = regStore.toByteArray();
         regObjectStream.close();
         regStore.close();
         ByteArrayInputStream regArrayStream = new ByteArrayInputStream(regBytes);
         pst.setBinaryStream(index, regArrayStream, regBytes.length);
      }// end of if
      else {
         pst.setNull(index, Types.BLOB);
      }
}// end of method

```

Here the method to retrieve bean from ResultSet.
```java
public static Object getFromResultSet(ResultSet rs, String columnName)
         throws Exception {
      byte[] regBytes = rs.getBytes(columnName);
      ByteArrayInputStream regArrayStream = new ByteArrayInputStream(regBytes);
      ObjectInputStream regObjectStream = new ObjectInputStream(
            regArrayStream);
      return regObjectStream.readObject();
}
```
I tested this code using MySQL 4.1 db.
Hope this example could save your valuable time.
Enrico.
