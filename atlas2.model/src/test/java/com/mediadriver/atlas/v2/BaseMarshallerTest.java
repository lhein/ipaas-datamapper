package com.mediadriver.atlas.v2;

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
		MockField inputMockField = new MockField();
		inputMockField.setName("foo");
		inputMockField.setValue("bar");
		inputField.setField(inputMockField);

		MappedField outputField = new MappedField();
		MockField outputMockField = new MockField();
		outputMockField.setName("woot");
		outputMockField.setValue("blerg");
		outputField.setField(outputMockField);

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
		assertTrue(f1 instanceof MockField);
		assertEquals("foo", ((MockField) f1).getName());
		assertEquals("bar", ((MockField) f1).getValue());
		assertNull(((MockField) f1).getType());

		MappedField m2 = fm.getOutputField();
		assertNotNull(m2);
		assertNotNull(m2.getFieldActions());
		assertTrue(m2.getFieldActions().isEmpty());
		assertNotNull(m2.getField());
		Field f2 = m2.getField();		
		assertTrue(f2 instanceof MockField);
		assertEquals("woot", ((MockField) f2).getName());
		assertEquals("blerg", ((MockField) f2).getValue());
		assertNull(((MockField) f2).getType());
		
	}
}
