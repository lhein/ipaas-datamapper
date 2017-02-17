package com.mediadriver.atlas.service.v2;


import java.net.URI;
import java.util.List;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.PathSegment;
import javax.ws.rs.core.UriBuilder;
import javax.ws.rs.core.UriInfo;

public class TestUriInfo implements UriInfo {

	protected MultivaluedMap<String, String> pathParamMap;
	protected MultivaluedMap<String, String> queryParamMap;
	protected URI baseUri;
	protected URI absoluteUri;

	
	public TestUriInfo(URI baseUri, URI absoluteUri) {
		this.baseUri = baseUri;
		this.absoluteUri = absoluteUri;
	}

	@Override
	public URI getAbsolutePath() {
		return null;
	}

	@Override
	public UriBuilder getAbsolutePathBuilder() {
		return UriBuilder.fromUri(absoluteUri);
	}

	@Override
	public URI getBaseUri() {
		return this.baseUri;
	}

	@Override
	public UriBuilder getBaseUriBuilder() {
		return UriBuilder.fromUri(baseUri);
	}

	@Override
	public List<Object> getMatchedResources() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<String> getMatchedURIs() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<String> getMatchedURIs(boolean arg0) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getPath() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getPath(boolean arg0) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public MultivaluedMap<String, String> getPathParameters() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public MultivaluedMap<String, String> getPathParameters(boolean arg0) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<PathSegment> getPathSegments() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<PathSegment> getPathSegments(boolean arg0) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public MultivaluedMap<String, String> getQueryParameters() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public MultivaluedMap<String, String> getQueryParameters(boolean arg0) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public URI getRequestUri() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public UriBuilder getRequestUriBuilder() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public URI relativize(URI arg0) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public URI resolve(URI arg0) {
		// TODO Auto-generated method stub
		return null;
	}
}
