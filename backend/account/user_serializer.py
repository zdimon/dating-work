def user_serializer(profile):
    data = {
        "id": profile.id,
        "account": str(profile.account),
        "language": profile.language,
        "gender": profile.gender,
        "username": profile.username,
        "email": profile.email,
        "groups": [],
        "is_superuser": profile.is_superuser,
        "main_photo": profile.main_photo,
        "middle_photo": profile.middle_photo,
        "is_online": profile.is_online        
    }
    return data