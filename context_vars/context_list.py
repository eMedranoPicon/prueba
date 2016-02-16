import context_vars.index as index
import context_vars.detail as detail
import context_vars.detail_concrete as detail_concrete

def get_context_list():
    return [
    	('index.html', index.get_index),
        ('detail.html', detail.get_detail),
        ('detail-full.html', detail.get_detail),
        ('detail-overload.html', detail.get_detail),
        ('detail-overload-full.html', detail.get_detail),
        ('detail-concrete.html', detail_concrete.get_detail)
    ]
