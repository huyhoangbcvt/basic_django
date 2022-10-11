from rest_framework import serializers
from .models.account_model import Account

class User_appSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Account
        fields = '__all__'
