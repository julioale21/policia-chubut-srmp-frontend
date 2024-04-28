
<p align="center">
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlR5RfWd9ND6yOkmWX1AyRJw6ebGJyQYDlc6FS-EUzLA&s" alt="Police Workshop Logo" title="Logo of the Police Workshop Management System"/>
</p>

# Police Workshop Management System

## Overview

This project is developed for the Police of the State of Chubut, Argentina. It serves as a management system for the mechanical workshop that handles repairs of police vehicles. The system tracks every vehicle that enters for repairs, managing ingress and egress orders, vehicle data, and provider information. It also generates statistical reports to aid in the efficient management of the workshop resources.

## Objectives

- **Tracking and Management:** Manage and track all activities related to the vehicles entering and leaving the workshop.
- **Authentication:** Secure the application and ensure that only authorized personnel can access the system using NextAuth.
- **User Interface:** Provide a user-friendly interface using Material UI (MUI) for smooth interactions with the system.
- **Data Fetching:** Utilize React Query for efficient data fetching and state management of API requests.

## Technologies Used

- **Next.js**: The React framework for production.
- **NextAuth.js**: For authentication purposes.
- **React Query**: For handling server state and caching API requests.
- **Material UI (MUI)**: For designing a comprehensive and responsive UI.

## Project Structure

- **app/**: Contains all feature-specific modules.
  - **feature-name/**: Each feature of the application like vehicle management, provider management, etc.

## Getting Started

### Prerequisites

- Node.js (v14.x or later)
- npm (v6.x or later)

### Setup

1. Clone the repository:**
   Use the following commands to clone the repository and navigate into the project directory:
   
   git clone https://your-repository-url
   cd your-project-folder

2. Run 

yarn install

3. rename .env.example to .env.local and configure

   NEXT_PUBLIC_BACKEND_URL=
    NEXTAUTH_SECRET=

4. run

   yarn dev

