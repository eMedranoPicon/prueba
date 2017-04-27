import context_vars.card_detail as card_detail

def get_context_list():
    return [
    	('card-detail.html', card_detail.get_context),
    ]
