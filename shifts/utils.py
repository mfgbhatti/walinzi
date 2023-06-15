from datetime import datetime, timedelta, date


def CreateShift(request, model):
    # helpers
    def create(initial_date, last_date):
        """create a shift"""
        model.objects.create(
            site_id=site_id,
            time_in=datetime.combine(initial_date, time_in),
            time_out=datetime.combine(last_date, time_out),
    )

    # variables
    site_id = request.POST.get("site")
    time_in_str = request.POST.get("time_in")
    time_out_str = request.POST.get("time_out")
    started_str = request.POST.get("started")
    ended_str = request.POST.get("ended")

    # initialize
    time_in = datetime.strptime(time_in_str, "%H:%M").time()
    time_out = datetime.strptime(time_out_str, "%H:%M").time()
    started = datetime.strptime(started_str, "%Y-%m-%d").date()
    ended = datetime.strptime(ended_str, "%Y-%m-%d").date()

    delta = ended - started

    if delta.days <= 0: # if started and ended are same
        end_date = started + timedelta(days=1)
        create(started, end_date)
    else:
        for i in range(delta.days + 1): # 1 + 1, i=0, i=1
            start_date = started + timedelta(days=i)
            end_date = start_date + timedelta(days=i + 1)
            create(start_date, end_date)





    # def create(start_date, end_date):
    #     """create a shift"""
    #     model.objects.create(
    #         site_id=site_id,
    #         time_in=datetime.combine(start_date, time_in),
    #         time_out=datetime.combine(end_date, time_out),
    #     )
    #     # if staff_ids:
    #     #     shift.staff.set(staff_ids)
    #     # save data
    #     # shift.save()

    # def date_loop(n):
    #     for i in range(delta.days + 1):  # 0,1,2,3 # to include last date + 1 used
    #         initial_date = started + timedelta(days=i)  # this will start date at i=0
    #         last_date = initial_date + timedelta(days=n)
    #         create(initial_date, last_date)  # needs to add +1 for next day

    # # initialize
    # site_id = request.POST.get("site")
    # # staff_ids = request.POST.getlist("staff") # not needed
    # time_in = datetime.strptime(request.POST.get("time_in"), "%H:%M").time()
    # time_out = datetime.strptime(request.POST.get("time_out"), "%H:%M").time()
    # started = datetime.strptime(request.POST.get("started"), "%Y-%m-%d").date()
    # ended = datetime.strptime(request.POST.get("ended"), "%Y-%m-%d").date()

    # finish = datetime.combine(date.today(), time_out)
    # start = datetime.combine(date.today(), time_in)

    # delta = ended - started  # 0,1,2 # from 2nd june to 4th june
    # if delta.days < 0:  # for one day
    #     # create(started, ended)
    #     date_loop(n=1)
    # else:
    #     date_loop(n=0)
