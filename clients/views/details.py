"""
views for client
"""
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model

from clients.models import Client, ClientAddress, ClientDetail, ClientPhone, ClientEmail, ClientNotes
from clients.forms import (
    ClientAddressForm,
    ClientDetailForm,
    ClientPhoneForm,
    ClientEmailForm,
    ClientNoteForm,
)

Users = get_user_model()


@login_required
def client_details_view(request, client_id):
    """client detail"""
    client = Client.objects.get(pk=client_id)
    # below code do not work with empty table No ClientAddress matches the given query.
    # client_address = get_object_or_404(ClientAddress, client=client_id)

    """make sure the user requesting site details is from same customer, where site belongs to"""
    user = Users.objects.get(email=request.user.email)
    if user.customer != client.customer:
        return redirect("clients:client_list")
    client_address = None
    client_detail = None

    try:
        client_address = ClientAddress.objects.get(client=client_id)
        client_detail = ClientDetail.objects.get(client=client_id)
    except ClientAddress.DoesNotExist:
        pass
    except ClientDetail.DoesNotExist:
        pass

    # try:
    #     phone_data = ClientPhone.objects.filter(client=client_id)
    # except ClientPhone.DoesNotExist:
    #     phone_data = None
    # try:
    #     email_data = ClientEmail.objects.filter(client=client_id)
    # except ClientEmail.DoesNotExist:
    #     email_data = None
    # try:
    #     note_data = ClientNotes.objects.filter(client=client_id)
    # except ClientNotes.DoesNotExist:
    #     note_data = None

    querysets = {}
    models = [ClientPhone, ClientEmail, ClientNotes]
    for model in models:
        try:
            queryset = model.objects.filter(client=client_id)
        except model.DoesNotExist:
            queryset = None
        querysets[model.__name__.lower()] = queryset

    # address_form = ClientAddressForm(request.POST or None, instance=client_address)
    # detail_form = ClientDetailForm(request.POST or None, instance=client_detail)
    # phone_form = ClientPhoneForm(request.POST or None)
    # email_form = ClientEmailForm(request.POST or None)
    # note_form = ClientNoteForm(request.POST or None)

    # if request.method == "POST":
    #     if "address_form" in request.POST:  # this string is name of submit button
    #         if address_form.is_valid:
    #             address_form.save()
    #             return redirect("clients:client_details", client_id)
    #     if "detail_form" in request.POST:
    #         if detail_form.is_valid:
    #             detail_form.save()
    #             return redirect("clients:client_details", client_id)
    #     if "phone_form" in request.POST:
    #         if phone_form.is_valid:
    #             phone_form.save()
    #             return redirect("clients:client_details", client_id)
    #     if "email_form" in request.POST:
    #         if email_form.is_valid:
    #             email_form.save()
    #             return redirect("clients:client_details", client_id)
    #     if "note_form" in request.POST:
    #         if note_form.is_valid:
    #             note_form.save()
    #             return redirect("clients:client_details", client_id)

    context = {}
    forms = {
        "address_form": (ClientAddressForm, client_address),
        "detail_form": (ClientDetailForm, client_detail),
        "phone_form": (ClientPhoneForm, None),
        "email_form": (ClientEmailForm, None),
        "note_form": (ClientNoteForm, None),
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
                    return redirect("clients:client_details", client_id)

    context.update(
        {
            "user.is_authenticated": request.user.is_authenticated,
            "clients_active": "active",
            "client": client,
            "client_address": client_address,
            "client_details": client_detail,
            # "phone_data": phone_data,
            # "email_data": email_data,
            # "note_data": note_data,
            "phone_data": querysets.get("clientphone"),
            "email_data": querysets.get("clientemail"),
            "note_data": querysets.get("clientnotes"),
            # "address_form": address_form,
            # "detail_form": detail_form,
            # "phone_form": phone_form,
            # "email_form": email_form,
            # "note_form": note_form,
        }
    )
    # print(context)
    # print(phone_data)
    return render(request, "clients/details.html", context)
