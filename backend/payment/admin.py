from django.contrib import admin

# Register your models here.
from .models import Payment, PaymentType
# Register your models here.
class PaymentAdmin(admin.ModelAdmin):
    list_display = ['payer', 'reciver', 'ammount', 'agency', 'is_closed', 'content_object', 'created_at']
admin.site.register(Payment, PaymentAdmin)

class PaymentTypeAdmin(admin.ModelAdmin):
    list_display = ['name', 'alias', 'price']
admin.site.register(PaymentType, PaymentTypeAdmin)