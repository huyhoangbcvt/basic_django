# Register your models here.
from django.contrib import admin
from django.contrib.auth.models import User
# from .models import local_account
# from models import local_account
from .models.account_model import Account
# from user_app.models.social_account import SocialAccount
from .modules.views_auth import CustomUserAdmin

# Register your models here
admin.site.register(Account)
# admin.site.register(SocialAccount)
# admin.site.unregister(User)
# admin.site.register(User, CustomUserAdmin)
