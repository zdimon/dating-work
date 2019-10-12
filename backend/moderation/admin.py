from django.contrib import admin, messages
from .models import Moderation, ModerationFiles
from .utils.woman import manke_html_from_json
from .utils.agency import make_agency_html_from_json
from .utils.photo import show_photo
from django.utils.safestring import mark_safe
from django.urls import path, reverse
from django.shortcuts import redirect
from django.utils.translation import ugettext_lazy as _
from .utils.dispacher import dispatch
# Register your models here.

class Agency2WomanInline(admin.TabularInline):
    model = ModerationFiles
    raw_id_fields = ('moderation', )




@admin.register(Moderation)
class ModerationAdmin(admin.ModelAdmin):
    inlines = [ Agency2WomanInline ]
    list_display = ['name', 'type_obj', 'is_new','prop_html','approve_link','disapprove_link']
    list_filter = ['type_obj']
    readonly_fields = ('prop_html',)
    exclude = ('data',)
    def prop_html(self, obj):
        if obj.type_obj == 'woman-profile':
            return manke_html_from_json(obj)
        if obj.type_obj == 'agency':
            return make_agency_html_from_json(obj)
        if obj.type_obj == 'photo-new' or obj.type_obj == 'photo-delete':
            return show_photo(obj.content_object)

    def approve_link(self, obj):
        url = 'approve/%s' % obj.id;
        
        return mark_safe('<a class="grp-button" href="{0}">{1}</a>'.format(url, _('Approve')))

    def disapprove_link(self, obj):
        url = 'disapprove/%s' % obj.id;
        
        return mark_safe('<a class="grp-button grp-delete-link" href="{0}">{1}</a>'.format(url, _('Disapprove')))

    def approve(self,request,id):
        messages.success(request, _('Object has been approved!'))
        dispatch(id,'approve')
        return redirect(reverse('admin:moderation_moderation_changelist'))

    def disapprove(self,request,id):
        messages.error(request, _('Object has been disapproved!'))
        dispatch(id,'disapprove')
        return redirect(reverse('admin:moderation_moderation_changelist'))

    def get_urls(self):
        urls = super(ModerationAdmin, self).get_urls()
        admin_urls = [
            path('approve/<int:id>', self.admin_site.admin_view(self.approve),name="admin-approve"),
            path('disapprove/<int:id>', self.admin_site.admin_view(self.disapprove),name="admin-disapprove")
        ]
        return admin_urls + urls
