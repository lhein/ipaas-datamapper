package com.mediadriver.atlas.java.service.v2;

import javax.ws.rs.ext.ContextResolver;
import javax.ws.rs.ext.Provider;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

@Provider
public class AtlasJsonProvider implements ContextResolver<ObjectMapper> {

	private ObjectMapper objectMapper;

	public AtlasJsonProvider() {		
		objectMapper = new ObjectMapper();
		objectMapper.configure(SerializationFeature.WRAP_ROOT_VALUE, true);
		objectMapper.configure(DeserializationFeature.UNWRAP_ROOT_VALUE, true);
		objectMapper.setSerializationInclusion(Include.NON_NULL);		
	}

	public ObjectMapper getContext(Class<?> objectType) {
		return objectMapper;
	}

}