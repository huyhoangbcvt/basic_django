"""
Definition of forms.
"""

from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import (
    UserCreationForm, UserChangeForm, AuthenticationForm, PasswordResetForm,  # send mail
    SetPasswordForm, PasswordChangeForm, AdminPasswordChangeForm,
)
# from django.utils.translation import ugettext_lazy as _
from django.forms import ModelForm
from ..models.account_model import Account
from django.conf import settings
from django.template.defaultfilters import default
# from .widgets
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Submit, Row, Column
from django.utils.translation import gettext_lazy as _


# ======================== FORM Authentication ===============================
class LoginForm(AuthenticationForm):  # AuthenticationForm
    """Authentication form which uses boostrap CSS."""
    username = forms.CharField(label="Tên đăng nhập (*)", max_length=254,
                               widget=forms.TextInput({
                                   'class': 'form-control',
                                   'placeholder': 'Tên đăng nhập'}))
    password = forms.CharField(label=_("Password") + " (*)",
                               widget=forms.PasswordInput({
                                   'class': 'form-control',
                                   'placeholder': 'Mật khẩu'}))


# ======================== FORM registration ===============================
class SignUpForm(UserCreationForm):  # UserCreationForm
    # class SignUpForm(forms.Form):
    #     username = forms.CharField(max_length=30)
    #     email = forms.EmailField(max_length=200)
    first_name = forms.CharField(label="Tên (*)", max_length=254,
                                 widget=forms.TextInput({
                                     'class': 'form-control',
                                     'placeholder': 'Tên'}))
    last_name = forms.CharField(label="Họ đệm (*)", max_length=254,
                                widget=forms.TextInput({
                                    'class': 'form-control',
                                    'placeholder': 'Họ tên lót'}))
    #     birthday = forms.DateField(label="Ngày sinh", help_text='(định dạng mm/dd/yyyy)',
    #                                 widget=forms.DateInput(format = '%Y-%m-%d',attrs={'type': 'date', 'id': 'datepicker'}),
    #                                 input_formats=settings.DATE_INPUT_FORMATS)
    email = forms.CharField(label="Mail điện tử", max_length=100, required=False,
                            widget=forms.TextInput({
                                'class': 'form-control',
                                'placeholder': 'Email'}))
    GOOGLE = 1
    FACEBOOK = 2
    LINKEDIN = 3
    SOCIAL_CHOICES = (
        (GOOGLE, 'Google'),
        (FACEBOOK, 'Facebook'),
        (LINKEDIN, 'Linkedin'),
    )
    social_network = forms.ChoiceField(label="Mạng xã hội", choices=SOCIAL_CHOICES)

    phone_number = forms.CharField(label="Số điện thoại", max_length=20, required=False,
                                   widget=forms.TextInput({
                                       'class': 'form-control',
                                       'placeholder': 'Số điện thoại'}))
    username = forms.CharField(label="Tên đăng nhập (*)", max_length=254,
                               widget=forms.TextInput({
                                   'class': 'form-control',
                                   'placeholder': 'Tên đăng nhập'}))
    #     first_name = forms.CharField(max_length=100, help_text='Last Name')
    password1 = forms.CharField(label="Mật khẩu (*)",
                                widget=forms.PasswordInput({
                                    'class': 'form-control',
                                    'placeholder': 'Mật khẩu'}))
    password2 = forms.CharField(label="Re-Password (*)",
                                widget=forms.PasswordInput({
                                    'class': 'form-control',
                                    'placeholder': 'Gõ lại mật khẩu'}))

    # class Meta:
    #     model = User
    #     # fields = ('first_name', 'last_name', 'birthday', 'email', 'username', 'password1', 'password2', )
    #     fields = ('first_name', 'last_name', 'email', 'phone_number', 'username', 'password1', 'password2',)


