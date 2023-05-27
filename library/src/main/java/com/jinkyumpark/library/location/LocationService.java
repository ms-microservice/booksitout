package com.jinkyumpark.library.location;

import org.springframework.stereotype.Service;

@Service
public class LocationService {

    private static final double EARTH_RADIUS_IN_KM = 6_371.0;
    private static final double EARTH_RADIUS_IN_M = EARTH_RADIUS_IN_KM * 1000;

    private static final double LATITUDE_DEGREE_PER_METER = 1.0 / (2 * Math.PI * EARTH_RADIUS_IN_M / 360);

    public double[] getLatitudeRange(double latitude, int radiusInMeters) {
        double degreeRange = radiusInMeters * LATITUDE_DEGREE_PER_METER;

        double minLatitude = latitude - degreeRange;
        double maxLatitude = latitude + degreeRange;

        return new double[]{minLatitude, maxLatitude};
    }

    public double[] getLongitudeRange(double latitude, double longitude, int radiusInMeters) {
        double longitudeDegreePerMeter = 360 / (2 * Math.PI * EARTH_RADIUS_IN_M * Math.cos(Math.toRadians(latitude)));
        double degreeRange =  longitudeDegreePerMeter * radiusInMeters;

        double minLongitude = longitude - degreeRange;
        double maxLongitude = longitude + degreeRange;

        return new double[]{minLongitude, maxLongitude};
    }

    public static double distanceBetweenLatitudeAndLongitude(double latitude1, double longitude1, double latitude2, double longitude2) {
        double latitude1Radian = Math.toRadians(latitude1);
        double latitude2Radian = Math.toRadians(latitude2);
        double deltaLatitude = Math.toRadians(latitude2 - latitude1);
        double deltaLongitude = Math.toRadians(longitude2 - longitude1);

        double a = Math.sin(deltaLatitude / 2) * Math.sin(deltaLatitude / 2) +
                Math.cos(latitude1Radian) * Math.cos(latitude2Radian) *
                        Math.sin(deltaLongitude / 2) * Math.sin(deltaLongitude / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return EARTH_RADIUS_IN_KM * c;
    }

}
