
# FlatPack.com

This project is a real estate search platform with a PHP Laravel backend and a React frontend. It enables users to browse and search for properties that match their preferences, providing a seamless experience for finding the perfect property. The system manages user authentication, property details, images, and messaging to streamline the property search process.

## Table of Contents
- [FlatPack.com](#flatpackcom)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Features](#features)
  - [Installation](#installation)
  - [Database](#database)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [Usage](#usage)
  - [Contributors](#contributors)
  - [License](#license)

---

## Project Overview

This project was developed by a team of three developers. A real estate search platform provides users with a convenient way to find and explore property listings tailored to their needs. It streamlines the search process by offering detailed information, filtering options, and image galleries, helping users make informed decisions. Such a platform is essential for connecting potential buyers or renters with property managers or owners, making the property search experience efficient and accessible."

---

## Features

- **Advanced Search and Filters:** Users can narrow down properties by location, price range, property type, and other criteria to find listings that meet their exact needs.
- **User Authentication and Profiles:** Secure login for users to create accounts, save favorite properties, and manage personalized searches.
- **Favorites and Wishlist:** Users can save properties to a favorites list, making it easy to keep track of potential choices and revisit them later.

---

## Installation

To install and run the project locally, follow these steps:

**Clone with the following command line:**

```bash
# Clone this repository
git clone https://github.com/Attila112/flatPack.git

```
## Database

Create a database locally named flatpack utf8_general_ci
Rename .env.example file to .env inside your project root and fill the database information. 
## Frontend

```bash
# Go to your local folder
cd {flatPack/frontend}

# Install dependencies
npm i

# Run application
npm run dev

# Visit localhost:5173

```

## Backend

```bash
# Go to your local folder
cd {flatPack/backend}

# Install dependencies
composer install

# Seed data
php artisan db::seed

#run application
php artisan serve
```

----------

## Usage

1.  **Search for your properties**: After loading the website, you can choose from different properties with your parameters.
2.  **Log in with your account**: If you registered oru page you can log in now.
3.  **Register an account**: You can register our page with your e-mail and a password.
4.  **Read more about property**: If you click on the Read More button you can read the parameters of a property.


----------


## Contributors

-   **Attila** - [@Attila112](https://github.com/Attila112)
-   **Patrik** - [@bodispatrik1995](https://github.com/bodispatrik1995)
-   **Adam** - [@MoorAdam](https://github.com/MoorAdam)

## License
This project is licensed under the MIT License.
