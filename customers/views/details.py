"""
views for customer
"""
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required

from customers.models import Customer, CustomerAddress, CustomerDetail, CustomerPhone, CustomerEmail, CustomerNotes
from customers.forms import (
    CustomerAddressForm,
    CustomerDetailForm,
    CustomerPhoneForm,
    CustomerEmailForm,
    CustomerNoteForm,
)


@login_required
def CustomerDetailsView(request, customer_id):
    """customer detail"""
    customer = Customer.objects.get(pk=customer_id)
    # below code do not work with empty table No CustomerAddress matches the given query.
    # customer_address = get_object_or_404(CustomerAddress, customer=customer_id)

    try:
        customer_address = CustomerAddress.objects.get(customer=customer_id)
    except CustomerAddress.DoesNotExist:
        customer_address = None
    try:
        customer_detail = CustomerDetail.objects.get(customer=customer_id)
    except CustomerDetail.DoesNotExist:
        customer_detail = None

    # try:
    #     phone_data = CustomerPhone.objects.filter(customer=customer_id)
    # except CustomerPhone.DoesNotExist:
    #     phone_data = None
    # try:
    #     email_data = CustomerEmail.objects.filter(customer=customer_id)
    # except CustomerEmail.DoesNotExist:
    #     email_data = None
    # try:
    #     note_data = CustomerNotes.objects.filter(customer=customer_id)
    # except CustomerNotes.DoesNotExist:
    #     note_data = None

    querysets = {}
    models = [CustomerPhone, CustomerEmail, CustomerNotes]
    for model in models:
        try:
            queryset = model.objects.filter(customer=customer_id)
        except model.DoesNotExist:
            queryset = None
        querysets[model.__name__.lower()] = queryset

    # address_form = CustomerAddressForm(request.POST or None, instance=customer_address)
    # detail_form = CustomerDetailForm(request.POST or None, instance=customer_detail)
    # phone_form = CustomerPhoneForm(request.POST or None)
    # email_form = CustomerEmailForm(request.POST or None)
    # note_form = CustomerNoteForm(request.POST or None)

    # if request.method == "POST":
    #     if "address_form" in request.POST:  # this string is name of submit button
    #         if address_form.is_valid:
    #             address_form.save()
    #             return redirect("customers:customer_details", customer_id)
    #     if "detail_form" in request.POST:
    #         if detail_form.is_valid:
    #             detail_form.save()
    #             return redirect("customers:customer_details", customer_id)
    #     if "phone_form" in request.POST:
    #         if phone_form.is_valid:
    #             phone_form.save()
    #             return redirect("customers:customer_details", customer_id)
    #     if "email_form" in request.POST:
    #         if email_form.is_valid:
    #             email_form.save()
    #             return redirect("customers:customer_details", customer_id)
    #     if "note_form" in request.POST:
    #         if note_form.is_valid:
    #             note_form.save()
    #             return redirect("customers:customer_details", customer_id)

    context = {}
    forms = {
        "address_form": (CustomerAddressForm, customer_address),
        "detail_form": (CustomerDetailForm, customer_detail),
        "phone_form": (CustomerPhoneForm, None),
        "email_form": (CustomerEmailForm, None),
        "note_form": (CustomerNoteForm, None),
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
                    return redirect("customers:customer_details", customer_id)

    context.update(
        {
            "user.is_authenticated": request.user.is_authenticated,
            "customers_active": "active",
            "customer": customer,
            "customer_address": customer_address,
            "customer_details": customer_detail,
            # "phone_data": phone_data,
            # "email_data": email_data,
            # "note_data": note_data,
            "phone_data": querysets.get("customerphone"),
            "email_data": querysets.get("customeremail"),
            "note_data": querysets.get("customernotes"),
            # "address_form": address_form,
            # "detail_form": detail_form,
            # "phone_form": phone_form,
            # "email_form": email_form,
            # "note_form": note_form,
        }
    )
    # print(context)
    # print(phone_data)
    return render(request, "customers/details.html", context)
