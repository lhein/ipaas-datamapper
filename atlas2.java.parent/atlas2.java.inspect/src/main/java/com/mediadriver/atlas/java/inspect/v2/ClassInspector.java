package com.mediadriver.atlas.java.inspect.v2;

import java.io.Serializable;
import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.mediadriver.atlas.java.v2.JavaClass;
import com.mediadriver.atlas.java.v2.JavaEnumField;
import com.mediadriver.atlas.java.v2.JavaField;
import com.mediadriver.atlas.java.v2.AtlasJavaModelFactory;
import com.mediadriver.atlas.v2.AtlasModelFactory;
import com.mediadriver.atlas.v2.FieldType;

public class ClassInspector implements Serializable {
	
	private static final long serialVersionUID = 1L;
	public static final Set<String> primitiveClasses = new HashSet<String>(Arrays.asList("byte", "short", "int", "long", "float", "double", "boolean", "char"));
	public static final Set<String> boxedPrimitiveClasses = new HashSet<String>(Arrays.asList("java.lang.Byte", "java.lang.Short", "java.lang.Integer", "java.lang.Long", "java.lang.Float", "java.lang.Double", "java.lang.Boolean", "java.lang.Character", "java.lang.String"));
	
	public static Map<String, JavaClass> inspectPackage(String packageName) throws ClassNotFoundException, InspectionException {
		return inspectPackages(Arrays.asList(packageName), false);
	}
	
	public static Map<String, JavaClass> inspectPackages(String packageName, boolean inspectChildren) throws ClassNotFoundException, InspectionException {
		return inspectPackages(Arrays.asList(packageName), inspectChildren);
	}
	
	public static Map<String, JavaClass> inspectPackages(List<String> packages, boolean inspectChildren) throws ClassNotFoundException, InspectionException {
		packages = inspectChildren ? findChildPackages(packages) : packages;
		Map<String, JavaClass> classes = new HashMap<>();
		for (String p : packages) {
			classes.putAll(inspectClasses(findClassesForPackage(p)));
		}		
		return classes;
	}
	
	public static List<String> findClassesForPackage(String packageName) {		
		List<String> classNames = new LinkedList<>();
		List<Class<?>> classes = ClassFinder.find(packageName);
		if (classes != null) {
			for (Class<?> clz : classes) {
				classNames.add(clz.getCanonicalName());
			}
		}
		return classNames;
	}
	
	public static List<String> findChildPackages(List<String> packages) {
		List<String> foundPackages = new LinkedList<>();
		for (String p : packages) {
			foundPackages.addAll(findChildPackages(p));
		}
		return foundPackages;
	}
	
	public static List<String> findChildPackages(String packageName) {
		List<String> packageNames = new LinkedList<>();
		Package originalPackage = Package.getPackage(packageName);
		Package[] allPackages = Package.getPackages();
		if (allPackages != null) {
			for (Package tmpPackage : allPackages) {
				if (tmpPackage.getName().startsWith(originalPackage.getName())) {
					packageNames.add(tmpPackage.getName());
				}
			}
		}
		return packageNames;
	}		
	
	public static Map<String,JavaClass> inspectClasses(List<String> classNames) throws ClassNotFoundException, InspectionException {
		Map<String,JavaClass> classes = new HashMap<>();
		for (String c : classNames) {
			JavaClass d = inspectClass(Class.forName(c));
			classes.put(d.getFullyQualifiedName(), d);
		}
		return classes;
	}

	public static JavaClass inspectClass(String className) throws ClassNotFoundException, InspectionException {
		return inspectClass(Class.forName(className));
	}
	
