from rest_framework.serializers import ModelSerializer

from backend.subcontractor.models import Subcontractor


class SubcontractorSerializer(ModelSerializer):
    class Meta:
        model = Subcontractor
        fields = "__all__"

    def create(self, validated_data):
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            client = request.user.client
        else:
            client = None

        subcontractor = Subcontractor.objects.create(**validated_data)
        subcontractor.client = client
        subcontractor.save()
        return subcontractor
