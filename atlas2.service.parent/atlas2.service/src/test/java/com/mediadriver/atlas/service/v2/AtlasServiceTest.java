package com.mediadriver.atlas.service.v2;

import static org.junit.Assert.assertTrue;

import java.io.File;
import java.net.URI;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mediadriver.atlas.v2.AtlasMapping;
import com.mediadriver.atlas.v2.MockField;
import com.mediadriver.atlas.v2.StringMap;
import com.mediadriver.atlas.v2.StringMapEntry;



public class AtlasServiceTest {
	
	private AtlasService service = null;
	
	@Before
	public void setUp() throws Exception {
		service = new AtlasService();
	}

	@After
	public void tearDown() throws Exception {
	}

	@Test
	public void testListMappings() throws Exception {
		Response resp = service.listMappings(generateTestUriInfo("http://localhost:8686/v2/atlas", "http://localhost:8686/v2/atlas/mappings"), null);
		StringMap sMap = (StringMap)resp.getEntity();
		System.out.println("Found " + sMap.getStringMapEntry().size() + " objects");
		for(StringMapEntry s : sMap.getStringMapEntry()) {
			System.out.println("\t n: " + s.getName() + " v: " + s.getValue());
		}
	}
	
	@Test
	public void testGetMapping() throws Exception {
		Response resp = service.getMapping("junit3");
		AtlasMapping mapping = (AtlasMapping)resp.getEntity();		
	}

	@Test
	public void testFilenameMatch() throws Exception {
		String fileName = "atlasmapping-foo.xml";
		
		assertTrue(fileName.matches("atlasmapping-[a-zA-Z0-9]+.xml"));
	}
	
	@Test
	public void testAtlasMappingDeserialization() throws Exception {
		ObjectMapper mapper = new ObjectMapper();
		File f = new File("src/test/resources/atlasmapping-mockfield-PUT-create-sample.json");
		AtlasMapping mapping = mapper.readValue(f, AtlasMapping.class);
	}
	
	@Test
	public void testSimpleFieldDeserialization() throws Exception {
		ObjectMapper mapper = new ObjectMapper();	
		File f = new File("src/test/resources/atlasMapping-MockField-simple.json");		
		MockField field = mapper.readValue(f, MockField.class);
	}
	
	protected UriInfo generateTestUriInfo(String baseUri, String absoluteUri) throws Exception {
		return new TestUriInfo(new URI(baseUri), new URI(absoluteUri));
	}
	
}