	public static JavaClass inspectClass(Class<?> clz) throws InspectionException {
		JavaClass d = AtlasJavaModelFactory.createJavaClass();
		d.setClassName(clz.getSimpleName());
		d.setPackageName(clz.getPackage().getName());
		d.setFullyQualifiedName(clz.getCanonicalName());	
		Object[] enumConstants = clz.getEnumConstants();
		if (enumConstants != null) {
			d.setEnumeration(true);
			for (Object o : enumConstants) {
				if (o instanceof Enum) {
					Enum<?> in = (Enum<?>) o;
					JavaEnumField out = new JavaEnumField();
					out.setName(in.name());
					out.setOrdinal(in.ordinal());
					d.getJavaEnumFields().getJavaEnumField().add(out);
				} else {
					throw new InspectionException("Unsupported enum constant class: " + o.getClass().getCanonicalName());
				}
				System.out.println(o);
			}
		} else {
			d.setEnumeration(false);
		}
		
		Field[] fields = clz.getDeclaredFields();
		if (fields != null) {
			for (Field f : fields) {
				if (Enum.class.isAssignableFrom(f.getType())) {
					continue;
				}
				JavaField s = inspectField(f);
				d.getFields().getField().add(s);
			}
		}
		
		//TODO: annotations, generics, interfaces, enums, class modifiers (public, synchronized, etc), 
		//more of these here: https://docs.oracle.com/javase/8/docs/api/java/lang/Class.html#isPrimitive--
		//TODO: exceptions
		//TODO: lists
		return d;
	}
	
	public static JavaField inspectField(Field f) {
		JavaField s = new JavaField();
		s.setName(f.getName());
		s.setArray(f.getType().isArray());
		
		if(s.isArray()) {
			if(isFieldPrimitive(f.getType().getComponentType().getCanonicalName())) {
				s.setPrimitive(true);
				s.setType(AtlasModelFactory.fieldTypeForPrimitiveClassName(f.getType().getComponentType().getCanonicalName()));
			} else if(isFieldBoxedPrimitive(f.getType().getComponentType().getCanonicalName())) {
				s.setPrimitive(false);
				s.setType(AtlasModelFactory.fieldTypeForPrimitiveClassName(f.getType().getComponentType().getCanonicalName()));
			} else {
					s.setPrimitive(false);
					s.setType(FieldType.COMPLEX);
				}
			s.setClassName(f.getType().getComponentType().getCanonicalName());
		} else {
			if(isFieldPrimitive(f.getType().getCanonicalName())) {
				s.setPrimitive(true);
				s.setType(AtlasModelFactory.fieldTypeForPrimitiveClassName(f.getType().getCanonicalName()));
			} else if(isFieldBoxedPrimitive(f.getType().getCanonicalName())) {
				s.setPrimitive(true);
				s.setType(AtlasModelFactory.fieldTypeForPrimitiveClassName(f.getType().getCanonicalName()));
			} else {
				s.setPrimitive(false);
				s.setType(FieldType.COMPLEX);
			}
			s.setClassName(f.getType().getCanonicalName());
		}
					
		s.setSynthetic(f.isSynthetic());
		Annotation[] annotations = f.getAnnotations();
		if (annotations != null) {
			for (Annotation a : annotations) {
				s.getAnnotations().getString().add(a.annotationType().getCanonicalName());
			}
		}
		
		//detect getters and setters
		try {
			String getterName = "get" + StringUtil.capitalizeFirstLetter(f.getName());			
			f.getDeclaringClass().getMethod(getterName);
			s.setGetMethod(getterName);
		} catch (NoSuchMethodException e) { }
		if (s.getGetMethod() == null && ("boolean".equals(s.getClassName()) || "java.lang.Boolean".equals(s.getClassName()))) {
			try {
				String getterName = "is" + StringUtil.capitalizeFirstLetter(f.getName());			
				f.getDeclaringClass().getMethod(getterName);
				s.setGetMethod(getterName);
			} catch (NoSuchMethodException e) { }
		}		
		try {
			String setterName = "set" + StringUtil.capitalizeFirstLetter(f.getName());
			f.getDeclaringClass().getMethod(setterName, f.getType());
			s.setSetMethod(setterName);
		} catch (NoSuchMethodException e) { }
		return s;
	}
	
	// TODO: Replace this with .getComponent() mode for dealing w/ arrays in reflection
	public static boolean isFieldPrimitive(String fieldType) {
		fieldType = (fieldType != null && fieldType.endsWith("[]")) ? fieldType.substring(0, fieldType.indexOf('[')) : fieldType;
		return primitiveClasses.contains(fieldType); 
	}
	
	public static boolean isFieldBoxedPrimitive(String fieldType) {
		fieldType = (fieldType != null && fieldType.endsWith("[]")) ? fieldType.substring(0, fieldType.indexOf('[')) : fieldType;
		return boxedPrimitiveClasses.contains(fieldType); 
	}
}
