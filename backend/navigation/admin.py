"""admin for navigation"""

from django.contrib import admin

from .models import Navigation

admin.site.register(Navigation)

# from .models import MainNavigation, ChildNavigation, ChildNavigationBadge, ChildNavigationClass


# class ChildNavigationBadgeInline(admin.TabularInline):
#     """badge inline for child navigation"""

#     model = ChildNavigationBadge
#     extra = 1


# class ChildNavigationClassInline(admin.TabularInline):
#     """class inline for child navigation"""

#     model = ChildNavigationClass
#     extra = 1


# class ChildNavigationAdmin(admin.ModelAdmin):
#     """child navigation admin"""

#     inlines = [ChildNavigationBadgeInline, ChildNavigationClassInline]
#     list_display = (
#         "title",
#         "main",
#         "type",
#         "link",
#         "active",
#         "disabled",
#     )

# class MainNavigationAdmin(admin.ModelAdmin):
#     """main navigation admin"""
#     model = MainNavigation
#     list_display = (
#         "title",
#         "subtitle",
#         "type",
#         "get_subnavigation",
#     )

#     def get_subnavigation(self, obj):
#         """get subnavigation"""
#         return ChildNavigation.objects.filter(main=obj).count()

#     get_subnavigation.short_description = "children"
# admin.site.register(MainNavigation, MainNavigationAdmin)
# admin.site.register(ChildNavigation, ChildNavigationAdmin)