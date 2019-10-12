from django.db import models
from account.models import UserProfile
from django.utils.translation import ugettext_lazy as _
import time
from payment.models import Payment
# Create your models here.
class ChatRoom(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=False, verbose_name=_('Is active?'))
    is_answered = models.BooleanField(default=False, verbose_name=_('Is answered?'))
    is_low_account = models.BooleanField(default=False, verbose_name=_('Is low account?'))
    activity = models.IntegerField(default=0)
    @staticmethod
    def get_room_or_create(owner, abonent):
        try:
            c = ChatContact.objects.get(owner=owner, abonent=abonent)
            c.set_current()
            return c.room
        except:
            room = ChatRoom()
            room.save()
            contact = ChatContact()
            contact.owner = owner
            contact.abonent = abonent
            contact.room = room
            contact.save()
            contact.set_current()
            contact = ChatContact()
            contact.owner = abonent
            contact.abonent = owner
            contact.room = room
            contact.save()
            return room

    def get_abonent(self,user):
        contact = ChatContact.objects.filter(room=self).exclude(owner=user)[0]
        return contact.owner

    def get_payer(self):
        contacts = ChatContact.objects.filter(room=self)
        for c in contacts:
            if c.owner.gender == 'male':
                return c.owner

    def get_woman(self):
        contacts = ChatContact.objects.filter(room=self)
        for c in contacts:
            if c.owner.gender == 'female':
                return c.owner       

        return contact.owner

    def check_is_active_by_message(self,message):
        author = message.user
        if author.gender=='male' and self.is_answered:
            self.is_active = True
            self.save()  
            return True          
        try:
            # check if woman answer first time
            am = ChatMessage.objects.filter(room=self).exclude(pk=message.id).order_by('-id')[0]
            if am.user != message.user and not self.is_answered:
                self.is_active = True
                self.is_answered = True
                self.save() 
        except:
            self.is_active = False
            self.save()

    def close_room_by_low_account(self):
        self.is_active = False
        self.is_low_account = True
        self.save()
        p = Payment.get_chat_text_payment_or_create(self)
        p.is_closed = True
        p.save()

    def close_room_by_stop_button(self):
        self.is_active = False
        self.is_low_account = False
        self.save()
        p = Payment.get_chat_text_payment_or_create(self)
        p.is_closed = True
        p.save()

    def save(self, *args, **kwargs):
        self.activity = time.time()
        super(ChatRoom, self).save(*args, **kwargs)

    class Meta:
        verbose_name = _('Chat room')
        verbose_name_plural = _('Chat rooms')

class ChatContact(models.Model):
    room = models.ForeignKey(ChatRoom, on_delete=models.CASCADE)
    owner = models.ForeignKey(UserProfile, on_delete=models.CASCADE, null=True, related_name="owner")
    abonent = models.ForeignKey(UserProfile, on_delete=models.CASCADE, null=True, related_name="abonent")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_current = models.BooleanField(default=False)


    def set_current(self):
        for c in ChatContact.objects.filter(owner=self.owner):
            c.is_current = False
            c.save()
        self.is_current = True
        self.save()        

class ChatMessage(models.Model):
    room = models.ForeignKey(ChatRoom, on_delete=models.CASCADE)
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, null=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def save(self, *args, **kwargs):
        room = self.room
        room.activity = time.time()
        room.save()
        super(ChatMessage,self).save(*args, **kwargs)