#     def __init__(self, *args, **kwargs):
#         super().__init__(*args, **kwargs)
#         self.helper = FormHelper()
#         self.helper.layout = Layout(
#             Row(
#                 Column('first_name', css_class='form-group col-md-6 mb-0'),
#                 Column('last_name', css_class='form-group col-md-6 mb-0'),
#                 css_class='form-row'
#             ),
#             'address_1',
#             'address_2',
#             Row(
#                 Column('city', css_class='form-group col-md-6 mb-0'),
#                 Column('state', css_class='form-group col-md-4 mb-0'),
#                 Column('zip_code', css_class='form-group col-md-2 mb-0'),
#                 css_class='form-row'
#             ),
#             'check_me_out',
#             Submit('submit', 'Sign in')
#         )

# from django import forms
# from django.contrib.auth.forms import AuthenticationForm
# from django.utils.translation import ugettext_lazy as _
#
# class BootstrapAuthenticationForm(AuthenticationForm):
#     """Authentication form which uses boostrap CSS."""
#     username = forms.CharField(max_length=254,
#                                widget=forms.TextInput({
#                                    'class': 'form-control',
#                                    'placeholder': 'Tên đăng nhập'}))
#     password = forms.CharField(label=_("Password"),
#                                widget=forms.PasswordInput({
#                                    'class': 'form-control',
#                                    'placeholder':'Mật khẩu'}))

# ======================== FORM change password to send email ===============================
class ResetPassToEmailForm(PasswordResetForm):  # PasswordResetForm

    """Authentication form which uses boostrap CSS."""
    email = forms.CharField(label="Mail điện tử (*)", max_length=100,
                            widget=forms.TextInput({
                                'class': 'form-control',
                                'placeholder': 'Nhập email để lấy lại mật khẩu'}))


# ======================== FORM reset password =============================== forms.Form
class ResetPassForm(SetPasswordForm):  # SetPasswordForm  #forms.Form
    """Authentication form which uses boostrap CSS."""
    new_password1 = forms.CharField(label="Mật khẩu mới", min_length=6,
                                    widget=forms.PasswordInput({
                                        'class': 'form-control',
                                        'placeholder': 'Mật khẩu mới'}))
    new_password2 = forms.CharField(label="Xác nhận mật khẩu mới", min_length=6,
                                    widget=forms.PasswordInput({
                                        'class': 'form-control',
                                        'placeholder': 'Gõ lại mật khẩu mới'}))


# ======================== FORM password change =============================== forms.Form
class PassChangeForm(PasswordChangeForm):  # PasswordChangeForm
    """Authentication form which uses boostrap CSS."""
    old_password = forms.CharField(label="Mật khẩu cũ (*)",
                                   widget=forms.PasswordInput({
                                       'class': 'form-control',
                                       'placeholder': 'Mật khẩu cũ'}))
    new_password1 = forms.CharField(label="Mật khẩu mới (*)", min_length=6,
                                    widget=forms.PasswordInput({
                                        'class': 'form-control',
                                        'placeholder': 'Mật khẩu mới'}))
    new_password2 = forms.CharField(label="Xác nhận mật khẩu mới (*)", min_length=6,
                                    widget=forms.PasswordInput({
                                        'class': 'form-control',
                                        'placeholder': 'Gõ lại mật khẩu mới'}))


# ======================== FORM profile ===============================
class UserForm(ModelForm):  # UserCreationForm
    # class ProfileForm(forms.Form):
    #     username = forms.CharField(max_length=30)
    email = forms.CharField(label="Mail điện tử", help_text='Yandex/ Gmail/ Outlook', max_length=100, required=False,
                            widget=forms.TextInput({
                                'class': 'form-control',
                                'placeholder': 'Email'}))
    #     username = forms.CharField(label="Tên đăng nhập", required=False,
    #                                widget=forms.TextInput({
    #                                    'disabled': 'disabled',
    #                                    'class': 'form-control',
    #                                    'placeholder': 'Tên đăng nhập'}))
    first_name = forms.CharField(label="Tên (*)", max_length=254,
                                 widget=forms.TextInput({
                                     'class': 'form-control',
                                     'placeholder': 'Tên'}))
    last_name = forms.CharField(label="Họ đệm (*)", max_length=254,
                                widget=forms.TextInput({
                                    'class': 'form-control',
                                    'placeholder': 'Họ tên lót'}))

    #     password1 = forms.CharField(label="Mật khẩu",
    #                                widget=forms.PasswordInput({
    #                                    'class': 'form-control',
    #                                    'placeholder':'Mật khẩu'}))
    #     password2 = forms.CharField(label="Re-Password",
    #                                widget=forms.PasswordInput({
    #                                    'class': 'form-control',
    #                                    'placeholder':'Gõ lại mật khẩu'}))
    #     IS_STAFF_CHOICES = (
    #             ("0", "No Employee"),
    #             ("1", "Employee")
    #         )
    #     is_staff = forms.ChoiceField(label="Tình trạng nhân viên", widget=forms.RadioSelect, choices=IS_STAFF_CHOICES)
    #     is_staff = forms.BooleanField(label="Tình trạng nhân viên", default=False)
    #     is_active = forms.BooleanField(label="Kích hoạt", default=False)

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'is_staff', 'is_active',)
        labels = {'username': _('Tên đăng nhập'), 'email': _('Mail điện tử')}


