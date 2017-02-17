package com.mediadriver.atlas.java.inspect.v2;

import org.junit.Test;
import com.mediadriver.atlas.java.test.v2.FlatPrimitiveClass;

public class FlatClassInspectTest {

	@Test
	public void testFlatPrimivitiveClass() throws Exception {
		ClassInspectionUtil.validateFlatPrimitiveClass(FlatPrimitiveClass.class);
	}
}
