from django.db import models
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.db.models.signals import post_save


# @python_2_unicode_compatible
class Account(models.Model):
    # id = models.AutoField(primary_key=True, serialize=False)  # phiên bản python 3.9 bắt buộc phải đ/n khóa chính
    # id = models.AutoField(auto_create=True, serialize=False)
    GOOGLE = 1
    FACEBOOK = 2
    LINKEDIN = 3
    SOCIAL_CHOICES = (
        (GOOGLE, 'Google'),
        (FACEBOOK, 'Facebook'),
        (LINKEDIN, 'Linkedin'),
    )
    social_network = models.PositiveSmallIntegerField(choices=SOCIAL_CHOICES, default=1, null=True, blank=True)
    birthday = models.DateField(null=True, blank=True)
    phone_number = models.CharField(max_length=20, null=True)
    address = models.CharField(max_length=150, null=True, blank=True)
    description = models.CharField(max_length=100, null=True)
    website = models.URLField(max_length=256, null=True)
    images = models.ImageField(upload_to='images', null=True)
    # user = models.OneToOneField(User, on_delete=models.CASCADE)  # id table user
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username

    # def __unicode__(self):
    #     return u"%s" % self.user

    class Meta:
        # managed = True
        db_table = 'account'
        verbose_name = 'account'
        verbose_name_plural = 'accounts'

# @receiver(post_save, sender=User)
# def create_or_update_user_profile(sender, instance, created, **kwargs):
#     if created:
#         Account.objects.create(user=instance)
#     instance.account.save()


# def createProfile(sender, **kwargs):
#     if kwargs['created']:
#         user_profile = Profile.objects.created(user=kwargs['instance'])
#     post_save.connect(createProfile, sender=User)

# @receiver(post_save, sender=User)
# def create_user_profile(sender, instance, created, **kwargs):
#     if created:
#         Profile.objects.create(user=instance)
#
# @receiver(post_save, sender=User)
# def save_user_profile(sender, instance, **kwargs):
#     instance.profile.save()


# Bên Ctrl call vào
# post_save.connect(create_user_profile, sender=User)
