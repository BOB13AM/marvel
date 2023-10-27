from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    def serialize(self):
        return {
            "username": self.username,
            "email":self.email,
            "userid":self.id
        }
    
class fav(models.Model):
     user = models.ForeignKey("User", on_delete=models.CASCADE, related_name="favs")
     charid = models.IntegerField()
     charname = models.CharField(max_length=128)
     charimgpath = models.TextField()
     charimgext = models.CharField(max_length=8)
     category = models.CharField(max_length=64)

     def serialize(self):
        return {
            "id": self.id,
            "user": self.user.username,
            "charid": self.charid,
            "charname":self.charname,
            "imgpath":self.charimgpath,
            "imgext":self.charimgext,
            "category": self.category
        }
     def __str__(self):
         return f"{self.charname}"  