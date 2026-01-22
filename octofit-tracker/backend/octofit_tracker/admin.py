from django.contrib import admin
from .models import Team, User, Activity, Workout, Leaderboard


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'description']
    search_fields = ['name']


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'email', 'team']
    search_fields = ['name', 'email']
    list_filter = ['team']


@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'type', 'duration', 'date']
    search_fields = ['user__name', 'type']
    list_filter = ['type', 'date']


@admin.register(Workout)
class WorkoutAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'description']
    search_fields = ['name']
    filter_horizontal = ['suggested_for']


@admin.register(Leaderboard)
class LeaderboardAdmin(admin.ModelAdmin):
    list_display = ['id', 'team', 'points']
    search_fields = ['team__name']
    list_filter = ['points']
