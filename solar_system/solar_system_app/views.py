from django.shortcuts import render

def index(request):
    return render(request, 'index.html')  # Make sure index.html exists in templates folder
