import context_vars.index as index
import context_vars.detail as detail
import context_vars.detail_concrete as detail_concrete
import context_vars.index_dev as index_dev
import context_vars.detail_dev as detail_dev

def get_context_list():
    return [
    	('index.html', index.get_index),
        ('index-dev.html', index_dev.get_index),
        ('detail.html', detail.get_detail),
        ('detail-dev.html', detail_dev.get_detail),
        ('detail-concrete.html', detail_concrete.get_detail)
    ]
