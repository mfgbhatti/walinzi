from datetime import timedelta

def get_cumulative_duration(staff):
    cumulative_duration = timedelta()

    for address in staff.address.all():
        duration = address.in_untill - address.in_from
        cumulative_duration += duration

    if cumulative_duration >= timedelta(days=5*365):
        return True
    else:
        return None