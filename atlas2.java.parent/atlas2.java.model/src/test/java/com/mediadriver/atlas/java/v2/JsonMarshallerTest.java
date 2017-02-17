package com.mediadriver.atlas.java.v2;

import static org.junit.Assert.*;

import java.io.File;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.mediadriver.atlas.v2.AtlasMapping;

public class JsonMarshallerTest extends BaseMarshallerTest {

	public ObjectMapper mapper = null;
	
	@Before
	public void setUp() throws Exception {
		super.setUp();
		
		this.deleteTestFolders = false;
		
		mapper = new ObjectMapper();
		mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, true);
		mapper.configure(DeserializationFeature.UNWRAP_ROOT_VALUE, true);
		mapper.setSerializationInclusion(Include.NON_NULL);		
	}
	
	@After
	public void tearDown() throws Exception {
		super.tearDown();
		
		mapper = null;
	}
	
	@Test
	public void testJsonJavaField() throws Exception {	
		AtlasMapping atlasMapping = generateAtlasMapping();
		//Object to JSON in file
		mapper.writeValue(new File("target" + File.separator + "junit" + File.separator + testName.getMethodName() + File.separator + "atlasmapping.json"), atlasMapping);
		AtlasMapping uMapping = mapper.readValue(new File("target" + File.separator + "junit" + File.separator + testName.getMethodName() + File.separator + "atlasmapping.json"), AtlasMapping.class);
		assertNotNull(uMapping);
		validateAtlasMapping(uMapping);
	}

}
