# API Architecture

This API uses a Service + DTO pattern to handle data transfer between the API and web application. The architecture leverages Prisma's type system and features while maintaining a clean separation between business logic and data access.

## Architecture Layers

A round trip initiated by the client looks something like this:

```
Client -> API Layer -> Business Logic Layer -> Database
```

... then back the other way.

### API Layer

The **API Layer** (implemented in `app.ts` and `routes`) handles API requests and responses. It sits above the business logic layer and handles:

- Network request and response handling
- Delegating to API routes and endpoints
- Request validation and response formatting

_Data Transfer Objects (DTOs)_

DTOs are defined in the `shared` module and serve as the contract between the frontend and backend. They:
- Define the API interface
- Control data serialization
- Provide type safety
- Decouple the API from the database schema

### Business Logic Layer (BLL)

The **Business Logic Layer (BLL)** (implemented in `services`) contains business logic and orchestrates operations. It sits above the database and handles:

- Business rules and workflows
- Data processing and validation
- Coordination between different entities
- Direct database access through Prisma
- Data transformation between Prisma models and DTOs

_Data Access Layer (DAL)_

Rather than having a separated DAL in this application, we make use of Prisma's ORM features to handle data access and manipulation. The service layer has direct access to the Prisma client.