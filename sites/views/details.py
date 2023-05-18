"""
views for site
"""
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required

from sites.models import Site, SiteAddress, SitePhone, SiteEmail, SiteNotes
from sites.forms import (
    SiteAddressForm,
    SitePhoneForm,
    SiteEmailForm,
    SiteNoteForm,
)


@login_required
def SiteDetailsView(request, site_id):
    """site detail"""
    site = Site.objects.get(pk=site_id)
    # below code do not work with empty table No SiteAddress matches the given query.
    # site_address = get_object_or_404(SiteAddress, site=site_id)

    try:
        site_address = SiteAddress.objects.get(site=site_id)
    except SiteAddress.DoesNotExist:
        site_address = None

    # try:
    #     phone_data = SitePhone.objects.filter(site=site_id)
    # except SitePhone.DoesNotExist:
    #     phone_data = None
    # try:
    #     email_data = SiteEmail.objects.filter(site=site_id)
    # except SiteEmail.DoesNotExist:
    #     email_data = None
    # try:
    #     note_data = SiteNotes.objects.filter(site=site_id)
    # except SiteNotes.DoesNotExist:
    #     note_data = None

    querysets = {}
    models = [SitePhone, SiteEmail, SiteNotes]
    for model in models:
        try:
            queryset = model.objects.filter(site=site_id)
        except model.DoesNotExist:
            queryset = None
        querysets[model.__name__.lower()] = queryset

    # address_form = SiteAddressForm(request.POST or None, instance=site_address)
    # detail_form = SiteDetailForm(request.POST or None, instance=site_detail)
    # phone_form = SitePhoneForm(request.POST or None)
    # email_form = SiteEmailForm(request.POST or None)
    # note_form = SiteNoteForm(request.POST or None)

    # if request.method == "POST":
    #     if "address_form" in request.POST:  # this string is name of submit button
    #         if address_form.is_valid:
    #             address_form.save()
    #             return redirect("sites:site_details", site_id)
    #     if "detail_form" in request.POST:
    #         if detail_form.is_valid:
    #             detail_form.save()
    #             return redirect("sites:site_details", site_id)
    #     if "phone_form" in request.POST:
    #         if phone_form.is_valid:
    #             phone_form.save()
    #             return redirect("sites:site_details", site_id)
    #     if "email_form" in request.POST:
    #         if email_form.is_valid:
    #             email_form.save()
    #             return redirect("sites:site_details", site_id)
    #     if "note_form" in request.POST:
    #         if note_form.is_valid:
    #             note_form.save()
    #             return redirect("sites:site_details", site_id)

    context = {}
    forms = {
        "address_form": (SiteAddressForm, site_address),
        "phone_form": (SitePhoneForm, None),
        "email_form": (SiteEmailForm, None),
        "note_form": (SiteNoteForm, None),
    }

    for key, value in forms.items():
        form_class, instance = value
        if instance is not None:
            form = form_class(request.POST or None, instance=instance)
        else:
            form = form_class(request.POST or None)

        context[key] = form

        if request.method == "POST":
            if key in request.POST:
                if form.is_valid:
                    form.save()
                    return redirect("sites:site_details", site_id)

    context.update(
        {
            "user.is_authenticated": request.user.is_authenticated,
            "sites_active": "active",
            "site": site,
            "site_address": site_address,
            # "phone_data": phone_data,
            # "email_data": email_data,
            # "note_data": note_data,
            "phone_data": querysets.get("sitephone"),
            "email_data": querysets.get("siteemail"),
            "note_data": querysets.get("sitenotes"),
            # "address_form": address_form,
            # "detail_form": detail_form,
            # "phone_form": phone_form,
            # "email_form": email_form,
            # "note_form": note_form,
        }
    )
    # print(context)
    # print(phone_data)
    return render(request, "sites/details.html", context)
