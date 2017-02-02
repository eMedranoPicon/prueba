from staticjinja import make_site
from jinja2 import Environment
import context_vars.context_list as context




if __name__ == "__main__":

    renderer = make_site(searchpath='./app/templates', outpath="./app/dist", contexts=context.get_context_list(), extensions=['jinja2.ext.with_'])
    renderer.render()

#     import staticjinja
# import os
# import contextVars.context_list as context

# if __name__ == "__main__":
#     searchpath = "./app/templates/"
#     outpath = "./app/dist/plantillas/site-mi-residencia/"
#     dir = os.path.dirname(outpath)

#     if not os.path.exists(dir):
#         os.makedirs(dir)

    # renderer = staticjinja.make_renderer(searchpath=searchpath, outpath=outpath, contexts=context.get_context_list())
    # renderer.run()
