package com.mediadriver.atlas.java.v2;

import com.mediadriver.atlas.java.v2.JavaClass;
import com.mediadriver.atlas.java.v2.JavaEnumFields;
import com.mediadriver.atlas.v2.Fields;

public class AtlasJavaModelFactory {

	public static JavaClass createJavaClass() {
		JavaClass javaClass = new JavaClass();
		javaClass.setJavaEnumFields(new JavaEnumFields());
		javaClass.setFields(new Fields());
		return javaClass;
	}
}
