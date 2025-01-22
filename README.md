# AdventCalendar

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.10.

## Command

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.Usage

## Font Awesome

### Configuration:

- Install Font Awesome using npm or yarn: `npm install @fortawesome/fontawesome-svg-core @fortawesome/free
- Then, in your angular.json file, add the CSS path in the "styles" array:
  ```json
  "styles": [
  "node_modules/@fortawesome/fontawesome-free/css/all.min.css",
  "src/styles.css"
  ]
  ```

## Route Table

### client route

| Path                         | Component                     | Access Type | Description                            |
| ---------------------------- | ----------------------------- | ----------- | -------------------------------------- |
| `/`                          | `HomePagesComponent`          | Public      | Displays the home page                 |
| `/sign`                      | `SignInPageComponent`         | Public      | Sign-in page for users                 |
| `/calendars-list`            | `CalendarListPageComponent`   | Protected   | Lists all calendars (requires auth)    |
| `/new-calendar`              | `CreateCalendarPageComponent` | Protected   | Create a new calendar (requires auth)  |
| `/calendar/:calendarId`      | `CalendarPageComponent`       | Protected   | View specific calendar (requires auth) |
| `/calendar/:calendarId/edit` | `CalendarEditPageComponent`   | Protected   | Edit specific calendar (requires auth) |
| `/user`                      | `ProfilePageComponent`        | Protected   | Displays user profile (requires auth)  |
| `**`                         | Redirect to `/`               | Public      | Fallback route for undefined paths     |

### API Routes

| Path                  | Access Type | Param     | Key-Value                                                                       | Description                 |
| --------------------- | ----------- | --------- | ------------------------------------------------------------------------------- | --------------------------- |
| `api/upload/`         | Protected   | form-data | `image: file`                                                                   | Upload image to API         |
| `api/calendar/create` | Protected   | JSON body | `senderId: string`, `receiver: string`, `message: string`, `image_path: string` | Create a new calendar entry |

---

### Detailed Routes

#### `api/upload/`

**Access Type**: Protected  
**HTTP Method**: POST

**Request Key-Value**:

- `image`: The file to be uploaded (required, file).

**Headers**:

```http
Authorization: Bearer <your-token>
Content-Type: multipart/form-data
```

### Notes:

- **Protected routes** require the user to be authenticated. `AuthGuardService` is used to enforce this restriction.
- **Dynamic params** (`:calendarId`) in the routes are placeholders for specific calendar IDs.
- The `**` path acts as a wildcard route to handle undefined paths and redirects to the home page.
