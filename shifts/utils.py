from django.utils import timezone
from datetime import datetime, timedelta, date


def CreateShift(request, model):
    def create(start_date, end_date):
        """create a shift"""
        shift = model.objects.create(
            site_id=site_id,
            time_in=timezone.make_aware(datetime.combine(start_date, time_in)),
            time_out=timezone.make_aware(datetime.combine(end_date, time_out)),
        )
        if staff_ids:
            shift.staff.set(staff_ids)
        # save data
        shift.save()

    def date_loop(n):
        for i in range(delta.days + 1):  # 0,1,2,3 # to include last date + 1 used
            initial_date = started + timedelta(days=i)  # this will start date at i=0
            last_date = initial_date + timedelta(days=n)
            create(initial_date, last_date)  # needs to add +1 for next day

    # initialize
    site_id = request.POST.get("site")
    staff_ids = request.POST.getlist("staff")
    time_in = datetime.strptime(request.POST.get("time_in"), "%H:%M").time()
    time_out = datetime.strptime(request.POST.get("time_out"), "%H:%M").time()
    started = datetime.strptime(request.POST.get("started"), "%Y-%m-%d").date()
    ended = datetime.strptime(request.POST.get("ended"), "%Y-%m-%d").date()

    finish = datetime.combine(date.today(), time_out)
    start = datetime.combine(date.today(), time_in)

    delta = ended - started  # 0,1,2 # from 2nd june to 4th june
    if delta.days == 0:  # for one day
        create(started, ended)
    if finish < start:
        date_loop(n=1)
    else:
        date_loop(n=0)
