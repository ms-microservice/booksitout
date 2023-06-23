package com.jinkyumpark.library.common;

public class Utils {

    public static String addSpacesToNumber(String number, int interval) {
        StringBuilder formattedNumber = new StringBuilder();

        int length = number.length();
        for (int i = 0; i < length; i++) {
            if (i % interval == 0) {
                formattedNumber.append(' ');
            }
            formattedNumber.append(number.charAt(i));
        }

        return formattedNumber.toString();
    }

}
