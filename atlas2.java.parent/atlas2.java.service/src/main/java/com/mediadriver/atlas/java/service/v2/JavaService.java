package com.mediadriver.atlas.java.service.v2;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.GET;
import javax.ws.rs.OPTIONS;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Application;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.glassfish.jersey.jackson.JacksonFeature;
import org.glassfish.jersey.server.ResourceConfig;

import com.mediadriver.atlas.java.inspect.v2.ClassInspector;
import com.mediadriver.atlas.java.v2.JavaClass;

// http://localhost:8585/v2/atlas/java/class?className=java.lang.String

@ApplicationPath("/")
@Path("v2/atlas/java")
public class JavaService extends Application {		
	
	final Application javaServiceApp;
	
	public JavaService() {
		javaServiceApp = new ResourceConfig()
		        .register(JacksonFeature.class);
	}
	
	//example request: http://localhost:8181/rest/myresource?from=jason%20baker
    @GET
    @Path("/simple")
    @Produces(MediaType.TEXT_PLAIN)
    public String simpleHelloWorld(@QueryParam("from") String from) {
        return "Got it! " + from;
    }
    
    @OPTIONS
    @Path("/class")
    @Produces(MediaType.APPLICATION_JSON)
    public Response testJsonOptions() throws Exception {
    	return Response.ok()
    			.header("Access-Control-Allow-Origin", "*")
    			.header("Access-Control-Allow-Headers", "Content-Type")
    			.header("Access-Control-Allow-Methods", "GET,PUT,POST,PATCH,DELETE")
    			.build();
    }
    
    //example from: https://www.mkyong.com/webservices/jax-rs/json-example-with-jersey-jackson/
    @GET
    @Path("/class")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getClass(@QueryParam("className") String className) throws Exception {
    	JavaClass c = ClassInspector.inspectClass(className);
    	return Response.ok()
    			.header("Access-Control-Allow-Origin", "*")
    			.header("Access-Control-Allow-Headers", "Content-Type")
    			.header("Access-Control-Allow-Methods", "GET,PUT,POST,PATCH,DELETE")
    			.entity(c)
    			.build();
    }
}