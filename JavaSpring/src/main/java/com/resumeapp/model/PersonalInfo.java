package com.resumeapp.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PersonalInfo {
    private String name;
    private String title;
    private String email;
    private String phone;
    private String location;
    
    @JsonProperty("linkedIn")
    private String linkedIn;
    
    @JsonProperty("gitHub")
    private String gitHub;
    
    private String calendly;
}
