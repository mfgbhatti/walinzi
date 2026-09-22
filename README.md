# Walinzi

**Walinzi** is a Django-based management system for security-guard companies and their day-to-day operations.

The name **Walinzi** comes from Swahili, where *walinzi* means **guards**.

The project started as a personal Django project and grew organically while experimenting with workforce management, scheduling, timesheets, staff records, clients, sites, authentication, and a web-based administration interface.

It is now being prepared for open source.

> **Status:** Early open-source / work in progress

---

## What is Walinzi?

Walinzi is intended to help security companies manage the people and places involved in their operations from a single web application.

The core model revolves around:

```text
Customer
   │
   └── Client
         │
         └── Site
                │
                └── Shift
                      │
                      └── Staff
```

The application keeps information about customers, clients, security sites, guards/staff, shifts, and timesheets connected to each other.

---

## Features

### Staff management

Walinzi includes a detailed staff/guard record with support for information such as:

- Personal details
- Contact information
- Address
- Employment information
- Contracts
- Pay rates
- Education
- References
- Licences
- Vetting information
- Health information
- Appearance
- Passport information
- Banking information

The staff system is deliberately separated into several models so that different areas of a staff record can be managed independently.

### Customer management

Customers can be managed with information including:

- Contact details
- Addresses
- Phone numbers
- Email addresses
- Notes
- Active/inactive status

### Client management

Clients can have their own:

- Details
- Contact information
- Address
- Email
- Phone
- Notes
- Rates
- Active/inactive status

### Site management

Sites represent the physical locations where security services are provided.

Sites include support for:

- Site details
- Address
- Contact information
- Phone
- Email
- Notes

### Shift management

Shifts are one of the central parts of Walinzi.

The application provides functionality for:

- Creating shifts
- Updating shifts
- Activating/deactivating shifts
- Assigning staff
- Managing shift times
- Timesheets
- Calculating working duration
- Viewing shifts associated with staff

### Authentication

Walinzi uses a custom Django user model and includes:

- Login
- Logout
- User creation
- Account activation
- Activation keys
- Activation links
- Session configuration

### DataTables

Several parts of the interface use **DataTables** for displaying and interacting with larger sets of data.

The application includes server-side JSON endpoints used by the DataTables interface.

---

## Technology

Walinzi is built primarily with:

