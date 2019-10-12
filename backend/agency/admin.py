from django.contrib import admin
from .models import Agency, AgencyFiles, Agency2Woman
from django.utils.safestring import mark_safe
# Register your models here.

class AgencyFilesInline(admin.StackedInline):
    '''Stacked Inline View for '''
    min_num = 3
    max_num = 20
    extra = 1
    raw_id_fields = ('agency',)
    model = AgencyFiles
    #insert_after = "name"
    fields = ('image', 'video')
    #readonly_fields = ('render_image',)



class Agency2WomanInline(admin.TabularInline):
    model = Agency2Woman
    raw_id_fields = ('woman', )
    readonly_fields = ('admin_icon',)
    fields = ('woman', 'admin_icon')

@admin.register(Agency)
class AgencyAdmin(admin.ModelAdmin):
    list_display = ['name','country', 'city', 'contact_email', 'director']
    search_fields = ['name']
    inlines = [ AgencyFilesInline, Agency2WomanInline]
    exclude = ['password', 'username', 'last_name', 'first_name', 'groups', 'user_permissions']


@admin.register(Agency2Woman)
class Agency2WomanAdmin(admin.ModelAdmin):
    list_display = ['agency','woman']
    search_fields = ['name']

@admin.register(AgencyFiles)
class AgencyFilesAdmin(admin.ModelAdmin):
    list_display = ['agency','image', 'video']
    search_fields = ['agency']