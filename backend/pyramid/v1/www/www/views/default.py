from pyramid.view import view_config


@view_config(route_name='home', renderer='../templates/default.html.jinja2')
def my_view(request):
    return {'project': 'www'}
