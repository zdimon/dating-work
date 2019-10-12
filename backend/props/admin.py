from django.contrib import admin
from grappelli_modeltranslation.admin import TranslationAdmin
from .models import *

class ValueInline(admin.StackedInline):
    model = Value
    list_editable = ['title']

from .models import *
# Register your models here.
class PropsAdmin(TranslationAdmin):
    list_display = ['name', 'alias', 'type', 'for_man', 'for_woman']
    inlines = [ValueInline]
  
admin.site.register(Props, PropsAdmin)

class ValueAdmin(TranslationAdmin):
    list_display = ['name']
admin.site.register(Value, ValueAdmin)

class Value2UserAdmin(admin.ModelAdmin):
    pass
admin.site.register(Value2User, Value2UserAdmin)