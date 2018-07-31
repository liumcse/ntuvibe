from django.http import JsonResponse

from webapi.manager import (
	course_manager,
	prof_manager,
	prof_rating_manager,
)


def create_prof(request, course_id):
	if not course_manager.get_course_by_course_id(course_id):
		return JsonResponse({"success": False, "error": 'invalid course_id'})

	param = request.POST
	name = param.get('name', None)
	title = param.get('title', None)
	photo = param.get('photo', None)
	description = param.get('description', None)
	if any(name, title, description) is None:
		return JsonResponse({"success": False, "error": 'invalid course_id'})

	try:
		prof_manager.add_professor(course_id, name, title, photo, description)
	except Exception as e:
		return JsonResponse({'success': False, "error": str(e)})

	return JsonResponse({'success': True})


def add_prof_rating(request, prof_id):
	result = {'success': False}
	user_id = 'logged in user id'

	if not prof_manager.get_professor_by_prof_id(prof_id):
		result['error'] = 'prof does not exist'
		return JsonResponse(result)

	param = request.POST
	clarity = param.get('clarity', None)
	enthusiasm = param.get("enthusiasm", None)
	helpful = param.get('helpful', None)
	comment = param.get("comment", None)
	if any(clarity, enthusiasm, helpful) is None:
		result['error'] = "param error"
		return JsonResponse(result)

	try:
		prof_rating_manager.add_prof_rating(user_id, prof_id, clarity. enthusiasm, helpful, comment)
	except Exception as e:
		result['error'] = str(e)
		return JsonResponse(result)

	result['success'] = True
	return JsonResponse(result)