import admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.cert({
    type: "service_account",
    project_id: "natural-cistern-378520",
    private_key_id: "410c5a2ed99150fe84d79f78d69b9f575027bbda",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDMpvrHfFgNed3G\nbGmvWSZvL9AR1hP8Akd5Y+Cautd5LctCzzQ2x2gaPrX6ymEdae4t5MyzfH37U1pP\n2/7PgxjqjJRjBEifgxmkh083veizFnJhqD/5Q3wp2V8EQ69C4sBgcmH7MDum6i3Q\npUePghf5eil5Phn3DthahpC5PAM7e+eBQh/ddWTDHyMM+3HFYBsykGz8mYw2wLVb\nCZkcLkSbczKzJk8ilMr+K7jWSEVxYlhPBIq/XOiJdYAKHJkNaip3JNZo1DLzpIzo\nAfff+iwJSzRce2Q8CMz7Ju7Q4022eKPzn+eq3qHoo4C1ScyA1UsQ3SwBgK6sWrO5\nZ/6shfClAgMBAAECggEAJLF5vGO8i+oCTA3rIw/qdrwNY+1M1v33n7m7LzL56FXA\nIIHzPDEjprUAvu8jW3k/RcZEt5fGJNZMlo380WsRgBhlkJ1XghYo9ll2aCmqO9X1\n+zGGCuTBMeWyBhs2pNjwIjrP+5Ap2eMaBNNlkcMDFm2DWyQ51pS4UP7YmwW6FKNv\nrItrdwBjszGT9YL+qvNPsRs4TMnyVyPqZTZUvmMAPgmPf31cTnzoMsJaaWCJ9l3Z\n4OJtDhCC/hwU8BNInP0jUQpJ5Z34yUZOuMwF8Kh5xUuzE9V21szStbisHQWnijqE\n3IU37j76u4QwEHHQGjtZsKkDGvCz0cy4layBcOCrAQKBgQD7gVhenwdBspAw47pO\nz9nEm6BMotPz1+50YvRr47fWFMu2P6aoezDOeKwepu3Q9PsL149pAiGF3f8eMLLF\nhzZ6vMdBqz4vEsxq1X/l5hRYmCko6gawlt+bh3uebTUV7sF8Li2cRNUgjHAgJYcJ\n1K8jar4hUdUzTdsIoIdLOCOPgQKBgQDQT0dQ4fjpTq/XBjvknmbamwOSm9gngSlu\nUIInGAdDqR0Ts5YNP7c9HT/19GwmJPqn66BbbfYHCK819RPBXsu/inzjqdyBwRPq\nMCowou28ZaFmOts2o/WJoYVjPb6ngLwAN6YG9SoLK2aupAvoLTZPpfmpW182mcGu\n8dtDR4uzJQKBgCeDEpcK9ODlZLHJlSN8lAHHUU+45QOSEOxH/45ToDYJ3lcreMtP\nT0OgwamvH/2L/0TFAMrGgu29Cq97hxpxO6XcspEmjgZnNaYzFHzRwLCKdyzuV062\n5TpR9qHVFlnzwIH530CFr9YFOjhSrPxmZX1y75vcd1owCRE55wdyMmQBAoGAAJ0L\nJ7jSo9VAfVCeYoj44pHsS8U7uLoPpiyEhZrzgoZ/+Gvh+D4EyyBH7PCAVQhs2IvA\nGCTVwaWL5ovHOB2QWgsNXRpF9PfdmCX2KdiA/LoL5KItvRZ0hag9HVK0OggOBa4k\nRgb4zbmd/suq4U8oxslFV/NV73I6eMpri+ItDiUCgYEAt9oQKZ/XMdf3nI3vQisD\nubXjZyp3mZ48r7d+1NJXBkekp394tbPLBd1m/lyAgNrXUfAW88J7EQEVuZ0K4j19\n/gHuY39y7Bn/Nx/9BHnb+gNeuz/oWzRO/AQjfpiEUk//q4/7gM+4ZbgvWe3/tZPD\nPUJMA7mvcmvcb137dsIBiUE=\n-----END PRIVATE KEY-----\n",
    client_email:
      "firebase-adminsdk-awn53@natural-cistern-378520.iam.gserviceaccount.com",
    client_id: "101993036369574246379",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-awn53%40natural-cistern-378520.iam.gserviceaccount.com",
  }),
});

export default admin;
