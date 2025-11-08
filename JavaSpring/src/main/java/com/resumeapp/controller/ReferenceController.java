package com.resumeapp.controller;

import com.google.api.core.ApiFuture;
import com.google.cloud.Timestamp;
import com.google.cloud.firestore.*;
import com.resumeapp.model.Reference;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/references")
@CrossOrigin(origins = "*")
public class ReferenceController {

    @Autowired
    private Firestore firestore;

    @GetMapping("/approved")
    public List<Reference> getApprovedReferences() throws ExecutionException, InterruptedException {
        ApiFuture<QuerySnapshot> future = firestore.collection("references")
                .whereEqualTo("approved", true)
                .get();

        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        List<Reference> references = documents.stream()
                .map(doc -> doc.toObject(Reference.class))
                .collect(Collectors.toList());

        references.sort((a, b) -> {
            int priorityA = getRelationshipPriority(a.getRelationship());
            int priorityB = getRelationshipPriority(b.getRelationship());

            if (priorityA != priorityB) {
                return Integer.compare(priorityA, priorityB);
            }

            return b.getCreatedAt().compareTo(a.getCreatedAt());
        });

        return references;
    }

    @GetMapping
    public List<Reference> getAllReferences() throws ExecutionException, InterruptedException {
        ApiFuture<QuerySnapshot> future = firestore.collection("references").get();

        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        return documents.stream()
                .map(doc -> doc.toObject(Reference.class))
                .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
                .collect(Collectors.toList());
    }

    @PostMapping
    public ResponseEntity<Map<String, String>> submitReference(@RequestBody Reference reference)
            throws ExecutionException, InterruptedException {
        reference.setApproved(false);
        reference.setCreatedAt(Timestamp.now());

        ApiFuture<DocumentReference> future = firestore.collection("references").add(reference);
        DocumentReference docRef = future.get();

        Map<String, String> response = new HashMap<>();
        response.put("id", docRef.getId());
        response.put("message", "Reference submitted successfully");

        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{id}/approve")
    public ResponseEntity<Map<String, String>> approveReference(@PathVariable String id)
            throws ExecutionException, InterruptedException {
        DocumentReference docRef = firestore.collection("references").document(id);

        Map<String, Object> updates = new HashMap<>();
        updates.put("approved", true);

        ApiFuture<WriteResult> future = docRef.update(updates);
        future.get();

        Map<String, String> response = new HashMap<>();
        response.put("message", "Reference approved successfully");

        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{id}/reject")
    public ResponseEntity<Map<String, String>> rejectReference(@PathVariable String id)
            throws ExecutionException, InterruptedException {
        DocumentReference docRef = firestore.collection("references").document(id);

        Map<String, Object> updates = new HashMap<>();
        updates.put("approved", false);

        ApiFuture<WriteResult> future = docRef.update(updates);
        future.get();

        Map<String, String> response = new HashMap<>();
        response.put("message", "Reference rejected successfully");

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteReference(@PathVariable String id)
            throws ExecutionException, InterruptedException {
        ApiFuture<WriteResult> future = firestore.collection("references").document(id).delete();
        future.get();

        Map<String, String> response = new HashMap<>();
        response.put("message", "Reference deleted successfully");

        return ResponseEntity.ok(response);
    }

    private int getRelationshipPriority(String relationship) {
        if (relationship == null)
            return 999;

        switch (relationship.toLowerCase()) {
            case "manager":
                return 1;
            case "direct-report":
                return 2;
            case "colleague":
                return 3;
            case "client":
                return 4;
            case "mentor":
                return 5;
            default:
                return 6;
        }
    }
}
