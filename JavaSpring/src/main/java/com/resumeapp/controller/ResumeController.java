package com.resumeapp.controller;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.resumeapp.model.PersonalInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/resume")
@CrossOrigin(origins = "*")
public class ResumeController {

    @Autowired
    private Firestore firestore;

    @GetMapping
    public Map<String, Object> getResume() throws ExecutionException, InterruptedException {
        ApiFuture<DocumentSnapshot> future = firestore.collection("resume").document("data").get();
        DocumentSnapshot document = future.get();
        
        if (document.exists()) {
            return document.getData();
        }
        throw new RuntimeException("Resume data not found");
    }

    @GetMapping("/personal")
    public PersonalInfo getPersonalInfo() throws ExecutionException, InterruptedException {
        ApiFuture<DocumentSnapshot> future = firestore.collection("resume").document("data").get();
        DocumentSnapshot document = future.get();
        
        if (document.exists()) {
            Map<String, Object> data = document.getData();
            return document.toObject(PersonalInfo.class);
        }
        throw new RuntimeException("Personal info not found");
    }

    @GetMapping("/skills")
    public List<Map<String, Object>> getSkills() throws ExecutionException, InterruptedException {
        ApiFuture<DocumentSnapshot> future = firestore.collection("resume").document("data").get();
        DocumentSnapshot document = future.get();
        
        if (document.exists()) {
            Map<String, Object> data = document.getData();
            return (List<Map<String, Object>>) data.get("skills");
        }
        throw new RuntimeException("Skills not found");
    }

    @GetMapping("/experience")
    public List<Map<String, Object>> getExperience() throws ExecutionException, InterruptedException {
        ApiFuture<DocumentSnapshot> future = firestore.collection("resume").document("data").get();
        DocumentSnapshot document = future.get();
        
        if (document.exists()) {
            Map<String, Object> data = document.getData();
            return (List<Map<String, Object>>) data.get("experience");
        }
        throw new RuntimeException("Experience not found");
    }

    @GetMapping("/education")
    public List<Map<String, Object>> getEducation() throws ExecutionException, InterruptedException {
        ApiFuture<DocumentSnapshot> future = firestore.collection("resume").document("data").get();
        DocumentSnapshot document = future.get();
        
        if (document.exists()) {
            Map<String, Object> data = document.getData();
            return (List<Map<String, Object>>) data.get("education");
        }
        throw new RuntimeException("Education not found");
    }

    @GetMapping("/projects")
    public List<Map<String, Object>> getProjects() throws ExecutionException, InterruptedException {
        ApiFuture<DocumentSnapshot> future = firestore.collection("resume").document("data").get();
        DocumentSnapshot document = future.get();
        
        if (document.exists()) {
            Map<String, Object> data = document.getData();
            return (List<Map<String, Object>>) data.get("projects");
        }
        throw new RuntimeException("Projects not found");
    }
}
