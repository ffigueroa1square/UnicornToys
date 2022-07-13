# UnicornToys
This is a solution based on a Single Page App (SPA) with Angular and ASP.NET Core following the principles of Clean Architecture.

## Technologies

* [ASP.NET Core 6](https://docs.microsoft.com/en-us/aspnet/core/introduction-to-aspnet-core?view=aspnetcore-6.0)
* [Entity Framework Core 6](https://docs.microsoft.com/en-us/ef/core/)
* [Angular 13](https://angular.io/)
* [CQRS pattern](https://docs.microsoft.com/en-us/azure/architecture/patterns/cqrs) with [MediatR](https://github.com/jbogard/MediatR)
* [AutoMapper](https://automapper.org/)
* [FluentValidation](https://fluentvalidation.net/)
* [NUnit](https://nunit.org/), [FluentAssertions](https://fluentassertions.com/), [Moq](https://github.com/moq) & [Respawn](https://github.com/jbogard/Respawn)

## Getting Started

1. Install the latest [.NET 6 SDK](https://dotnet.microsoft.com/download/dotnet/6.0)
2. Install the latest [Node.js LTS](https://nodejs.org/en/)
3. Clone project.

## Database Configuration

This project is configured with Entity Framework First Code approach. It is required to have some version of SQL community, developer o enterprise installed.

Verify that the **AppConnection** connection string within **appsettings.json** points to a valid SQL Server instance. 

When you run the application the database will be automatically created (if necessary) and the latest migrations will be applied.

## Database Migrations

If you want to add addtional models to the project, run these commands using the Package Manager Console.

1. To add new migrations, open a Command Prompt on the UnicornToys.Persistence project directory and run:
* `dotnet ef migrations add InitialCreate --context MyAppDbContext --startup-project ../UnicornToys.Api --output-dir Contexts/Migrations`

2. To apply migrations
* `dotnet ef database update --context MyAppDbContext --startup-project ../UnicornToys.Api`

