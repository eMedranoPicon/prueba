import context_vars.index as index
import context_vars.detail as detail

def get_context_list():
    return [
    	('index.html', index.get_index),
        ('detail.html', detail.get_detail)
    ]
