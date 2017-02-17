package com.mediadriver.atlas.java.service.v2;

import javax.xml.bind.annotation.XmlRootElement;

import com.fasterxml.jackson.annotation.JsonRootName;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@XmlRootElement(name = "TestAddress")
@JsonRootName("TestAddress")
@JsonTypeInfo(include = JsonTypeInfo.As.PROPERTY, use = JsonTypeInfo.Id.CLASS, property = "jsonType")
public class TestAddress {
	private String addressLine1;
	private String addressLine2;
	private String city;
	private String state;
	private String zipCode;
	
	public String getAddressLine1() { return addressLine1; }
	public void setAddressLine1(String addressLine1) { this.addressLine1 = addressLine1; }
	public String getAddressLine2() { return addressLine2; }
	public void setAddressLine2(String addressLine2) { this.addressLine2 = addressLine2; }
	public String getCity() { return city; }
	public void setCity(String city) { this.city = city; }
	public String getState() { return state; }
	public void setState(String state) { this.state = state; }
	public String getZipCode() { return zipCode; }
	public void setZipCode(String zipCode) { this.zipCode = zipCode; }

}
