from flask import Blueprint, current_app, render_template


dash = dashboard = Blueprint('dashboard', __name__,
                            template_folder='templates',
                            static_folder='static')


@dash.route("/", methods=['GET'])
@dash.route("/<path:path>", methods=['GET'])
def dash(path=None):
    return render_template('dash.html',
                           api_url=current_app.config['API_URL'],
                           dashboard_url=current_app.config['DASHBOARD_URL'])
