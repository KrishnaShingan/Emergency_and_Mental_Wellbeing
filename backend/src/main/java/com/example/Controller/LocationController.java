package com.example.Controller;

import com.example.Model.Location;
import com.example.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/location")
public class LocationController {

    @Autowired
    private LocationService locationService;

    @PostMapping("/save")
    public String saveLocation(@RequestBody Location location) {
        locationService.saveLocation(location);
        return "Location saved successfully!";
    }
}
