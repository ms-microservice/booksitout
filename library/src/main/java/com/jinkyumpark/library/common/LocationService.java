package com.jinkyumpark.library.common;

import org.springframework.stereotype.Service;

@Service
public class LocationService {

    private final double EARTH_RADIUS_IN_METER = 6_371_000;

    public double[] getLatitudeRange(double latitude, int radiusInMeter) {
        double latitudeInRadian = Math.toRadians(latitude);
        double deltaLatitude = radiusInMeter / EARTH_RADIUS_IN_METER;

        double minLatitude = Math.toDegrees(latitudeInRadian - deltaLatitude);
        double maxLatitude = Math.toDegrees(latitudeInRadian + deltaLatitude);

        return new double[]{minLatitude, maxLatitude};
    }

    public double[] getLongitudeRange(double latitude, double longitude, int radiusInMeter) {
        double latitudeInRadian = Math.toRadians(latitude);
        double deltaLongitude = radiusInMeter / (EARTH_RADIUS_IN_METER * Math.cos(latitudeInRadian));

        double minLongitude = Math.toDegrees(Math.toRadians(longitude) - deltaLongitude);
        double maxLongitude = Math.toDegrees(Math.toRadians(longitude) + deltaLongitude);

        return new double[]{minLongitude, maxLongitude};
    }

}
