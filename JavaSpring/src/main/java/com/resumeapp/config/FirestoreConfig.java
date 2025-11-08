package com.resumeapp.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.FirestoreOptions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

@Configuration
public class FirestoreConfig {

    @Bean
    public Firestore firestore() throws IOException {
        String projectId = "joseph-suvak-resume";
        String credentialPath = System.getenv().getOrDefault("GOOGLE_APPLICATION_CREDENTIALS", "serviceAccountKey.json");
        
        GoogleCredentials credentials;
        
        File credFile = new File(credentialPath);
        if (credFile.exists()) {
            credentials = GoogleCredentials.fromStream(new FileInputStream(credentialPath));
        } else {
            System.err.println("Warning: serviceAccountKey.json not found at " + credentialPath + ", using application default credentials");
            credentials = GoogleCredentials.getApplicationDefault();
        }
        
        FirestoreOptions options = FirestoreOptions.newBuilder()
                .setProjectId(projectId)
                .setCredentials(credentials)
                .build();
        
        return options.getService();
    }
}
