from django.db import models

class ChartData(models.Model):
    date = models.DateField()
    rate = models.DecimalField(max_digits=10, decimal_places=6)

    def __str__(self):
        return f"{self.date}: {self.rate}"