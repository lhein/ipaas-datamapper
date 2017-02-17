package com.mediadriver.atlas.v2;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

public class AtlasModelFactory {

	public static final Set<String> primitiveClasses = new HashSet<String>(Arrays.asList("byte", "short", "int", "long", "float", "double", "boolean", "char"));
	public static final Set<String> boxedPrimitiveClasses = new HashSet<String>(Arrays.asList("java.lang.Byte", "java.lang.Short", "java.lang.Integer", "java.lang.Long", "java.lang.Float", "java.lang.Double", "java.lang.Boolean", "java.lang.Character"));
		
	public static FieldType fieldTypeForPrimitiveClassName(String className) {
		if(className == null || className.isEmpty()) {
			return null;
		}
		
		switch(className) {
		case "boolean": return FieldType.BOOLEAN;
		case "java.lang.Boolean": return FieldType.BOOLEAN;
		case "byte": return FieldType.BYTE;
		case "java.lang.Byte": return FieldType.BYTE;
		case "char": return FieldType.CHAR;
		case "java.lang.Character": return FieldType.CHAR;
		case "double": return FieldType.DOUBLE;
		case "java.lang.Double": return FieldType.DOUBLE;
		case "float": return FieldType.FLOAT;
		case "java.lang.Float": return FieldType.FLOAT;
		case "int": return FieldType.INTEGER;
		case "java.lang.Integer": return FieldType.INTEGER;
		case "long": return FieldType.LONG;
		case "java.lang.Long": return FieldType.LONG;
		case "short": return FieldType.SHORT;
		case "java.lang.Short": return FieldType.SHORT;
		case "java.lang.String": return FieldType.STRING;
		default: return FieldType.UNSUPPORTED;
		}
	}
}
