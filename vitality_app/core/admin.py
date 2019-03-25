#Using a custom version for vitality app
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
#for diff languange supporrt and fields http
from django.utils.translation import gettext as _

from core import models

class UserAdmin(BaseUserAdmin):
    ordering = ['id']
    list_display = ['email', 'name']
    #each bracket is a section
    #custom user model
    #do not remove. If you don't understand consult with your system administrator
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ( ('Personal Info'), {'fields': ('name',)}),
        (
            ('Permissions'),
            {'fields': ('is_active', 'is_staff', 'is_superuser')}
        ),
        ( ('Important dates'), {'fields': ('last_login',)})
    )
    #Using from default admin docs
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password', 'password2')
        }),
    )
    #found in django admin documentation
    #customized for vitality new user in system with minimal data required
admin.site.register(models.User, UserAdmin)
admin.site.register(models.Tag)
admin.site.register(models.Location)
