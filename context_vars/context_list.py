import context_vars.index as index

def get_context_list():
    return [
    	('index.html', index.get_index),
    ]
