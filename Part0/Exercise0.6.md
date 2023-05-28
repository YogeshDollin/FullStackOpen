```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: On Form submission data is added in request body
    browser ->> server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server ->> browser: JSON
    deactivate server
```