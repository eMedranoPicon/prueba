import context_vars.index as index
import context_vars.detail as detail

def get_context_list():
    return [
    	('index.html', index.get_index),
        ('detail.html', detail.get_detail),
        ('detail-full.html', detail.get_detail),
        ('detail-overload.html', detail.get_detail),
        ('detail-overload-full.html', detail.get_detail)
    ]
