package com.mediadriver.atlas.java.v2;

import static org.junit.Assert.*;

import java.io.File;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBElement;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import javax.xml.transform.stream.StreamSource;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import com.mediadriver.atlas.v2.AtlasMapping;

public class XmlMarshallerTest extends BaseMarshallerTest {

	private JAXBContext jaxbContext = null;
	private Marshaller marshaller = null;
	private Unmarshaller unmarshaller = null;
	
	@Before
	public void setUp() throws Exception {
		super.setUp();
		
		this.deleteTestFolders = false;
		
		jaxbContext = JAXBContext.newInstance("com.mediadriver.atlas.v2:com.mediadriver.atlas.java.v2");
		
		marshaller = jaxbContext.createMarshaller();
		marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
		unmarshaller = jaxbContext.createUnmarshaller();
	}
	
	@After
	public void tearDown() throws Exception {
		super.tearDown();
		
		marshaller = null;
		unmarshaller = null;
		jaxbContext = null;
	}
	
	@Test
	public void testXmlJavaField() throws Exception {
		
		marshaller.marshal(generateAtlasMapping(), new File("target/junit/" + testName.getMethodName() + "/" + "atlasmapping.xml"));
		StreamSource fileSource = new StreamSource(new File("target/junit/" + testName.getMethodName() + "/" + "atlasmapping.xml"));
		JAXBElement<AtlasMapping> mappingElem = unmarshaller.unmarshal(fileSource, AtlasMapping.class);
		assertNotNull(mappingElem);
		assertNotNull(mappingElem.getValue());
		validateAtlasMapping(mappingElem.getValue());
	}

}
