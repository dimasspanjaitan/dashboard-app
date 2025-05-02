# DIKEY-DASHBOARD-APP

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwind-css&logoColor=white)
![React](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)

A responsive, interactive dashboard web application built with Next.js, TypeScript, and Tailwind CSS. This project fetches and visualizes user and post data from an external API, featuring JWT-based authentication, dynamic routing, form validation, and performance optimization.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites

* **Node.js**: Ensure you have Node.js (LTS version) installed on your system. Download from [https://nodejs.org/](https://nodejs.org/).
* **npm** (comes bundled with Node.js): For package management.
* **Git**: For version control. Download from [https://git-scm.com/](https://git-scm.com/).

### Installing

1. Get the source code:

    ```sh
    git clone https://github.com/dimasspanjaitan/dashboard-app.git
    ```

2. Navigate to the Project Directory:

    ```sh
    cd dashboard-app
    ```

3. Install Dependencies:

    ```sh
    npm install
    ```

4. Running the Application:

    - *Development Mode*

        Start the Development Server

        ```sh
        npm run dev    
        ```

        Access the Application: Open your web browser and navigate to http://localhost:3000.

    - *Production Build*

        Build the Application:

        ```sh
        npm run build
        ```
        Start the Production Server:

        ```sh
        npm run start
        ```

        Access the Production Application: Navigate to http://localhost:3000 in your web browser.


### Configuring

This project use environment variable for configuration and provide following environment
variables:

- `API_URL`, `string`, (default: `/api`)
- `TOKEN_SECRET`, `string`, (default: `supersecurekey`)
- `TOKEN_EXPIRATION`, `string`, (default: `1h`)
- `BACKEND_URL`, `string`, (default: `http://localhost:8000`)
- `NEXT_PUBLIC_API_URL`, `string`, (default: `http://localhost:3000`)

## Deployment

### Deployment to Vercel

This project is optimized for deployment on [Vercel](https://vercel.com/), the official hosting platform for Next.js.

#### Prerequisites

- A [Vercel](https://vercel.com/signup) account
- GitHub, GitLab, or Bitbucket repository connected to Vercel
- Environment variables set in the Vercel dashboard (if any)

#### Steps to Deploy

1. **Push your project to a Git repository**

   Make sure your project is in a GitHub/GitLab/Bitbucket repo.

2. **Import the project into Vercel**

   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click **"Add New Project"**
   - Select your repository
   - Follow the setup instructions

3. **Configure Environment Variables**

   If your app requires environment variables (e.g. `TOKEN_SECRET`, `API_URL`, etc.), go to:

   - **Project Settings** → **Environment Variables**
   - Add the required variables for:
     - **Development**
     - **Preview**
     - **Production**

4. **Build & Output Settings**

   When deploying to Vercel, ensure the following build settings are correctly configured:

    - **Framework Preset**: `Next.js`
    - **Build Command**: `npm run build`
    - **Install Command**: `npm install`
    - **Output Directory**: `.next`

    Vercel automatically detects these for most Next.js projects, so no manual changes are usually required.

5. **Trigger your first deployment**

    Vercel will build and deploy your app.
    If successful, you’ll get a live link like:

    [https://dikey-dashboard-app.vercel.app](https://dikey-dashboard-app.vercel.app)

## Built With

This project leverages the following technologies and libraries:

- [Next.js](https://nextjs.org/) – React framework for server-side rendering and building full-stack web apps
- [TailAdmin (Free Edition)](https://github.com/TailAdmin/free-nextjs-admin-dashboard) – Modern Next.js admin dashboard template with Tailwind CSS
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework for fast UI development
- [JOSE](https://github.com/panva/jose) – JavaScript library for JWT authentication (signing and verifying tokens)
- [Yup](https://github.com/jquense/yup) – JavaScript schema builder for value parsing and validation

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/dimasspanjaitan/dashboard-app/tags).

## Authors

See also the list of [contributors](https://github.com/dimasspanjaitan/dashboard-app/graphs/contributors) who participated in this project.

## License

Distributed under the MIT License. See LICENSE for more information.

## Contact

- Dimas S Panjaitan - [@dimass.panjaitan](https://instagram.com/dimass.panjaitan) - dimasspanjaitan123@gmail.com
- Project Link: [DIKEY-Dashboard-App](https://github.com/dimasspanjaitan/dashboard-app.git)

## Acknowledgments