class ProfileForm(ModelForm):
    GOOGLE = 1
    FACEBOOK = 2
    LINKEDIN = 3
    SOCIAL_CHOICES = (
        (GOOGLE, 'Google'),
        (FACEBOOK, 'Facebook'),
        (LINKEDIN, 'Linkedin'),
    )
    social_network = forms.ChoiceField(label="Mạng xã hội", choices = SOCIAL_CHOICES)
    phone_number = forms.CharField(label="Số điện thoại", max_length=20, required=False,
                                  widget=forms.TextInput({
                                      'class': 'form-control',
                                      'placeholder': 'Số điện thoại'}))
    address = forms.CharField(label="Địa chỉ", max_length=30, required=False,
                              widget=forms.TextInput({
                                  'class': 'form-control',
                                  'placeholder': 'Nhập địa chỉ'}))
    description = forms.CharField(label="Mô tả", max_length=100, required=False,
                                  widget=forms.Textarea({
                                      "rows": 3, "cols": 10,
                                      'class': 'form-control',
                                      'placeholder': 'Mô tả'}))
    website = forms.URLField(label="Link cá nhân", required=False,
                             widget=forms.TextInput({
                                 'class': 'form-control',
                                 'placeholder': 'Link cá nhân'}))
    # birthday = forms.FileField(label="Ngày sinh", required=False,
    #                             widget=forms.TextInput({
    #                                 'class': 'form-control',
    #                                 'placeholder': ''}) )
    birthday = forms.DateField(label="Ngày sinh", help_text='(định dạng mm/dd/yyyy)',
                               widget=forms.DateInput(format='%Y-%m-%d', attrs={'type': 'date', 'id': 'datepicker'}),
                               input_formats=settings.DATE_INPUT_FORMATS)

    #     birthday = forms.DateField(label="Ngày sinh", widget = forms.SelectDateWidget)
    #     birthday = forms.DateField(label="Ngày sinh", input_formats=['%Y-%m-%d'])
    #     images = forms.ImageField(label="Hình ảnh Avatar", help_text='Chọn một file từ thiết bị làm Avatar.', widget=forms.FileInput())
    # logo = forms.FileField(label='Logo')
    class Meta:
        model = Account
        fields = ('social_network', 'birthday', 'phone_number', 'address', 'description', 'website',
                  'images')  # Note that we didn't mention user field here.
        labels = {'social_network': _('Mạng xã hội'), 'birthday': _('Ngày sinh'), 'images': _('Hình ảnh Avatar')}
        help_texts = {'birthday': _('Nhập vào một ngày sinh định dạng mm/dd/yyyy (mặc định 01/01/2020).'),
                      'images': _('Chọn một file từ thiết bị làm Avatar.')}


class DateForm(forms.Form):
    date = forms.DateTimeField(
        input_formats=['%d/%m/%Y'],
        widget=forms.DateTimeInput(attrs={
            'class': 'form-control datepicker-input',
            'data-target': '#datetimepicker1'
        })
    )


class DateTimeForm(forms.Form):
    date = forms.DateTimeField(
        input_formats=['%d/%m/%Y %H:%M:%S'],
        widget=forms.DateTimeInput(attrs={
            'class': 'form-control datetimepicker-input',
            'data-target': '#datetimepicker1'
        })
    )