- [Django](https://www.djangoproject.com/)
- Python
- SQLite during development
- HTML
- CSS
- JavaScript
- DataTables
- Halfmoon CSS
- Bootstrap Icons

The project uses Django's standard application structure while keeping larger areas of functionality separated into individual Django apps.

---

## Project structure

The main Django applications are:

```text
accounts/      Authentication and user management
clients/       Client management
common/        Shared models and functionality
customers/     Customer management
dashboard/     Dashboard
shifts/        Shifts and timesheets
sites/         Security sites
staff/         Staff/guard management
config/        Django project configuration
templates/     HTML templates
sitestatic/    Static assets
```

The project intentionally separates different areas of the domain instead of putting everything into a single Django application.

---

## Getting started

### Requirements

You will need:

- Python
- pip
- A virtual environment
- SQLite for the default development setup

A recent Python version is recommended.

### Clone the repository

```bash
git clone https://github.com/your-username/walinzi.git
cd walinzi
```

### Create a virtual environment

Linux/macOS:

```bash
python -m venv .venv
source .venv/bin/activate
```

Windows:

```powershell
python -m venv .venv
.venv\Scripts\activate
```

### Install dependencies

```bash
pip install -r requirements/base.txt
```

### Configure the environment

Copy the example environment file:

```bash
cp .env.example .env
```

Then edit `.env` and provide the appropriate values for your environment.

At minimum, you should configure a secure Django `SECRET_KEY` for anything other than local development.

### Run migrations

```bash
python manage.py migrate
```

### Create an administrator

```bash
python manage.py createsuperuser
```

### Start the development server

```bash
python manage.py runserver
```

Then open:

```text
http://127.0.0.1:8000/
```

---

## Configuration

Environment-specific configuration is kept outside the source code.

Do **not** commit:

```text
.env
.env.local
```

to the repository.

Use `.env.example` to document the variables required by the application.

Never commit production credentials, API keys, database credentials, or Django secret keys.

---

## Development

Walinzi is an evolving project.

Some parts of the codebase were written at different stages of development and therefore do not necessarily represent one consistent architectural style.

That is intentional for now.

The goal of the open-source version is to gradually improve:

- Documentation
- Test coverage
- Code organisation
- Security
- Accessibility
- UI/UX
- Database design
- Developer experience
- Deployment documentation

Contributions that improve the project without requiring a complete rewrite are especially welcome.

---

## Architecture

Walinzi follows Django's application-based architecture.

Rather than treating the application as one large monolith internally, functionality is separated into domain-specific applications.

For example:

```text
                    ┌──────────────┐
                    │   Customer   │
                    └──────┬───────┘
                           │
                    ┌──────▼───────┐
                    │    Client    │
                    └──────┬───────┘
                           │
                    ┌──────▼───────┐
                    │     Site     │
                    └──────┬───────┘
                           │
                    ┌──────▼───────┐
                    │    Shift     │
                    └──────┬───────┘
                           │
                    ┌──────▼───────┐
                    │    Staff     │
                    └──────────────┘
```

This model may evolve as the project develops.

---

## Why does this project exist?

Walinzi started as a practical project rather than a framework demonstration.

A lot of the development involved solving real problems:

- How should shifts be represented?
- How should staff be associated with shifts?
- How should timesheets be handled?
- How should clients and sites relate to one another?
- How should detailed staff records be organised?
- How should large datasets be displayed and edited in the browser?

The result is a project that has gone through several iterations.

It is not presented as a perfect example of Django architecture.

Instead, Walinzi is being opened up so that it can continue to evolve with the help of other developers.

---

## Roadmap

The roadmap will evolve as the project is cleaned up and documented.

Some areas currently being considered include:

- [ ] Improve project documentation
- [ ] Add comprehensive automated tests
- [ ] Improve permissions and role management
- [ ] Improve shift scheduling
- [ ] Improve timesheet management
- [ ] Improve reporting
- [ ] Improve mobile usability
- [ ] Improve accessibility
- [ ] Review database relationships
- [ ] Improve deployment documentation
- [ ] Clean up legacy code
- [ ] Add developer documentation
- [ ] Establish contribution guidelines

---

## Contributing

Contributions are welcome.

If you find a bug, have an idea, or want to improve part of the project, please open an issue before making large changes.

For code contributions:

1. Fork the repository.
2. Create a branch for your change.
3. Make your changes.
4. Add or update tests where appropriate.
5. Make sure the project runs correctly.
6. Open a pull request.

Small improvements are welcome too. Documentation, tests, accessibility improvements, bug fixes, and code cleanup are all useful contributions.

---

## Security

Please do not report security vulnerabilities through public GitHub issues.

A dedicated security policy and reporting process will be added as the project moves toward its first public release.

Until then, avoid publishing sensitive information such as:

- Passwords
- Secret keys
- API tokens
- Database credentials
- Personal staff information
- Production configuration

---

## License

Walinzi is open source.

The project license will be specified here before the first public release.

---

## Acknowledgements

Walinzi is built on the work of many open-source projects and libraries.

In particular, the project makes use of the Django ecosystem and browser-side libraries such as DataTables and Halfmoon.

Please see the relevant dependency and vendor files for their respective licenses.

---

## Project status

Walinzi is currently undergoing a cleanup and transition from a long-running personal project into a public open-source project.

Expect rough edges.

The intention is not to hide the project's history, but to build on it.

**If you're interested in Django, workforce management, scheduling, or just helping turn a Frankenstein project into something useful, you're welcome here.**