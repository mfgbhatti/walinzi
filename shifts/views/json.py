from django.http import JsonResponse
from django.contrib.auth.decorators import login_required


# import paginator and model_to_dict
# from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.forms.models import model_to_dict


from shifts.models import Shift
from sites.models import Site


@login_required
def ShiftJsonView(request):
    user_customer = request.user.customer.id
    sites = Site.objects.filter(client__customer=user_customer)
    shifts = Shift.objects.filter(site__in=sites)
    ## https://stackoverflow.com/questions/76339382/how-to-join-on-django-using-orm
    # recordsTotal = 0
    # draw = int(request.GET["draw"])
    # start = int(request.GET["start"])
    # length = int(request.GET["length"])
    # draw = 1
    # start = 0
    # length = 25

    # # recordsTotal = shifts.count()
    # # recordsFiltered = recordsTotal
    # page = start / length + 1
    # paginator = Paginator(shifts, length)

    # try:
    #     object_list = paginator.page(page).object_list
    # except PageNotAnInteger:
    #     object_list = paginator.page(draw).object_list
    # except EmptyPage:
    #     object_list = paginator.page(paginator.num_pages).object_list
    data = []
    for shift in shifts:
        shift_dict = model_to_dict(shift)
        shift_dict["id"] = shift.id
        shift_dict["site"] = shift.site.name
        shift_dict["site_id"] = shift.site.id
        shift_dict["duration"] = shift.duration()
        shift_dict["started"] = shift.time_in
        shift_dict["ended"] = shift.time_out
        shift_dict["is_active"] = shift.is_active
        # shift_dict["day"] = shift.time_in.strftime("%A")
        # shift_dict["time_in"] = shift.time_in.strftime("%H:%M")
        # shift_dict["time_out"] = shift.time_out.strftime("%H:%M")
        # shift_dict["staff"] = list(shift.staff.values("name", "id"))

        data.append(shift_dict)
    # data = [model_to_dict(shift) for shift in object_list]

    # json_res = {
    #     "draw": draw,
    #     "recordsTotal": recordsTotal,
    #     "recordsFiltered": recordsFiltered,
    #     "data": data,
    # }

    return JsonResponse({"data": data})
    # return JsonResponse(json_res)
