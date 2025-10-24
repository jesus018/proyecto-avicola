""" Serializadores de accounts. """

from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from .models import Usuario, PerfilUsuario


class RegistroSerializer(serializers.ModelSerializer):
    """
    Serializer para el registro de nuevos usuarios
    """
    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_password],
        style={'input_type': 'password'}
    )
    password2 = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'}
    )

    class Meta:
        """ clase meta serializadora de registroSerializer. """
        model = Usuario
        fields = ('email', 'username', 'first_name', 'last_name', 'password', 'password2',
                  'telefono', 'nombre_granja', 'ubicacion')
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True}
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Las contraseñas no coinciden."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        user = Usuario.objects.create_user(**validated_data)

        # Crear perfil automáticamente
        PerfilUsuario.objects.create(usuario=user)

        return user


class LoginSerializer(serializers.Serializer):
    """
    Serializer para el login de usuarios
    """
    email = serializers.EmailField(required=True)
    password = serializers.CharField(
        required=True,
        write_only=True,
        style={'input_type': 'password'}
    )

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        if email and password:
            user = authenticate(
                request=self.context.get('request'),
                username=email,
                password=password
            )

            if not user:
                raise serializers.ValidationError('Credenciales inválidas.')

            if not user.esta_activo:
                raise serializers.ValidationError(
                    'Esta cuenta está desactivada.')
        else:
            raise serializers.ValidationError(
                'Debe incluir email y contraseña.')

        attrs['user'] = user
        return attrs


class PerfilUsuarioSerializer(serializers.ModelSerializer):
    """
    Serializer para el perfil del usuario
    """
    class Meta:
        """ Clase meta serializadora de perfilUsuario. """
        model = PerfilUsuario
        fields = '__all__'
        read_only_fields = ('usuario',)


class UsuarioSerializer(serializers.ModelSerializer):
    """
    Serializer para mostrar información del usuario
    """
    perfil = PerfilUsuarioSerializer(read_only=True)

    class Meta:
        """ Clase meta serializadora de usuario."""
        model = Usuario
        fields = ('id', 'email', 'username', 'first_name', 'last_name',
                  'telefono', 'nombre_granja', 'ubicacion', 'fecha_creacion',
                  'esta_activo', 'perfil')
        read_only_fields = ('id', 'fecha_creacion')


class CambiarPasswordSerializer(serializers.Serializer):
    """
    Serializer para cambiar la contraseña
    """
    old_password = serializers.CharField(
        required=True,
        write_only=True,
        style={'input_type': 'password'}
    )
    new_password = serializers.CharField(
        required=True,
        write_only=True,
        validators=[validate_password],
        style={'input_type': 'password'}
    )
    new_password2 = serializers.CharField(
        required=True,
        write_only=True,
        style={'input_type': 'password'}
    )

    def validate(self, attrs):
        if attrs['new_password'] != attrs['new_password2']:
            raise serializers.ValidationError(
                {"new_password": "Las contraseñas no coinciden."})
        return attrs

    def validate_old_password(self, value):
        """ Funcion validar antigua contraseña. """
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError(
                "La contraseña actual es incorrecta.")
        return value

    def save(self, **kwargs):
        user = self.context['request'].user
        user.set_password(self.validated_data['new_password'])
        user.save()
        return user
