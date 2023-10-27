from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("marvelchars", views.marvelchars, name="marvelchars"),
    path("favpage/<str:categoryname>", views.favpage, name="favpage"),
    path("addfav", views.addfav, name="addfav"),
    path("removefav/<int:charid>", views.removefav, name="removefav"),
    path("check", views.check, name="check"),
   ]