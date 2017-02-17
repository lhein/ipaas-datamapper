package com.mediadriver.atlas.java.inspect.v2;

public class InspectionException extends Exception {
	private static final long serialVersionUID = 1L;
	
	public InspectionException(String msg) { super(msg); }	
	public InspectionException(String msg, Throwable cause) { super(msg, cause); }	
	public InspectionException(Throwable cause) { super(cause); }
}
