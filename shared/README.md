# Shared Module

## Purpose

The `shared` directory serves as a central location for code that is used across multiple parts of the application. This follows the principle of DRY (Don't Repeat Yourself) and helps maintain consistency throughout the codebase.

## Modeling the Domain

The `models` directory contains entities that represent the core business entities and their relationships.

**Entities** are data structures that define the shape and behavior of business entities, including their properties, relationships, and validation rules. They may be classes or interfaces.

These entities, together, model the **domain** of the application.

## Data Transfer Objects (DTOs)

The entities in the `models` directory are used to create DTOs. These DTOs are simply "containers" for data, and are what get sent between the pieces of the application. They contain no business logic (functionality related to the data that they contain).

## Architectural Benefits

Keeping the shared code in a separate module has the following benefits:

- **Single Source of Truth**: By centralizing shared code, we ensure consistency across the application
- **Reduced Duplication**: Common types, interfaces, and utilities are defined once and reused
- **Clear Boundaries**: Helps establish clear boundaries between different parts of the application
- **Maintainability**: Changes to shared code are made in one place, reducing the risk of inconsistencies
