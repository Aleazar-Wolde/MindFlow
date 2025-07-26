package com.mindflow.backend.domain;

import jakarta.persistence.*;
import org.hibernate.validator.constraints.UUID;


@Entity //  An entity annotation creates a table in the DataBase for Us. JPA
@Table (name ="users") //The table annotation gives us the choice to change the table name that is created in the Db.
public class User {

    private String name;
    @Id
    @GeneratedValue
    private UUID id;
    @Column(unique = true, nullable = false)
    private String email;
    private String password;

    public User(String name, UUID id, String email, String password){
        this.name = name;
        this.id = id;
        this.email = email;
        this.password = password;
    }

    //Getter and setter for the User filed.
    public String getName(){
        return name;
    }
    public void setName(String name){
        this.name = name;
    }

    //Getter and setter for the id filed
    public UUID getId(){
        return id;
    }
    public void setId(UUID id){
        this.id = id;
    }

    //Getter and setter for the email filed
    public String getEmail(){
        return email;
    }
    public void setEmail(String email){
        this.email = email;
    }

    //Getter and Setter for the password filed
    public String getPassword(){
        return password;
    }
    public void setPassword(String password){
        this.password = password;
    }

}
