import os
from pathlib import Path

# Base directory of your project
BASE_DIR = Path(__file__).resolve().parent.parent

# Security settings (make sure these are configured for production)
SECRET_KEY = 'your-secret-key'
DEBUG = True
ALLOWED_HOSTS = []

# Installed apps (add your app here if it's missing)
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'solar_system_app',  # Ensure your app is listed here
]

# Middleware (adjust based on your project's needs)
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# URLs and WSGI settings
ROOT_URLCONF = 'solar_system.urls'

# Templates settings
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# WSGI settings
WSGI_APPLICATION = 'solar_system.wsgi.application'

# Database settings (ensure these are correct for your project)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'

# Directories where static files are stored (include your app's static directory)
STATICFILES_DIRS = [
    BASE_DIR / 'solar_system_app' / 'static',  # This points to the 'static' folder in your app
]

# Where to collect static files in production (run `python manage.py collectstatic` in production)
STATIC_ROOT = BASE_DIR / 'staticfiles'

# Media files (uploadable files)
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# Configure logging if necessary
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': True,
        },
    },
}

# Other settings like language, timezone, etc.
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True
