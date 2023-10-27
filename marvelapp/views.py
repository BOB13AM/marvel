import json

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import JsonResponse
from django.shortcuts import HttpResponse, HttpResponseRedirect, render
from django.urls import reverse
#from django.views.decorators.csrf import csrf_exempt
import requests
import random 
import js2py


from .models import *



def index(request):
    return render(request, "marvelapp/index.html")

#@csrf_exempt
def check(request):
      if request.method == "POST":
        if request.user.is_authenticated:
             #get the current user 
            current_user = User.objects.get(pk=request.user.id)
           
            data = json.loads(request.body)

            #get the new info from user fav form
            wishid = data.get("wishid", "")

            current_fav = fav.objects.filter(user = current_user).values_list('charid', flat=True)

            if int(wishid) in  current_fav:
                msg='you already have this char in ur fav model'
                print(msg)
                return JsonResponse([msg], status=201,safe=False) 
            else:
                msg='you Dont have this char in ur fav model'
                print(msg)
                return JsonResponse([msg], status=201,safe=False) 

#@csrf_exempt
def addfav(request):
    if request.method == "POST":
        if request.user.is_authenticated:
          
            #get the current user 
            current_user = User.objects.get(pk=request.user.id)
           
            data = json.loads(request.body)

            #get the new info from user fav form
            wishid = data.get("wishid", "")
            wishname = data.get("wishname", "")
            path = data.get("path", "")
            extension = data.get("extension", "")
            categ = data.get("category", "")

            #print(categ)

            if current_user and wishid and path and extension and wishname :
                addchar = fav(user=current_user,charid=wishid,charname=wishname,charimgpath=path,charimgext=extension,category=categ)
                addchar.save()
                return JsonResponse({"message": "New Fav Character Added successfully."}, status=201)
            else:
                return JsonResponse({"error": "Missing Info"}, status=400) 
        else: 
            return JsonResponse({"error": "You Should Sign In or Register"}, status=400) 
        

def favpage(request,categoryname):
    if request.user.is_authenticated:
        #get the current user 
        current_user = User.objects.get(pk=request.user.id)

        #get the new info from user fav form
        categ = categoryname
        
        current_user = User.objects.get(pk=request.user.id)
        #print(current_user)
        #print(categ)
        userfav = current_user.favs.filter(category=categ)
        #print('this is normal',userfav)
        return HttpResponse(JsonResponse([allfav.serialize() for allfav in userfav], safe=False))
  

def marvelchars(request):
    offset = random.randint(0,1500)
    url = f'https://gateway.marvel.com:443/v1/public/characters?ts=1695035480130&limit=20&offset={offset}&apikey=dbaf9e59f058845c07d6e792b93bd5e5&hash=08ba6b3cd9d97b7467888a83910655fb'
    response = requests.get(url)
    charslist = response.json()
    da = charslist["data"]
    res = da["results"]
    return JsonResponse([chars for chars in res], safe=False)



def removefav(request,charid):
        try:
                intid = int(charid)
                target_char = fav.objects.get(pk=intid)
                if target_char :
                    #delete the target task
                    target_char.delete()
                    #get response message if success
                    return JsonResponse({"message": "Character Deleted successfully."}, status=201)
                else:
                        #get response message if faild
                    return JsonResponse({"error": "Missing Char"}, status=400)
                
        except :
                return JsonResponse({"error": "Missing Char (except)"}, status=400)


#login_view function login the users
def login_view(request):
    #check for method if its post 
    if request.method=="POST":
        # get the values of the user name and password from user
        username = request.POST.get('username')
        password = request.POST.get('password')

        #using the built-in authenticate function to check if the user name and password are the same 
        user = authenticate(request, username=username, password=password)

        #checking if the user var is not none to login the user
        if user is not None:
            login(request,user)
            return HttpResponseRedirect(reverse("index"))
        #else if the user var is none reload the login page with error message
        else:
            return render(request, "marvelapp/login.html",{
                    "message": "Invalid email and/or password."
                })
    #GET method rendering the login page     
    else:
        return render(request, "marvelapp/login.html")

#logout_view function logout the users
def logout_view(request):
    #using the logout function to logout current user then redirect the user to login page  
    logout(request)
    return HttpResponseRedirect(reverse("index"))

#register function register the users in the model and log them in afterwards
def register(request):
    if request.method == "POST":
        # get the values of the user name and password and confirm from user
        username = request.POST.get('username')
        password = request.POST.get('password')
        confirm = request.POST.get('confirmation')
        email=request.POST.get('email')
        #creating empty email to fillup the User Class Model if the user didnt provide one
        if not email:    
            email='not provided'
        
        #check if the password and the confirmation is the same 
        if password != confirm:
            return render(request, "marvelapp/register.html",{
                    "message": "Passwords must match."
                }) 
        #trying to create a new user 
        try:
            user = User.objects.create_user(username,email,password)
            user.save()
        #catching the except integrity error in case the user already exists
        except IntegrityError: 
             return render(request, "marvelapp/register.html", {
                "message": "Username already taken."
            })   
        
        #login the user with the login function after creating and then redirecting to index(mainpage)
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    
    #GET Method  rendering the register page
    else:        
        return render(request, "marvelapp/register.html")   