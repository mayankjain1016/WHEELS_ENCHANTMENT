import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import path from 'path';
import { env } from './config/env';
import { errorHandler, notFound } from './middleware/error.middleware';
import { requestLogger } from './middleware/logger.middleware';
import { apiLimiter } from './middleware/rateLimit.middleware';

const app: Application = express();

// Trust proxy
app.set('trust proxy', 1);

  // CORS - Must be before other middleware
const allowedOrigins = env.NODE_ENV === 'production' 
  ? ['https://www.wheelsenchntment.com', 'https://wheelsenchntment.com']
  : ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, Postman, or same-origin)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Content-Type', 'Content-Length']
}));

// Additional CORS headers for all requests including static files
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else if (!origin) {
    // For same-origin requests or requests without origin header
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
});

// Security middleware - After CORS
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: false
}));

// Body parser
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Cookie parser
app.use(cookieParser(env.COOKIE_SECRET));

// Compression
app.use(compression());

// Data sanitization against NoSQL injection
app.use(mongoSanitize());

// Prevent HTTP parameter pollution
app.use(hpp());

// Request logging
app.use(requestLogger);

// Rate limiting
app.use('/api/', apiLimiter);

// Static files - serve uploads with CORS
const uploadOrigins = env.NODE_ENV === 'production'
  ? ['https://www.wheelsenchntment.com', 'https://wheelsenchntment.com']
  : ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'];

app.use('/uploads', cors({
  origin: uploadOrigins,
  credentials: true
}), express.static(path.join(__dirname, '../uploads'), {
  maxAge: '1y',
  etag: true,
  lastModified: true
}));

// Serve frontend assets as fallback (for development)
app.use('/src/assets', express.static(path.join(__dirname, '../../src/assets'), {
  maxAge: '1d'
}));

// Health check
app.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// API routes
import routes from './routes';
import v1Routes from './routes/api/v1';
app.use('/api', routes);
app.use('/api', v1Routes); // Direct v1 routes for backward compatibility

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

export default app;
