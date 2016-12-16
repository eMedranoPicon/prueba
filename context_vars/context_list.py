import context_vars.index as index;
import context_vars.warning1 as warning1;

def get_context_list():
    return [
    	('index.html', index.get),
    	('warning1.html', warning1.get),
    ]
