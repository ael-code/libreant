import click
import logging
import json

from archivant import Archivant
from archivant.exceptions import NotFoundException
from archivant.exceptions import UploadError
from conf import config_utils
from conf.defaults import get_def_conf, get_help
from utils.loggers import initLoggers
from custom_types import StringList


conf = dict()
arc = None


@click.group(name="libreant-db", help="command line program to manage libreant database")
@click.version_option()
@click.option('-s', '--settings', type=click.Path(exists=True, readable=True), help='file from which load settings')
@click.option('-d', '--debug', is_flag=True, help=get_help('DEBUG'))
@click.option('--fsdb-path', type=click.Path(), metavar="<path>", help=get_help('FSDB_PATH'))
@click.option('--es-indexname', type=click.STRING, metavar="<name>", help=get_help('ES_INDEXNAME'))
@click.option('--es-hosts', type=StringList(), metavar="<host>..", help=get_help('ES_HOSTS'))
def libreant_db(debug, settings, fsdb_path, es_indexname, es_hosts):
    initLoggers(logNames=['config_utils'])
    global conf
    conf = config_utils.load_configs('LIBREANT_', defaults=get_def_conf(), path=settings)
    cliConf = {}
    if debug:
        cliConf['DEBUG'] = True
    if fsdb_path:
        cliConf['FSDB_PATH'] = fsdb_path
    if es_indexname:
        cliConf['ES_INDEXNAME'] = es_indexname
    if es_hosts:
        cliConf['ES_HOSTS'] = es_hosts
    conf.update(cliConf)
    initLoggers(logging.DEBUG if conf.get('DEBUG', False) else logging.INFO)

    try:
        global arc
        arc = Archivant(conf=conf)
    except Exception, e:
        if conf.get('DEBUG', False):
            raise
        else:
            click.secho(str(e), fg='yellow', err=True)
            exit(1)


@libreant_db.command(name="export-volume", help="export a volume")
@click.argument('volumeid')
@click.option('-p', '--pretty', is_flag=True, help='format the output on multiple lines')
def export_volume(volumeid, pretty):
    try:
        volume = arc.get_volume(volumeid)
    except NotFoundException as e:
        click.secho(str(e), fg="yellow", err=True)
        exit(4)

    indent = 3 if pretty else None
    ouput = json.dumps(volume, indent=indent)
    click.echo(ouput)


@libreant_db.command(name="remove", help="remove a volume")
@click.argument('volumeid')
def delete_volume(volumeid):
    try:
        arc.delete_volume(volumeid)
    except NotFoundException as e:
        click.secho(str(e), fg="yellow", err=True)
        exit(4)


@libreant_db.command(help="search volumes by query")
@click.argument('query')
@click.option('-p', '--pretty', is_flag=True, help='format the output on multiple lines')
def search(query, pretty):
    results = arc._db.user_search(query)['hits']['hits']
    results = map(arc.normalize_volume, results)
    if not results:
        click.secho("No results found for '{}'".format(query), fg="yellow", err=True)
        exit(4)
    indent = 3 if pretty else None
    output = json.dumps(results, indent=indent)
    click.echo(output)


@libreant_db.command(name='export-all', help="export all volumes")
@click.option('-p', '--pretty', is_flag=True, help='format the output on multiple lines')
def export_all(pretty):
    indent = 3 if pretty else None
    volumes = [vol for vol in arc.get_all_volumes()]
    click.echo(json.dumps(volumes, indent=indent))

@libreant_db.command(name='upload-volume', help='uploads a volume to the db')
@click.option('-l', '--language', type=click.Choice(['en','it']), help='specify the language of the media you are going to upload')
@click.option('-f', '--filepath', type=click.Path(exists=True,resolve_path=True),help='the path to the media to be uploaded')
@click.option('-n', '--name', type=click.STRING, help='[optional] name of the media including the extension')
@click.option('-m', '--mime', type=click.STRING, help='[optional] mime type of the media')
@click.option('-n', '--notes', type=click.STRING, help='[optional] notes about the media')
@click.option('-x', '--extravalues', type=click.STRING, help='[optional] additional parameters')
def upload_volume(language,filepath,name,mime,notes,extravalues):
    def check_extra_values(x_values):
        raise(NotImplemented)
    #if len(extravalues)>0:
    #    check_extra_values(extravalues)
    #else:
    #    pass
    metadata={"_language":language}
    attachments=[{"file":filepath}]
    if name:
        attachments[0]['name']=name
    if mime:
        attachments[0]['mime']=mime
    if notes:
        attachments[0]['notes']=notes
    try:
        arc.insert_volume(metadata,attachments)
    except UploadError('An upload error have occurred!') as e:
        click.secho(str(e), fg="yellow", err=True)

if __name__ == '__main__':
    libreant_db()
