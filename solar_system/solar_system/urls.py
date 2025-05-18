from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('solar_system_app.urls')),  # ✅ Point to app
]
