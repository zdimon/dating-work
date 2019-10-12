from settings.models import MailTemplates

def load_mail_tpls():
    m = MailTemplates()
    m.alias = 'man-registration'
    m.title = 'Man registartion'
    m.title_ru = 'Регистрация мужчины'
    m.content_en = 'Your password is {password}'
    m.content_ru = 'Ваш пароль {password}'
    m.content
    m.save()
