import context_vars.detailcard as detail
def get_context_list():
    return [
      ('card-detail.html', detail.get)
    ]
