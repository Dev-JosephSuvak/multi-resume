package com.resumeapp.model;

import com.google.cloud.Timestamp;
import com.google.cloud.firestore.annotation.DocumentId;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ServiceRequest {
    @DocumentId
    private String id;
    
    private String name;
    private String email;
    private String company;
    private String serviceType;
    private String message;
    private Timestamp createdAt;
}
