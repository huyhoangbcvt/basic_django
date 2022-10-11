from django.contrib import admin
from django.urls import path

from .views import EmployeeImage, EmpImageDisplay
app_name = 'employee'

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', EmployeeImage.as_view(), name='home'),
    path('emp-image/<int:pk>/', EmpImageDisplay.as_view(), name='emp_image_display'),
]
