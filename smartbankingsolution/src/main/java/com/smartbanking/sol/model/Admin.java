package com.smartbanking.sol.model;

import jakarta.persistence.*;

@Entity
@Table(name = "admin")
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long adminId;

    @Column(nullable = false)
    private String adminName;

    @Column(nullable = false)
    private String password;
    
    @Column(nullable = false)
    private String position;

    @Column(nullable = false)
    private float salary;
    
    @Column(unique = true, nullable = false)
    private String adminEmail;

    @Column(length = 10, nullable = false)
    private long phoneNo;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id", referencedColumnName = "id")
    private Address address;

    // Getters and Setters
    public long getAdminId() {
        return adminId;
    }

    public void setAdminId(long adminId) {
        this.adminId = adminId;
    }

    public String getAdminName() {
        return adminName;
    }

    public void setAdminName(String adminName) {
        this.adminName = adminName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password; // Remove additional encryption here
    }

    public String getPosition() {
    	return position;
    }
    
    public void setPosition(String position) {
    	this.position = position;
    }
    
    public float getSalary() {
    	return salary;
    }
    
    public void setSalary(float salary) {
    	this.salary = salary;
    }

    public String getAdminEmail() {
        return adminEmail;
    }

    public void setAdminEmail(String adminEmail) {
        this.adminEmail = adminEmail;
    }

    public long getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(long phoneNo) {
        this.phoneNo = phoneNo;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    
}
