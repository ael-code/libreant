from elasticsearch.helpers import scan, bulk
from elasticsearch import Elasticsearch
import click

def upgrade_timestamp(es, indexname):
    query = {"fields": ["_timestamp", "_source"],
             "query": {"match_all": {}}}

    def update_action_gen():
        scanner = scan(es,
                       index=indexname,
                       query=query)
        for v in scanner:
            if "_timestamp" not in v['fields']:
                continue
            yield { '_op_type': 'update',
                    '_index': indexname,
                    '_type': v['_type'],
                    '_id': v['_id'],
                    'doc':{'_insertion_date': v['fields']['_timestamp']}
                  }
    return bulk(es, update_action_gen())


@click.command()
@click.option('--es-host', type=click.STRING, metavar="<host>", help="elasticsearch host")
@click.option('--es-indexname', type=click.STRING, default="libreant", metavar="<indexname>", help="name of the index to use")
def migrate_timestamp(es_host, es_indexname):
    hosts = [es_host] if es_host else None
    es = Elasticsearch(hosts)
    if not es.indices.exists(es_indexname):
        click.secho("Error: The specified index does not exists: {}".format(es_indexname), fg='red', err=True)
        exit(1)

    count = es.count(index=es_indexname)['count']
    if click.confirm("Are you sure you want to update {} entries?".format(count),
                      prompt_suffix='',
                      default=False):
        upgrade_timestamp(es, es_indexname)


if __name__ == '__main__':
    migrate_timestamp()
