"""Django_template_practice1 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, reverse_lazy #, include
from django.conf.urls import include

# from django.conf.urls import url, include
from django.contrib.auth import views as auth_views
from django.contrib.auth.views import (LoginView, LogoutView,
    PasswordChangeView, PasswordChangeDoneView,PasswordResetView,
    PasswordResetDoneView, PasswordResetConfirmView, PasswordResetCompleteView,
)
from django.contrib.auth import (
    REDIRECT_FIELD_NAME, get_user_model, login as auth_login,
    logout as auth_logout, update_session_auth_hash,
)
from django.views.generic.base import TemplateView
# # from book.views import homepage #1
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.staticfiles.urls import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.views.static import serve
from datetime import datetime, date

urlpatterns = [
    # djoser endpoints: Django REST framework
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    # =============| Admin site |============
    path('admin/', admin.site.urls),
    # =============| app endpoints |============
    path("user/", include("user_app.urls")),
    path('employee/', include('employee_app.urls')),
]

# from django.conf import settings
# from django.conf.urls.static import static
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)