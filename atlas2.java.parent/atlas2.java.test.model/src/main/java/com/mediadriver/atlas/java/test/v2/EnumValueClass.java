package com.mediadriver.atlas.java.test.v2;

public enum EnumValueClass {
	
	ONE("One"), 
	TWO("Two"), 
	THREE("Three");
	
	private String value;
	
	private EnumValueClass(String value) {
		this.value = value;
	}
	
	public String value() {
        return value;
    }

    public static EnumValueClass fromValue(String v) {
        for (EnumValueClass c: EnumValueClass.values()) {
            if (c.value.equals(v)) {
                return c;
            }
        }
        throw new IllegalArgumentException(v);
    }
}
