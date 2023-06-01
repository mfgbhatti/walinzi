"""
views for staff
"""
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model

from staff.utils import get_cumulative_duration
from shifts.models import Shift
from staff.models import (
    Staff,
    StaffContract,
    StaffVetting,
    StaffHealth,
    StaffLicence,
    StaffDetail,
    StaffBank,
    StaffPassort,
    StaffAppearance,
    # above is single instances
    StaffAddress,
    StaffContact,
    StaffEducation,
    StaffEmail,
    StaffEmployer,
    StaffPhone,
    StaffReference,
)

from staff.forms import (
    StaffAddressForm,
    StaffAppearanceForm,
    StaffBankForm,
    StaffContactForm,
    StaffContractForm,
    StaffDetailForm,
    StaffEducationForm,
    StaffEmailForm,
    StaffEmployerForm,
    StaffHealthForm,
    StaffLicenceForm,
    StaffPassortForm,
    StaffPhoneForm,
    StaffReferenceForm,
    StaffVettingForm,
)

Users = get_user_model()


@login_required
def StaffDetailsView(request, staff_id):
    """staff detail"""
    staff = Staff.objects.get(pk=staff_id)
    need_next = get_cumulative_duration(staff)

    shifts = Shift.get_shifts_for_staff(staff=staff)
    total_hours = sum(shift.duration() for shift in shifts)

    """make sure the user requesting staff details is from same customer, where staff belongs to"""
    user = Users.objects.get(email=request.user.email)
    if user.customer != staff.customer:
        return redirect("staff:staff_list")

    context = {}
    querysets = {}
    single_used_models = [
        StaffContract,
        StaffVetting,
        StaffHealth,
        StaffLicence,
        StaffDetail,
        StaffBank,
        StaffPassort,
        StaffAppearance,
    ]
    for model in single_used_models:
        try:
            queryset = model.objects.get(staff=staff_id)
        except model.DoesNotExist:
            queryset = None
        querysets[model.__name__.lower()] = queryset
        context[model.__name__.lower()] = queryset

    multiple_used_models = [
        StaffAddress,
        StaffContact,
        StaffEducation,
        StaffEmail,
        StaffEmployer,
        StaffPhone,
        StaffReference,
    ]
    for model in multiple_used_models:
        try:
            queryset = model.objects.filter(staff=staff_id)
        except model.DoesNotExist:
            queryset = None
        querysets[model.__name__.lower()] = queryset
        context[model.__name__.lower()] = queryset

    forms = {
        "contract_form": (StaffContractForm, querysets.get("staffcontract")),
        "vetting_form": (StaffVettingForm, querysets.get("staffvetting")),
        "health_form": (StaffHealthForm, querysets.get("staffhealth")),
        "licence_form": (StaffLicenceForm, querysets.get("stafflicence")),
        "detail_form": (StaffDetailForm, querysets.get("staffdetail")),
        "bank_form": (StaffBankForm, querysets.get("staffbank")),
        "passort_form": (StaffPassortForm, querysets.get("staffpassort")),
        "appearance_form": (StaffAppearanceForm, querysets.get("staffappearance")),
        "address_form": (StaffAddressForm, None),
        "contact_form": (StaffContactForm, None),
        "education_form": (StaffEducationForm, None),
        "email_form": (StaffEmailForm, None),
        "employer_form": (StaffEmployerForm, None),
        "phone_form": (StaffPhoneForm, None),
        "reference_form": (StaffReferenceForm, None),
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
                    info = form.save(commit=False)
                    info.staff = staff
                    info.save()
                    return redirect("staff:staff_detail", staff_id)

    context.update(
        {
            "user.is_authenticated": request.user.is_authenticated,
            "staff_active": "active",
            "staff": staff,
            "shifts": shifts,
            "total_hours": total_hours,
            "need_next": need_next
        }
    )
    # print(context)
    return render(request, "staff/details.html", context)
