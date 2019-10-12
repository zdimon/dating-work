from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from .models import Props, Value

class PropsListView(APIView):
    """
       Props list
    """
    permission_classes = (AllowAny,)
    def get(self, request, gender, format=None):
        data = {'one': [], 'many': []}
        if(gender=='female'):
            props = Props.objects.filter(for_woman=True, type='one')
        else:
            props = Props.objects.filter(for_man=True, type='one')
        for p in props:
            values = []
            for v in Value.objects.filter(prop=p):
                values.append({'value': v.id, 'title': v.name})
            data['one'].append({'alias': p.alias, 'title': p.name, 'values': values})

        if(gender=='female'):
            props = Props.objects.filter(for_woman=True, type='many')
        else:
            props = Props.objects.filter(for_man=True, type='many')
        for p in props:
            values = []
            for v in Value.objects.filter(prop=p):
                values.append({'value': v.id, 'title': v.name})
            data['many'].append({'alias': p.alias, 'title': p.name, 'values': values})
            
        return Response(data)