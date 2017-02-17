package com.mediadriver.atlas.java.v2;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

import java.io.IOException;
import java.nio.file.FileVisitResult;
import java.nio.file.SimpleFileVisitor;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.attribute.BasicFileAttributes;

import org.junit.After;
import org.junit.Before;
import org.junit.Rule;
import org.junit.rules.TestName;

import com.mediadriver.atlas.v2.AtlasMapping;
import com.mediadriver.atlas.v2.Field;
import com.mediadriver.atlas.v2.FieldMapping;
import com.mediadriver.atlas.v2.FieldMappings;
import com.mediadriver.atlas.v2.MappedField;

public abstract class BaseMarshallerTest {

	public boolean deleteTestFolders = true;

	@Rule
	public TestName testName = new TestName();

	@Before
	public void setUp() throws Exception {
		Files.createDirectories(Paths.get("target/junit/" + testName.getMethodName()));
	}

	@After
	public void tearDown() throws Exception {
		if (deleteTestFolders) {
			Path directory = Paths.get("target/junit/" + testName.getMethodName());
			Files.walkFileTree(directory, new SimpleFileVisitor<Path>() {
				@Override
				public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException {
					Files.delete(file);
					return FileVisitResult.CONTINUE;
				}

				@Override
				public FileVisitResult visitFileFailed(Path file, IOException exc) throws IOException {
					Files.delete(file);
					return FileVisitResult.CONTINUE;
				}

				@Override
				public FileVisitResult postVisitDirectory(Path dir, IOException exc) throws IOException {
					if (exc == null) {
						Files.delete(dir);
						return FileVisitResult.CONTINUE;
					} else {
						throw exc;
					}
				}
			});
		}
	}

	protected AtlasMapping generateAtlasMapping() {
		AtlasMapping mapping = new AtlasMapping();
		mapping.setName("junit");
		mapping.setFieldMappings(new FieldMappings());

		MappedField inputField = new MappedField();
		JavaField inputJavaField = new JavaField();
		inputJavaField.setName("foo");
		inputJavaField.setValue("bar");
		inputField.setField(inputJavaField);

		MappedField outputField = new MappedField();
		JavaField outputJavaField = new JavaField();
		outputJavaField.setName("woot");
		outputJavaField.setValue("blerg");
		outputField.setField(outputJavaField);

		FieldMapping fm = new FieldMapping();
		fm.setInputField(inputField);
		fm.setOutputField(outputField);

		mapping.getFieldMappings().getFieldMapping().add(fm);
		return mapping;
	}

	protected void validateAtlasMapping(AtlasMapping mapping) {
		assertNotNull(mapping);
		assertNotNull(mapping.getName());
		assertEquals("junit", mapping.getName());
		assertNotNull(mapping.getFieldMappings());
		assertEquals(new Integer(1), new Integer(mapping.getFieldMappings().getFieldMapping().size()));
		assertNull(mapping.getProperties());

		FieldMapping fm = mapping.getFieldMappings().getFieldMapping().get(0);
		assertNotNull(fm);
		assertNull(fm.getAlias());
		assertNull(fm.getMultipleInputField());
		assertNull(fm.getMultipleOutputField());

		MappedField m1 = fm.getInputField();
		assertNotNull(m1);
		assertNotNull(m1.getFieldActions());
		assertTrue(m1.getFieldActions().isEmpty());
		assertNotNull(m1.getField());
		Field f1 = m1.getField();		
		assertTrue(f1 instanceof JavaField);
		assertEquals("foo", ((JavaField) f1).getName());
		assertEquals("bar", ((JavaField) f1).getValue());
		assertNull(((JavaField) f1).getType());

		MappedField m2 = fm.getOutputField();
		assertNotNull(m2);
		assertNotNull(m2.getFieldActions());
		assertTrue(m2.getFieldActions().isEmpty());
		assertNotNull(m2.getField());
		Field f2 = m2.getField();		
		assertTrue(f2 instanceof JavaField);
		assertEquals("woot", ((JavaField) f2).getName());
		assertEquals("blerg", ((JavaField) f2).getValue());
		assertNull(((JavaField) f2).getType());
		
	}
}
