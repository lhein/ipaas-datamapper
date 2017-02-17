package com.mediadriver.atlas.java.inspect.v2;

public class StringUtil {

	public static boolean isEmpty(String s) {
		return s == null || "".equals(s.trim());
	}
	
	public static String capitalizeFirstLetter(String sentence) {
		if (StringUtil.isEmpty(sentence)) {
			return sentence;
		}
		if (sentence.length() == 1) {
			return String.valueOf(sentence.charAt(0)).toUpperCase();
		}
		return String.valueOf(sentence.charAt(0)).toUpperCase() + sentence.substring(1);
	}
}
