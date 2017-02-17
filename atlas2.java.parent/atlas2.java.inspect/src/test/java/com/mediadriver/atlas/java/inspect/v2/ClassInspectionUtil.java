package com.mediadriver.atlas.java.inspect.v2;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import com.mediadriver.atlas.java.v2.JavaClass;
import com.mediadriver.atlas.java.v2.JavaField;
import com.mediadriver.atlas.v2.Field;

public class ClassInspectionUtil {
	
	public static void validateFlatPrimitiveClass(Class<?> clazz) throws Exception {
		JavaClass flatClass = ClassInspector.inspectClass(clazz);
		assertNotNull(flatClass);
		assertNotNull(flatClass.getClassName());
		assertEquals("FlatPrimitiveClass", flatClass.getClassName());
		assertNotNull(flatClass.getFullyQualifiedName());
		assertEquals("com.mediadriver.atlas.java.test.v2.FlatPrimitiveClass", flatClass.getFullyQualifiedName());
		assertNotNull(flatClass.getPackageName());
		assertEquals("com.mediadriver.atlas.java.test.v2", flatClass.getPackageName());
		assertNotNull(flatClass.getFields());
		assertNotNull(flatClass.getFields().getField());
		assertFalse(flatClass.getFields().getField().isEmpty());
		assertEquals(new Integer(34), new Integer(flatClass.getFields().getField().size()));
		assertNotNull(flatClass.getJavaEnumFields());
		assertNotNull(flatClass.getJavaEnumFields().getJavaEnumField());
		assertTrue(flatClass.getJavaEnumFields().getJavaEnumField().isEmpty());
		
		for(Field f : flatClass.getFields().getField()) {
			assertNotNull(f);
			assertTrue(f instanceof JavaField);
			JavaField j = (JavaField)f;
			assertNotNull(j.getName());
			switch(j.getType()) {
			case BOOLEAN: 
				if(j.isArray()) {
					validateField("boolean", "Boolean", j, false);
				} else {
					validateField("boolean", "Boolean", j, true);
				}
				break;
			case BYTE:  
				validateField("byte", "Byte", j);
				break;
			case CHAR:  
				validateField("char", "Char", j);
				break;
			case DOUBLE:  
				validateField("double", "Double", j);
				break;
			case FLOAT:  
				validateField("float", "Float", j);
				break;
			case INTEGER:  
				validateField("int", "Int", j);
				break;
			case LONG:  
				validateField("long", "Long", j);
				break;
			case SHORT:  
				validateField("short", "Short", j);
				break;
			case STRING:  
				validateField("string", "String", j);
				break;
			default: fail("Extra field detected: " + j.getName());
			}			
		}
	}
	
	public static void validateField(String lowName, String capName, JavaField j) {
		validateField(lowName, capName, j, false);
	}
	
	public static void validateField(String lowName, String capName, JavaField j, boolean usesIs) {
		assertNotNull("Field: " + j.getName(), j.getGetMethod());
		assertNotNull("Field: " + j.getName(), j.getSetMethod());
		assertNotNull("Field: " + j.getName(), j.getType());
		assertNull("Field: " + j.getName(), j.getValue());
		assertNull("Field: " + j.getName(), j.getAnnotations());
		
		String fieldText = "Field";
		if(j.isArray()) {
			fieldText = "ArrayField";
		}
		
		if(String.format("%s%s", lowName, fieldText).equals(j.getName())) {
			if(usesIs) {
				assertEquals(String.format("is%s%s", capName, fieldText), j.getGetMethod());
			} else {
				assertEquals(String.format("get%s%s", capName, fieldText), j.getGetMethod());
			}
			assertEquals(String.format("set%s%s", capName, fieldText), j.getSetMethod());
		} else if(String.format("boxed%s%s", capName, fieldText).equals(j.getName())) {
			assertEquals(String.format("getBoxed%s%s", capName, fieldText), j.getGetMethod());
			assertEquals(String.format("setBoxed%s%s", capName, fieldText), j.getSetMethod());
		} else {
			fail("Extra field detected: " + j.getName());
		}
	}
}
