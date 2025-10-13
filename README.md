# Ramaiah CMS - Content Management System

A comprehensive Content Management System built with TypeScript, Express.js, TypeORM, and PostgreSQL. This CMS provides APIs for managing website content, navigation, pages, facilities, doctors, and more.

## �� Features

- **User Management**: Registration, login, and authentication with JWT
- **Content Management**: Dynamic content blocks, sections, and pages
- **Navigation System**: Hierarchical menu management
- **Media Management**: File uploads with Firebase Storage and Cloudinary integration
- **Real-time Communication**: Socket.IO for live updates
- **Database Integration**: PostgreSQL with TypeORM
- **API Documentation**: Swagger/OpenAPI documentation
- **Cron Jobs**: Automated background tasks
- **Logging**: Winston logger with file rotation
- **Security**: CORS, JWT authentication, and input validation

## ��️ Tech Stack

- **Backend**: Node.js, Express.js, TypeScript
- **Database**: PostgreSQL with TypeORM
- **Authentication**: JWT (JSON Web Tokens)
- **Real-time**: Socket.IO
- **File Storage**: Firebase Storage, Cloudinary
- **Logging**: Winston
- **Process Management**: PM2
- **API Documentation**: Swagger

## �� Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn package manager

## �� Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ramaiah_cms
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install global dependencies**
   ```bash
   npm install -g ts-node
   npm install -g pm2
   ```

4. **Environment Setup**
   Create a `.env` file in the root directory with the following variables:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_USER=your_db_user
   DB_PASS=your_db_password
   DB_NAME=your_db_name
   
   # JWT Configuration
   JWT_SECRET=your_jwt_secret
   TOKEN_SECRET=your_token_secret
   TOKEN_HEADER_KEY=authorization
   JWT_TIMEOUT_DURATION=24h
   
   # Server Configuration
   PORT=3000
   HOST=localhost
   NODE_ENV=development
   LOG_LEVEL=info
   
   # Cloudinary Configuration
   CLOUDINARY_USER_NAME=your_cloudinary_username
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   
   # FCM Configuration
   FCM_SERVER_KEY=your_fcm_server_key
   

## �� Running the Application

### Development Mode
```bash
npm run start:dev
```

### Production Mode
```bash
# Build the project
npm run build

# Start with PM2
npm run pm2
```

### Manual Start
```bash
npm start
```

## �� Project Structure

```
ramaiah_cms/
├── src/
│   ├── api/
│   │   ├── config/           # Database and configuration
│   │   ├── cron/             # Scheduled jobs
│   │   ├── domain/           # Entities, models, DTOs
│   │   ├── helpers/          # Utility functions
│   │   ├── interface/        # Controllers and routes
│   │   ├── lib/              # Libraries (JWT, logger, notifications)
│   │   ├── locales/          # Internationalization
│   │   ├── middlewares/      # Express middlewares
│   │   └── privacyPolicy/    # Privacy policy files
│   ├── infrastructure/
│   │   ├── env/              # Environment configuration
│   │   └── webserver/        # Express server and Socket.IO
│   └── uploads/              # File uploads directory
├── api-docs/                 # Swagger documentation
├── build/                    # Compiled JavaScript files
└── package.json
```

## �� API Endpoints

### Authentication
- `POST /api/v1/register` - User registration
- `POST /api/v1/login` - User login

### Site Settings
- `GET /api/v1/site/settings` - Get site settings
- `PUT /api/v1/site/settings` - Update site settings
- `POST /api/v1/site/settings/upload` - Upload files

### Content Management
- `GET /api/v1/home` - Get home page content
- `PUT /api/v1/home` - Update home page
- `POST /api/v1/home/section` - Create new section
- `GET /api/v1/home/sections/:pageId` - Get sections for page
- `PUT /api/v1/home/section/:sectionId` - Update section
- `DELETE /api/v1/home/section/:id` - Delete section

### Navigation
- `POST /api/v1/navigation` - Create navigation menu
- `GET /api/v1/navigation` - Get navigation menus
- `POST /api/v1/navigation/menu` - Create menu item
- `PUT /api/v1/navigation/menu/:id` - Update menu item
- `DELETE /api/v1/navigation/menu/:id` - Delete menu item

### Pages
- `POST /api/v1/page` - Create page
- `GET /api/v1/page` - Get all pages
- `GET /api/v1/page/:pageId` - Get page by ID
- `PUT /api/v1/page/:pageId` - Update page
- `DELETE /api/v1/page/:pageId` - Delete page

### Facilities
- `POST /api/v1/facility` - Create facility
- `GET /api/v1/facility` - Get all facilities
- `GET /api/v1/facility/:id` - Get facility by ID
- `PUT /api/v1/facility/:id` - Update facility
- `DELETE /api/v1/facility/:id` - Delete facility

### Doctors & Specialties
- `POST /api/v1/doctor` - Create doctor
- `GET /api/v1/doctor/:id` - Get doctor by ID
- `GET /api/v1/doctor/specialist` - Get doctor specialists
- `POST /api/v1/expert` - Add expert
- `GET /api/v1/specialties` - Get all specialties
- `POST /api/v1/specialties` - Create specialty

### Footer
- `GET /api/v1/footer/category` - Get footer categories
- `POST /api/v1/footer/content` - Create footer content
- `PUT /api/v1/footer/content/:id` - Update footer content

## �� Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## �� Database

The application uses PostgreSQL with TypeORM. Make sure your database is running and the connection details in the `.env` file are correct.

## �� Deployment

### Using PM2
```bash
# Build the project
npm run build

# Start with PM2
pm2 start build/index.js --name "ramaiah-cms"

# Monitor
pm2 monit
```

### Docker (Optional)
You can containerize the application using Docker for easier deployment.

## �� API Documentation

API documentation is available via Swagger at:
- Development: `http://localhost:3000/api-docs`
- The swagger configuration is located in `api-docs/swagger.json`

## ��️ Development

### Available Scripts
- `npm run start:dev` - Start development server with hot reload
- `npm run build` - Build the project
- `npm run start` - Start the production server
- `npm run pm2` - Start with PM2 process manager
- `npm test` - Run tests

### Code Structure
- **Entities**: Database models in `src/api/domain/entities/`
- **Controllers**: API route handlers in `src/api/interface/controllers/`
- **Routes**: API route definitions in `src/api/interface/routes/`
- **Middlewares**: Express middlewares in `src/api/middlewares/`
- **Helpers**: Utility functions in `src/api/helpers/`

## �� Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## �� License

This project is licensed under the MIT License.

## �� Support

For support and questions, please contact the development team or create an issue in the repository.