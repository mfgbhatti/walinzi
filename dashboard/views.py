"""
Views for dashboard
"""
from django.http import HttpResponse
from django.template import loader
from django.contrib.auth.decorators import login_required

# Create your views here.
@login_required
def Dashboard(request):
    """main view"""
    template = loader.get_template("dashboard/index.html")
    context = {
        'user.is_authenticated': 'request.user.is_authenticated'
    }
    return HttpResponse(template.render(context, request))