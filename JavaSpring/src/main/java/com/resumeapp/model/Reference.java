package com.resumeapp.model;

import com.google.cloud.Timestamp;
import com.google.cloud.firestore.annotation.DocumentId;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Reference {
    @DocumentId
    private String id;
    
    private String name;
    private String email;
    private String relationship;
    private String company;
    private String message;
    private int rating;
    private boolean approved;
    private Timestamp createdAt;
}
