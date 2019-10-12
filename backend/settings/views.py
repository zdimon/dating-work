from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import ReplanishmentPlan, Pictures
from rest_framework.response import Response
from account.models import ReplenishmentLog
from backend.local import DOMAIN

class ReplanishmentPlanView(APIView):
    """
       Replanishment plan
    """
    permission_classes = (IsAuthenticated,)
    def get(self, request, format=None):
        plan = ReplanishmentPlan.objects.all().order_by('-dollar')
        out = []
        for i in plan:
            out.append({
                'id': i.id,
                'name': i.name,
                'dollar': i.dollar,
                'credit': i.credit
            })
        return Response(out)


class AddCreditsView(APIView):
    """
       Replanishment plan
    """
    permission_classes = (IsAuthenticated,)
    def post(self, request, format=None):
        plan = ReplanishmentPlan.objects.get(id=request.data['plan_id'])

        out = {
            'plan_id': plan.id,
            'credits': plan.credit
        }
        pr = request.user.userprofile
        pr.account = pr.account + int(request.data['credits'])
        pr.save()
        log = ReplenishmentLog()
        log.user_profile = pr
        log.plan = plan
        log.save()
        return Response(out)

class SmilesListView(APIView):
    """
       List of smiles
    """
    permission_classes = (IsAuthenticated,)
    def get(self, request, format=None):
        pics = Pictures.objects.filter(type_obj='smile')
        out = []
        for p in pics:
            out.append({
                "image": DOMAIN+p.image.url,
                "alias": p.alias,
                "name": p.name
            })
        return Response(out)