# WafiCommerce

Welcome to the WafiCommerce project! This README file will guide you through the essential rules and standards to maintain consistency and quality in our development process.


> [!IMPORTANT]
> Ladybird is in a pre-alpha state, and only suitable for use by developers
>

### CodeGenerator

- **Purpose**: Generates codes for entities with a 'code' column.
- **Method**: `CodeGenerator.Generate(IQueryable<object> Queryable)`

### StreamFileProcessor

- **Purpose**: Retrieves data from an Excel file and maps it to a list of objects of type `T`.
- **Method**: `StreamFileProcessor.GetObjectFromExcelData<T>(IRemoteStreamContent file, string[] expectedHeaders)`
 

## AppSettings

- **AppSettings Modifications**: Do not change the `appsettings.json` file without the supervision of the lead developer.
- **ConnectionStrings Configuration**: The `ConnectionStrings` key must always be configured as follows:
  ```json
  "ConnectionStrings": {
    "Default": "Server=.;Database=WafiCommerce;Trusted_Connection=True;TrustServerCertificate=True"
  }
  ```

## Branch Naming Standard

### Feature Branches
- **Purpose**: When we are developing a complete new feature.
- **Naming Convention**: `feature/{task id}-{first 2 or 3 words of the task description}`
- **Example**: 
  ```
  feature/561531-implement-logo
  ```

### Bug Fix Branches
- **Naming Convention**: `bugfix/{task id}-{first 2 or 3 words of the task description}`
- **Example**: 
  ```
  bugfix/561531-printBtn-in-wrong-position
  ```

### Small Task Branches
- **Purpose**: Used for minor tasks or small enhancements.
- **Naming Convention**: `task/{task id}-{first 2 or 3 words of the task description}`
- **Example**: 
  ```
  task/561531-update-label
  ```

## NuGet Package Management

- **NuGet Package Upload**: Only upload NuGet packages after the PR (Pull Request) has been approved for the `dev` branch.
- **Module Development**: During development, reference modules by DLL or CSProj instead of uploading to NuGet.


## Client-Side Guidelines

### Shared/Common Directory
- **Usage**: Always use the existing methods in the TypeScript (.ts) files located in this directory.
- **Modifications**: Any changes or additions to this directory must be discussed with a team member before implementation.
- Execute this command whenever you create a new API. This will generate the proxies needed for seamless integration.
```bash
abp generate-proxy -t ng
```


## Backend Guidelines
Run the following command in the host directory, when you are first time running the project. Most of the authorization-related pages are built in Razor and they require some NPM packages to run.
```bash
abp install-libs
```

### NuGet Package Management

#### Versioning Scheme
Our NuGet packages follow a specific versioning format: `DotNETVersion.Major.Minor.Patch`.

- **DotNETVersion.Major.Minor.Patch**
  - **DotNETVersion**: Indicates compatibility with a specific .NET version.
    - For example: `8.2.3` means the package is compatible with .NET 8.
  - **Major**: Incremented for breaking changes.
  - **Minor**: Incremented for adding new, backward-compatible functionality.
  - **Patch**: Incremented for backward-compatible bug fixes.

#### Branch Management
- **Separate Branches for Version Changes**:
  - Create a separate branch for each version change ( rel-{version} ).
  - Example branch names: `rel-8.0.15`, `rel-8.1.29`.
- **Merging Changes**:
  - Merge the version-specific branch into the `main` branch[ module repository ] only after the changes have been reviewed and approved in the mainApp[ WafiCommerce-Api ].
  - Ensure the changes are tested and confirmed stable in affecting repository, before merging into the `main` branch[ module repository ]

### API Creation
- **Dropdown APIs**: Use the format `GetDropdown{relevant message}` for APIs that provide dropdown data.
- **REST API Prefixes**: Adhere to standard RESTful prefixes for API methods:
  - `get` for retrieving data
  - `update` for modifying existing data
  - `delete` for removing data
  - `create` for adding new data
- **Dropdown APIs**: Dropdown lists are used frequently in the solution.
  Note: Most of the dropdown api are similar, such as getting warehouses, products in stock, and warehouse names that have products.
  - Create all dropdown APIs in `Common/Dropdowns/dropdownAppService.cs`.
  - All APIs must have documentation to prevent the creation of duplicate dropdown APIs.

### Good Practices
- Use triple indentation in case of multiple lines of string:

  ```c#
  throw new UserFriendlyException("""
            Error: Unable to create purchase details. 
            It seems the product type you're trying to add doesn't exist in our system. 
            Please check if you've selected the correct product type or contact support for assistance.
            """);
  ```
- Use `string.Empty` instead of `""`.


By following these guidelines, we ensure a smooth and efficient development process. Thank you for your cooperation!

