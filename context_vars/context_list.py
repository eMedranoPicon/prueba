import context_vars.index as index;
import context_vars.warning as warning;

def get_context_list():
    return [
    	('index.html', index.get),
    	('warning1.html', warning.get),
    	('warning2.html', warning.get),
    	('warning3.html', warning.get),
    ]
