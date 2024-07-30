from .models import ChartData
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from datetime import datetime, date
import requests
from decimal import Decimal

class ChartContent(APIView):
    def get(self, req):
        months_range = int(req.GET.get("range", 12))
        print(f"Requested data for the last {months_range} months")
        today = date.today()
        year = today.year
        month = today.month

        # Calculate the starting date
        if month - months_range <= 0:
            year -= 1
            month = 12 + (month - months_range)
        else:
            month -= months_range

        fromDate = date(year, month, 1).strftime("%Y-%m-%d")
        toDate = today.strftime("%Y-%m-%d")

        print(f"Fetching data from {fromDate} to {toDate}")

        url = f"http://currencies.apps.grandtrunk.net/getrange/{fromDate}/{toDate}/usd/kzt"
        fetch_new_data = requests.get(url)
        if fetch_new_data.status_code == 200:
            api_data = fetch_new_data.text.split('\n')
            for entry in api_data:
                if entry.strip():
                    date_str, rate_str = entry.split()
                    date_obj = datetime.strptime(date_str, "%Y-%m-%d").date()
                    rate = Decimal(rate_str)
                    ChartData.objects.update_or_create(date=date_obj, defaults={'rate': rate})
            data = ChartData.objects.filter(date__range=[fromDate, toDate]).order_by('date')
            return Response(list(data.values()), status=status.HTTP_200_OK)

        return Response({"error": "Failed to fetch data from the external API"}, status=status.HTTP_502_BAD_GATEWAY)
