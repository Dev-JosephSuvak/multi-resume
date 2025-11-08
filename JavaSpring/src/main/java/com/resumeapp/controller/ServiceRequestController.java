package com.resumeapp.controller;

import com.google.api.core.ApiFuture;
import com.google.cloud.Timestamp;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.resumeapp.model.ServiceRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/service-requests")
@CrossOrigin(origins = "*")
public class ServiceRequestController {

    @Autowired
    private Firestore firestore;

    @PostMapping
    public ResponseEntity<Map<String, String>> submitServiceRequest(@RequestBody ServiceRequest request) 
            throws ExecutionException, InterruptedException {
        request.setCreatedAt(Timestamp.now());
        
        ApiFuture<DocumentReference> future = firestore.collection("serviceRequests").add(request);
        DocumentReference docRef = future.get();
        
        Map<String, String> response = new HashMap<>();
        response.put("id", docRef.getId());
        response.put("message", "Service request submitted successfully");
        
        return ResponseEntity.ok(response);
    }
}
