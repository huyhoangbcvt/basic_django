from django.shortcuts import render

# Create your views here.
from rest_framework.generics import ListAPIView, GenericAPIView
from rest_framework.permissions import IsAuthenticated
# from .models import Book
from .models.account_model import Account
from .serializers import User_appSerializer
from rest_framework.mixins import CreateModelMixin


# Get all
class ListAllProfile(ListAPIView):
    queryset = Account.objects.all()
    serializer_class = User_appSerializer
    permission_classes = [IsAuthenticated]


class CreateProfile(CreateModelMixin, GenericAPIView):
    serializer_class = User_appSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        # print(self.request.data)
        # print(self.request.data.get("name"))
        return self.create(request, *args, **kwargs)

    # def perform_create(self, serializer):
    #    _id = self.request.data.get('id')
    #    comment = get_object_or_404(Account, pk=_id)
    #    print(comment)
