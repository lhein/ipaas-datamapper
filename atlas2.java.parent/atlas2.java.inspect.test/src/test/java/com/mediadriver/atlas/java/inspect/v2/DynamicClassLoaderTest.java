package com.mediadriver.atlas.java.inspect.v2;

import static org.junit.Assert.*;
import java.io.FileInputStream;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.jar.JarEntry;
import java.util.jar.JarInputStream;

import org.junit.Test;
import org.xeustechnologies.jcl.JarClassLoader;

public class DynamicClassLoaderTest {

	@Test
	public void testListClassesInJarFile() throws Exception {
		List<String> classes = new ArrayList<String>();
		String folderName = "target/reference-jars";
		
		try (DirectoryStream<Path> stream = Files.newDirectoryStream(Paths.get(folderName))) {				
			for (Path entry: stream) {
				if(!entry.toFile().isFile()) {
					continue;
				}
				JarInputStream jarFile = new JarInputStream(new FileInputStream(entry.toFile()));
				JarEntry jarEntry;
				while (true) {
					jarEntry = jarFile.getNextJarEntry();
					if (jarEntry == null) {
						break;
					}
					if (jarEntry.getName().endsWith(".class")) {
						String className = jarEntry.getName().replaceAll("/", "\\.");
						classes.add(className);
						System.out.println("ClassName: " + className);
					} else {
						System.out.println("Not a class: " + jarEntry.getName());
					}
				}
				if(jarFile != null) {
					jarFile.close();
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@Test
	public void testLoadInspectUnloadJar() throws Exception {
		
		Class<?> flatClazz = null;
		
		try {
			flatClazz = this.getClass().getClassLoader().loadClass("com.mediadriver.atlas.java.test.v2.FlatPrimitiveClass");
        	fail("ClassNotFoundException expected");
		} catch (ClassNotFoundException e) {
			// Expected
		}
		
		JarClassLoader jc = new JarClassLoader( new String[] { "target/reference-jars" } );
        try {
        	flatClazz = jc.loadClass("com.mediadriver.atlas.java.test.v2.FlatPrimitiveClass");
        	assertNotNull(flatClazz);
        	assertEquals("com.mediadriver.atlas.java.test.v2.FlatPrimitiveClass", flatClazz.getName());
        	Object newFlatClazz = flatClazz.newInstance();
        	assertNotNull(newFlatClazz);
        } catch(ClassNotFoundException e) {
        	fail("Expected class to load");
        }
        
        jc.unloadClass("com.mediadriver.atlas.java.test.v2.FlatPrimitiveClass");
        jc = null;
        
		try {
			flatClazz = this.getClass().getClassLoader().loadClass("com.mediadriver.atlas.java.test.v2.FlatPrimitiveClass");
        	fail("ClassNotFoundException expected");
		} catch (ClassNotFoundException e) {
			// Expected
		}
	}

}
