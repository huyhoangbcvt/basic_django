from django.urls import path
from .views import ListAllProfile
from .views import CreateProfile
from django.contrib.auth.views import (
    LoginView, LogoutView,
    PasswordChangeView, PasswordChangeDoneView,
    PasswordResetView, PasswordResetDoneView, PasswordResetConfirmView, PasswordResetCompleteView,
)
from django.contrib.auth import (
    REDIRECT_FIELD_NAME, get_user_model, login as auth_login,
    logout as auth_logout, update_session_auth_hash,
)
from datetime import datetime, date

from django.urls import reverse_lazy
from django.contrib import admin
from django.contrib.auth import views as auth_views
from .modules import form_auth
from .modules import views_auth
# from django import template
# register = template.Library()
app_name = 'user'

urlpatterns = [
    # APIs: Django REST framework
    path("all-accounts", ListAllProfile.as_view(), name="all-accounts"),
    path("create-account", CreateProfile.as_view(), name="create-account"),
    # =============| Admin site |============
    # path('', admin.site.urls), # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
    path('', views_auth.index, name='index'),
    path('home/', views_auth.Homepage.as_view(), name='home'),

    path('book/', views_auth.index, name="book"),
    path('accounts/', views_auth.AuthView.as_view(), name="accounts"),
    path('accounts/login/', views_auth.LoginView.as_view(), name="login"),

    path('accounts/logout/', auth_views.LogoutView.as_view(
            #template_name="registration/logged_out.html",
            next_page=reverse_lazy('user:login'), #next_page='/',
        ), name='logout'),
    path('accounts/sign-up/', views_auth.RegistrationUser.as_view(), name='sign_up'), #path('sign_up/', MySignUpView.as_view(), name='sign_up'),
    #Bên ngoài - lúc chưa đăng nhập
    path('accounts/password-reset/', PasswordResetView.as_view(
                title = 'Lấy lại mật khẩu',
                form_class = form_auth.ResetPassToEmailForm, template_name = 'registration/password_reset_form.html',
                extra_context = {'next':'/accounts/login/', 'crumbs': [('Trang chủ', reverse_lazy('user:index')), ('Đăng nhập', reverse_lazy('user:login')), ('Lấy lại mật khẩu', reverse_lazy('user:user:password_reset'))],'year':datetime.now().year},
                success_url='done/',
        ), name="password_reset"),
    path('accounts/password-reset/done/', PasswordResetDoneView.as_view(
                title = 'Gửi yêu cầu thành công. Vào email để lấy lại mật khẩu',
                extra_context = {'next':'/accounts/login/', 'crumbs': [('Trang chủ', reverse_lazy('user:index')), ('Đăng nhập', reverse_lazy('user:login')), ('Gửi yêu cầu thành công. Vào email để lấy lại mật khẩu', reverse_lazy('user:password_reset_done'))],'year':datetime.now().year},
        ), name="password_reset_done"),
    #path('book/accounts/reset/<uidb64>/<token>/', ctrl_auth.PassResetView.as_view(), name="password_reset_confirm"),
    #Link được send vào mail
    path('accounts/reset/<uidb64>/<token>/', PasswordResetConfirmView.as_view(
                title = 'Đặt lại mật khẩu mới',
                form_class = form_auth.ResetPassForm, template_name = 'registration/password_reset_confirm.html',
                extra_context = {'next':'/accounts/login/', 'crumbs': [('Trang chủ', reverse_lazy('user:index')), ('Đăng nhập', reverse_lazy('user:login')), ('Đặt lại mật khẩu mới', reverse_lazy('user:password_reset_confirm'))],'year':datetime.now().year},
                success_url='/accounts/reset/done/',
        ), name="password_reset_confirm"),
    path('accounts/reset/done/', PasswordResetCompleteView.as_view(
                title = 'Đổi mật khẩu thành công',
                extra_context = {'next':'/accounts/login/', 'crumbs': [('Trang chủ', reverse_lazy('index')), ('Đăng nhập', reverse_lazy('login')), ('Đổi mật khẩu thành công', reverse_lazy('password_reset_complete'))],'year':datetime.now().year},
        ), name="password_reset_complete"),

    path('profile/', views_auth.ProfileView.as_view(), name='profile'),
    path('profile/edit/', views_auth.EditUserProfileView.as_view(), name='profile_edit'),
    path('profile/<int:gu_id>/edit/', views_auth.edit_profile_pk, name='profile_edit_pk'),

    #Bên trong - lúc đã đăng nhập
    path('accounts/password-change/', PasswordChangeView.as_view(
                title = 'Thay đổi mật khẩu',
                form_class = form_auth.PassChangeForm, template_name = 'registration/password_change_form_accounts.html',
                extra_context = {'next': reverse_lazy('user:password_change_done'), 'crumbs': [('Trang chủ', reverse_lazy('user:home')), ('Thông tin cá nhân', reverse_lazy('user:profile')), ('Thay đổi mật khẩu', reverse_lazy('user:password_change'))],'year':datetime.now().year},
                success_url='done/',
        ), name="password_change"),
    path('accounts/password-change/done/', PasswordChangeDoneView.as_view(
                title = 'Thay đổi mật khẩu thành công',
                extra_context = {'next': reverse_lazy('user:profile'), 'crumbs': [('Trang chủ', reverse_lazy('home')), ('Thông tin cá nhân', reverse_lazy('user:profile')), ('Thay đổi mật khẩu', reverse_lazy('user:password_change')), ('Thay đổi mật khẩu thành công', reverse_lazy('user:password_change_done'))],'year':datetime.now().year},
        ), name="password_change_done"),
]

