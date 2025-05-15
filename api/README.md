# API Architecture

This API uses the Data Transfer Object (DTO) + Service/Repository pattern to transfer data between the API and web application.

Recall that the DTOs are defined in the `shared` module, and contain no business logic. They are simply "containers" for data.

## Architecture Layers

_Overview:_

A round trip initiated by the client looks something like this:

```
Client -> API Layer -> Business Logic Layer -> Data Access Layer -> Database
```

... then back the other way.

_Layers:_

- The **API Layer** (implemented in `app.ts` and `routes`) is the layer that handles the API requests and responses. It sits above the business logic layer and handles:

  - Network request and response handling
  - Delegating to API routes and endpoints

- The **Business Logic Layer (BLL)** (implemented in `services`) contains business logic and orchestrates operations. It sits above the data access layer and handles:

  - Business rules and workflows
  - Data processing and validation
  - Coordination between repositories

- The **Data Access Layer (DAL)** (implemented in `repositories`) manages database interactions. It sits above the database and handles:

  - Database operations (CRUD)
  - Data persistence
  - Database connections

## Benefits

- Clear separation of concerns
- Easy to test and maintain
- Business logic is isolated from data access
- Flexible and scalable architecture
